import { parksCatalog } from "seattle-open-json/parks-catalog";
import { mobileRecreationProgramming } from "seattle-open-json/mobile-recreation";
import { youth_programs } from "seattle-open-json/youth-programs";

export type ActivitySource =
  | "parksCatalog"
  | "mobileRecreationProgramming"
  | "youthPrograms";

export interface ActivitySearchFilters {
  keyword: string;
  sources?: ActivitySource[];
  limit?: number;
}

export interface ActivityResult {
  source: ActivitySource;
  title: string;
  summary?: string;
  location?: string;
  schedule?: string;
  cost?: string;
  url?: string;
  metadata?: Record<string, unknown>;
}

const MAX_LIMIT = 50;

function shouldIncludeSource(
  source: ActivitySource,
  selected?: ActivitySource[]
): boolean {
  if (!selected || selected.length === 0) return true;
  return selected.includes(source);
}

function keywordMatch(text: string | undefined, keyword: string): boolean {
  return (text ?? "").toLowerCase().includes(keyword);
}

export function searchActivities(
  { keyword, sources, limit }: ActivitySearchFilters
): ActivityResult[] {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) {
    return [];
  }

  const results: ActivityResult[] = [];
  const targetLimit = Math.min(limit ?? 15, MAX_LIMIT);

  if (shouldIncludeSource("parksCatalog", sources)) {
    for (const activity of parksCatalog) {
      if (results.length >= targetLimit) break;
      const matches = [
        activity.ActivityName,
        activity.Description,
        activity.CategoryName,
        activity.OtherCategoryName,
        activity.Type,
      ].some((value) => keywordMatch(value, normalizedKeyword));

      if (!matches) continue;

      const keyFees =
        typeof activity.KeyFeesTotal === "number"
          ? `$${activity.KeyFeesTotal.toFixed(2)}`
          : undefined;

      results.push({
        source: "parksCatalog",
        title: activity.ActivityName,
        summary: activity.Description,
        location: activity.ActivityLocation,
        schedule: `${activity.BeginningDate} - ${activity.EndingDate} (${activity.WeekDays || "Flexible"})`,
        cost:
          activity.FeeSummary ||
          keyFees,
        url: activity.PublicURL,
        metadata: {
          type: activity.Type,
          category: activity.CategoryName,
          risk: activity.RiskCategoryName,
          ages: { min: activity.AgesMin, max: activity.AgesMax },
        },
      });
    }
  }

  if (results.length < targetLimit &&
    shouldIncludeSource("mobileRecreationProgramming", sources)) {
    for (const program of mobileRecreationProgramming) {
      if (results.length >= targetLimit) break;
      const matches = [
        program.Name,
        program["Program Title"],
        program.description,
        program.location,
        program["Program Location"],
      ].some((value) => keywordMatch(value, normalizedKeyword));

      if (!matches) continue;

      results.push({
        source: "mobileRecreationProgramming",
        title: program["Program Title"] || program.Name,
        summary: program.description,
        location: program["Program Location"] || program.location,
        schedule: `${program["Activity Days"] || ""} ${
          program["Start Date"] ? `from ${program["Start Date"]}` : ""
        } ${
          program["End Date"] ? `to ${program["End Date"]}` : ""
        }`.trim(),
        cost: undefined,
        url: program["OAMR Website Link"] || undefined,
        metadata: {
          category: program["Program Category"],
          status: program["Program Status"],
          notes: program.Notes,
        },
      });
    }
  }

  if (results.length < targetLimit && shouldIncludeSource("youthPrograms", sources)) {
    for (const program of youth_programs) {
      if (results.length >= targetLimit) break;
      const matches = [
        program.organizationName,
        program.programDescription,
        program.activityName,
        program.activityDescription,
      ].some((value) => keywordMatch(value, normalizedKeyword));

      if (!matches) continue;

      results.push({
        source: "youthPrograms",
        title: program.activityName,
        summary: program.activityDescription,
        location: program.location,
        schedule: `${program.day} ${program.times}`.trim(),
        cost: program.cost,
        url: program.url,
        metadata: {
          organization: program.organizationName,
          ageRange: program.ageRange,
          lastUpdated: program.lastUpdated,
          dates: program.dates,
        },
      });
    }
  }

  return results.slice(0, targetLimit);
}

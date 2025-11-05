import type { CivicEntity, CivicEntityQuery, LocationInfo } from "seattle-open-json";
import { loadScsData } from "seattle-open-json/scs";

export interface CivicSearchFilters {
  search?: string;
  type?: string | string[];
  tags?: string | string[];
  neighborhood?: string;
  limit?: number;
}

const MAX_LIMIT = 100;

let cachedScsData: Awaited<ReturnType<typeof loadScsData>> | null = null;

async function getScsData() {
  if (!cachedScsData) {
    cachedScsData = await loadScsData();
  }
  return cachedScsData;
}

function normalizeArray(value?: string | string[]): string[] | undefined {
  if (!value) return undefined;
  const items = Array.isArray(value) ? value : value.split(",");
  return items
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0);
}

function civicEntityToSearchableText(entity: CivicEntity): string {
  const location =
    typeof entity.location === "string"
      ? entity.location
      : formatLocation(entity.location);
  const tags = entity.tags?.join(" ") ?? "";

  return [
    entity.name,
    entity.description,
    entity.type,
    location,
    tags,
    entity.notes ?? "",
  ]
    .join(" \n ")
    .toLowerCase();
}

function formatLocation(location: LocationInfo): string {
  const coordinates = location.coordinates
    ? `${location.coordinates.lat},${location.coordinates.lng}`
    : "";
  return [location.address ?? "", coordinates].filter(Boolean).join(" ");
}

export async function searchCivicEntities(
  filters: CivicSearchFilters
): Promise<CivicEntity[]> {
  const scsData = await getScsData();
  const allEntities = scsData.getAllEntities();
  const normalizedTypes = normalizeArray(filters.type);
  const normalizedTags = normalizeArray(filters.tags);
  const searchText = filters.search?.toLowerCase().trim();
  const neighborhood = filters.neighborhood?.toLowerCase().trim();
  const limit = Math.min(filters.limit ?? 25, MAX_LIMIT);

  let results = allEntities;

  if (normalizedTypes?.length) {
    results = results.filter((entity) =>
      normalizedTypes.includes(entity.type.toLowerCase())
    );
  }

  if (normalizedTags?.length) {
    results = results.filter((entity) => {
      if (!entity.tags?.length) return false;
      const entityTags = entity.tags.map((tag: string) => tag.toLowerCase());
      return normalizedTags.some((tag: string) => entityTags.includes(tag));
    });
  }

  if (neighborhood) {
    results = results.filter((entity) =>
      entity.neighborhood
        ? entity.neighborhood.toLowerCase() === neighborhood
        : false
    );
  }

  if (searchText) {
    results = results.filter((entity) =>
      civicEntityToSearchableText(entity).includes(searchText)
    );
  }

  return results.slice(0, limit);
}

export function buildCivicQueryFromFilters(
  filters: CivicSearchFilters
): CivicEntityQuery {
  const query: CivicEntityQuery = {};

  if (filters.type) {
    query.type = Array.isArray(filters.type)
      ? filters.type
      : filters.type.split(",").map((value) => value.trim());
  }

  if (filters.tags) {
    query.tags = Array.isArray(filters.tags)
      ? filters.tags
      : filters.tags.split(",").map((value) => value.trim());
  }

  if (filters.search) {
    query.search = filters.search;
  }

  if (filters.neighborhood) {
    query.neighborhood = filters.neighborhood;
  }

  return query;
}

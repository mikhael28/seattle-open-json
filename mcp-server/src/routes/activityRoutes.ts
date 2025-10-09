import { Router } from "express";
import {
  searchActivities,
  type ActivitySource,
} from "../services/activityService.js";

const activityRouter = Router();

activityRouter.get("/", (req, res) => {
  const { keyword, sources, limit } = req.query;

  if (typeof keyword !== "string" || keyword.trim().length === 0) {
    res.status(400).json({
      error: "Query parameter 'keyword' is required.",
    });
    return;
  }

  const parsedSources: ActivitySource[] | undefined = sources
    ? normalizeSources(sources)
    : undefined;

  const parsedLimit =
    typeof limit === "string" ? Number.parseInt(limit, 10) : undefined;

  const data = searchActivities({
    keyword,
    sources: parsedSources,
    limit: parsedLimit,
  });

  res.json({
    data,
    meta: {
      total: data.length,
      keyword,
      sources: parsedSources ?? [
        "parksCatalog",
        "mobileRecreationProgramming",
        "youthPrograms",
      ],
    },
  });
});

export default activityRouter;

function normalizeSources(
  value: unknown
): ActivitySource[] | undefined {
  const rawList = Array.isArray(value)
    ? value
    : typeof value === "string"
    ? value.split(",")
    : [];

  const cleaned = rawList
    .map((item) => (typeof item === "string" ? item.trim() : undefined))
    .filter((item): item is ActivitySource =>
      [
        "parksCatalog",
        "mobileRecreationProgramming",
        "youthPrograms",
      ].includes(item as ActivitySource)
    );

  return cleaned.length > 0 ? cleaned : undefined;
}

import { Router } from "express";
import {
  buildCivicQueryFromFilters,
  searchCivicEntities,
} from "../services/civicService.js";

const civicRouter = Router();

civicRouter.get("/entities", (req, res) => {
  const { search, type, tags, neighborhood, limit } = req.query;

  const filters = {
    search: typeof search === "string" ? search : undefined,
    type: parseQueryValue(type),
    tags: parseQueryValue(tags),
    neighborhood: typeof neighborhood === "string" ? neighborhood : undefined,
    limit:
      typeof limit === "string"
        ? Number.parseInt(limit, 10)
        : undefined,
  } satisfies Parameters<typeof searchCivicEntities>[0];

  const data = searchCivicEntities(filters);

  res.json({
    data,
    meta: {
      total: data.length,
      query: buildCivicQueryFromFilters(filters),
    },
  });
});

export default civicRouter;

function parseQueryValue(
  value: unknown
): string | string[] | undefined {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => (typeof item === "string" ? item : undefined))
      .filter((item): item is string => Boolean(item));
    return items.length > 0 ? items : undefined;
  }

  return undefined;
}

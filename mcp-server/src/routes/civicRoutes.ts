import { Router } from "express";
import {
  buildCivicQueryFromFilters,
  searchCivicEntities,
} from "../services/civicService.js";

const civicRouter = Router();

civicRouter.get("/entities", async (req, res) => {
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

  try {
    const data = await searchCivicEntities(filters);

    res.json({
      data,
      meta: {
        total: data.length,
        query: buildCivicQueryFromFilters(filters),
      },
    });
  } catch (error) {
    console.error("Error searching civic entities:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to search civic entities" });
    }
  }
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

import { describe, expect, it } from "vitest";

import { searchCivicEntities } from "../../src/services/civicService.js";

describe("searchCivicEntities", () => {
  it("limits the number of returned entities", () => {
    const results = searchCivicEntities({ limit: 10 });
    expect(results.length).toBeLessThanOrEqual(10);
  });

  it("filters by type when provided", () => {
    const sample = searchCivicEntities({ limit: 1 });
    expect(sample.length).toBeGreaterThan(0);

    const targetType = sample[0].type;
    const filtered = searchCivicEntities({ type: targetType, limit: 20 });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((entity) => entity.type === targetType)).toBe(true);
  });
});

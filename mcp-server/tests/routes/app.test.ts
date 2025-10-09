import request from "supertest";
import { describe, expect, it } from "vitest";

import { parksCatalog } from "seattle-open-json";
import app from "../../src/app.js";

describe("HTTP server", () => {
  it("responds to the health check", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("searches activities by keyword", async () => {
    const sampleActivity = parksCatalog[0];
    expect(sampleActivity).toBeDefined();

    const keyword = sampleActivity.ActivityName.slice(0, 6);
    const response = await request(app)
      .get("/activities")
      .query({ keyword });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

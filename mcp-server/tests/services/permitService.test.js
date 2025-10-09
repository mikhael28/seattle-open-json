import { describe, expect, it } from "vitest";
import { buildingPermits } from "seattle-open-json";
import { getPermitDetails } from "../../src/services/permitService.js";
describe("getPermitDetails", () => {
    it("returns permit data for a known permit number", () => {
        const samplePermit = buildingPermits[0];
        expect(samplePermit).toBeDefined();
        const details = getPermitDetails(samplePermit.PermitNum);
        expect(details.buildingPermit?.PermitNum).toBe(samplePermit.PermitNum);
    });
    it("returns empty results for an unknown permit number", () => {
        const details = getPermitDetails("UNKNOWN-PERMIT");
        expect(details.buildingPermit).toBeUndefined();
        expect(details.planComments).toHaveLength(0);
        expect(details.planReviews).toHaveLength(0);
    });
});

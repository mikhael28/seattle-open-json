import { Router } from "express";
import { getPermitDetails } from "../services/permitService.js";

const permitRouter = Router();

permitRouter.get("/:permitNumber", (req, res) => {
  const { permitNumber } = req.params;

  if (!permitNumber) {
    res.status(400).json({ error: "Permit number is required." });
    return;
  }

  const details = getPermitDetails(permitNumber);

  if (!details.buildingPermit &&
      details.planComments.length === 0 &&
      details.planReviews.length === 0) {
    res.status(404).json({
      error: `No permit data found for permit number ${permitNumber}.`,
    });
    return;
  }

  res.json({ data: details });
});

export default permitRouter;

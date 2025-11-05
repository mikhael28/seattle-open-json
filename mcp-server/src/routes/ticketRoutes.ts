import { Router } from "express";
import {
  searchTickets,
  getTicketStats,
  type TicketSearchFilters,
} from "../services/ticketService.js";

const ticketRouter = Router();

ticketRouter.get("/", async (req, res) => {
  try {
    const filters: TicketSearchFilters = {
      search: req.query.search as string | undefined,
      status: req.query.status as string | string[] | undefined,
      department: req.query.department as string | undefined,
      requestType: req.query.requestType as string | undefined,
      neighborhood: req.query.neighborhood as string | undefined,
      precinct: req.query.precinct as string | undefined,
      councilDistrict: req.query.councilDistrict
        ? isNaN(Number(req.query.councilDistrict))
          ? req.query.councilDistrict as string
          : Number(req.query.councilDistrict)
        : undefined,
      fromDate: req.query.fromDate as string | undefined,
      toDate: req.query.toDate as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };

    const results = await searchTickets(filters);
    res.json({ data: results, count: results.length });
  } catch (error) {
    console.error("Error searching tickets:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to search tickets" });
    }
  }
});

ticketRouter.get("/stats", async (_req, res) => {
  try {
    const stats = await getTicketStats();
    res.json({ data: stats });
  } catch (error) {
    console.error("Error getting ticket stats:", error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to get ticket statistics" });
    }
  }
});

export default ticketRouter;

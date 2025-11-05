import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import activityRouter from "./routes/activityRoutes.js";
import civicRouter from "./routes/civicRoutes.js";
import mcpRouter from "./routes/mcpRoutes.js";
import permitRouter from "./routes/permitRoutes.js";
import siteMapRouter from "./routes/siteMapRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/scs", civicRouter);
app.use("/activities", activityRouter);
app.use("/permits", permitRouter);
app.use("/tickets", ticketRouter);
app.use("/mcp", mcpRouter);
app.use("/site-map", siteMapRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error) {
    console.error("Unhandled error", error);
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: "Unknown server error" });
});

export default app;

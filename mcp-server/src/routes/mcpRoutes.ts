import { Router } from "express";
import { executeTool, listTools, toolNames } from "../mcp/tools.js";

const mcpRouter = Router();

mcpRouter.get("/tools", (_req, res) => {
  res.json({ data: listTools() });
});

mcpRouter.post("/tools/:toolName", async (req, res) => {
  const { toolName } = req.params;

  if (!toolNames.includes(toolName as typeof toolNames[number])) {
    res.status(404).json({ error: `Unknown tool: ${toolName}` });
    return;
  }

  try {
    const result = await executeTool(toolName as typeof toolNames[number], req.body ?? {});
    res.json({ data: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Unexpected error executing tool." });
  }
});

export default mcpRouter;

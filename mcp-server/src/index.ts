import http from "node:http";

import app from "./app.js";

const DEFAULT_PORT = 3100;

export function startServer(port = DEFAULT_PORT): http.Server {
  const server = app.listen(port, () => {
    console.log(`MCP server listening on port ${port}`);
  });

  return server;
}

if (process.env.NODE_ENV !== "test") {
  const port = Number.parseInt(process.env.PORT ?? `${DEFAULT_PORT}`, 10);
  startServer(port);
}

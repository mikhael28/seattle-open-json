# MCP Server Instructions

This is a separate, standalone module within the `seattle-open-json` package that is not intended for consumption in the same way the open JSON objects are. This is meant to be run by a developer, locally on their machine, against the data in `seattle-open-json` as a simple proof of concept. Here are some instructions to get it running on your local machine; be aware that you will need an OpenAI platform API key to run things locally, as well as in production at https://seattle.expatriaonline.com

## Updates in v1.4.0
- Updated to use tree-shakeable imports from `seattle-open-json@1.4.0` for optimal bundle sizes
- Added customer support ticket search and statistics endpoints
- All SCS data now loads asynchronously for better performance

**Note:** There's currently a compatibility issue with Node.js v22+ due to JSON import assertions. Please use Node.js v20 LTS or earlier until the upstream package is updated

1. From /home/mikhael/Workspace/seattle-youth-data/mcp-server, run `npm install`, then `npm run build`, and `npm start`.
2. In another shell, hit GET http://localhost:3100/health to confirm the server is up.
3. Query sample endpoints, e.g.:
   • GET http://localhost:3100/activities?keyword=pottery
   • GET http://localhost:3100/scs/entities?search=park&type=Park
   • GET http://localhost:3100/permits/7019574-CN
4. (Optional) POST JSON payloads to http://localhost:3100/mcp/tools/<toolName> matching the documented input shapes to ensure AI integrations receive results.

API Overview
• GET /health — readiness probe
• GET /activities?keyword=<term>&sources=<list>&limit=<n> — activity search (sources default to parksCatalog, mobileRecreationProgramming, youthPrograms)
• GET /scs/entities?search=<text>&type=<type|type[]>&tags=<tag|tag[]>&neighborhood=<name>&limit=<n> — civic entity search with query metadata in response
• GET /permits/:permitNumber — building permit details with associated plan comments and reviews
• GET /tickets?search=<text>&status=<status>&department=<dept>&requestType=<type>&neighborhood=<name>&limit=<n> — search 311/Find It Fix It tickets
• GET /tickets/stats — get aggregate statistics about customer support tickets
• GET /mcp/tools — list of MCP tools available to agents
• POST /mcp/tools/:toolName — invoke validated MCP tool payloads (see MCP Tools below)

MCP Tools
• searchCivicEntities — filters Seattle Civic Standard entities (payload matches /scs/entities query parameters)
• searchActivities — keyword search over activities (payload mirrors /activities parameters)
• getPermitDetails — looks up a permit by permitNumber
• searchCustomerTickets — search 311/Find It Fix It customer support tickets with filters for status, department, type, and location
• getTicketStatistics — get aggregate statistics including totals by status, department, and top request types

Testing
• npm run build
• npm run dev will open localhost:3100

API Overview
• GET /health — readiness probe
• GET /activities?keyword=<term>&sources=<list>&limit=<n> — activity search (sources default to parksCatalog, mobileRecreationProgramming, youthPrograms)
• GET /scs/entities?search=<text>&type=<type|type[]>&tags=<tag|tag[]>&neighborhood=<name>&limit=<n> — civic entity search with query metadata in response
• GET /permits/:permitNumber — building permit details with associated plan comments and reviews
• GET /mcp/tools — list of MCP tools available to agents
• POST /mcp/tools/:toolName — invoke validated MCP tool payloads (see MCP Tools below)

MCP Tools
• searchCivicEntities — filters Seattle Civic Standard entities (payload matches /scs/entities query parameters)
• searchActivities — keyword search over activities (payload mirrors /activities parameters)
• getPermitDetails — looks up a permit by permitNumber

Manual Verification

1. From /home/mikhael/Workspace/seattle-youth-data/mcp-server, run npm install, then npm run build, and npm start.
2. In another shell, hit GET http://localhost:3100/health to confirm the server is up.
3. Query sample endpoints, e.g.:
   • GET http://localhost:3100/activities?keyword=pottery
   • GET http://localhost:3100/scs/entities?search=park&type=Park
   • GET http://localhost:3100/permits/7019574-CN
4. (Optional) POST JSON payloads to http://localhost:3100/mcp/tools/<toolName> matching the documented input shapes to ensure AI integrations receive results.

Testing
• npm run build
• npm run dev will open localhost:3100

Manual Verification

1. From /home/mikhael/Workspace/seattle-youth-data/mcp-server, run npm install, then npm run build, and npm start.
2. In another shell, hit GET http://localhost:3100/health to confirm the server is up.
3. Query sample endpoints, e.g.:
   • GET http://localhost:3100/activities?keyword=pottery
   • GET http://localhost:3100/scs/entities?search=park&type=Park
   • GET http://localhost:3100/permits/7019574-CN
4. (Optional) For MCP tooling, POST JSON payloads to http://localhost:3100/mcp/tools/<toolName> matching the documented input shapes to ensure AI integrations receive results.

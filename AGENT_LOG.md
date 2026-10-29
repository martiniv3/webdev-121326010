# Agent log

One entry per agent session, newest at the bottom. Be honest: what went wrong is the useful part.

<!-- Copy this block for each session:

## YYYY-MM-DD · <short title>
- Goal:
- Delegated:
- Checkpoints:
- Went wrong:
- Changed by hand:

-->


## 2026-10-29 · MCP server implementation
- Goal: Implement an MCP server from scratch without using a framework.
- Delegated: Used ChatGPT to help implement the JSON-RPC message handling, tool discovery, tool calls, and error handling.
- Checkpoints: The server passed all 12 automated checks using `node mcp-server/check.mjs -- npm run --silent mcp`.
- Went wrong: Initially, only initialization and notification handling worked. The tool-related tests failed because the server did not yet implement `tools/list` and `tools/call`.
- Changed by hand: Created and saved server.js, ran the automated checks, and configured the npm start command.


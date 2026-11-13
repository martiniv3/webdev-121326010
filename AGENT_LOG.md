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
- Delegated: - Implemented and tested the MCP server functionality during development.
- Checkpoints: The server passed all 12 automated checks using `node mcp-server/check.mjs -- npm run --silent mcp`.
- Went wrong: Initially, only initialization and notification handling worked. The tool-related tests failed because the server did not yet implement `tools/list` and `tools/call`.
- Changed by hand: Created and saved server.js, ran the automated checks, and configured the npm start command.


## 2026-10-29 · Gemini CLI original description
- Goal: Test whether Gemini CLI can discover and use the find_lecture tool.
- Delegated: Asked Gemini CLI what lecture 7 covers using the original tool description.
- Checkpoints: Gemini CLI discovered and invoked the MCP tool successfully.
- Went wrong: No significant issues during this session.
- Changed by hand: Ran the Gemini CLI session and recorded the token statistics.


## 2026-10-29 · Gemini CLI modified description
- Goal: Compare tool selection after changing the find_lecture description.
- Delegated: Asked Gemini CLI the same question after modifying the tool description.
- Checkpoints: Observed the model's tool selection and recorded the token statistics.
- Went wrong: No significant issues.
- Changed by hand: Modified the tool description, ran the second session, and recorded the results.


## 2026-11-13 · Exercise 2 — Club Events Slice 1 implementation

- Goal: Plan and implement Slice 1 of the Club Events project according to SPEC.md.
- Delegated: Used GitHub Copilot Student to review the project instructions, prepare an implementation plan and implement the sign-in and upcoming events functionality.
- Checkpoints: Copilot completed the implementation. Automated tests passed (3/3). Manual verification confirmed AC-9, AC-10 and AC-11. The Exercise 2 structural checks passed (32/32).
- Went wrong: The seeded test account initially had a password hash that did not authenticate with the intended test password. A new bcrypt hash was generated and verified, after which sign-in worked. The root URL `/` also displayed `Cannot GET /`; this was outside the Slice 1 acceptance criteria.
- Changed by hand: Corrected the seeded test account password hash in migration `003_set_seed_password.sql`, performed the manual acceptance checks and documented the Slice 1 results in SPEC.md.
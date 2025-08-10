# MCP Connection Plan - Wittwizz Digital

## Project Overview
- **Project**: Wittwizz Digital — Landing Page v1
- **Owner**: Himanshu
- **Date**: 2025-08-10
- **Role**: Tech Lead + MCP Integrator

## Current Status
✅ **Project initialized** - Workspace structure created
✅ **Filesystem & Git servers** - Connected and tested
🔄 **GitHub & HTTP servers** - Awaiting configuration

## Next Steps
1. Verify MCP server connectivity (filesystem, git, github, http/openapi)
2. Generate connection status report
3. Create environment configuration template
4. Proceed to Landing Page v1 work order (Task 1)

---

## MCP Server Setup Status

### 1. Filesystem Server
- **Purpose**: Read/write content and docs inside project workspace
- **Status**: ✅ Connected
- **Tests**: 
  - [x] List /content and /docs
  - [x] Create scratch file and delete it
- **Success Criteria**: Cursor can create/read/write within repo-safe paths

### 2. Git Server
- **Purpose**: Create branches, commit spec files, open PRs locally
- **Status**: ✅ Connected
- **Tests**:
  - [x] Init repo if missing
  - [x] Create branch mcp-setup
  - [x] Commit a test file
- **Success Criteria**: Local git ops function without errors

### 3. GitHub Server
- **Purpose**: Open PRs, attach reports, trigger CI (if used)
- **Status**: ⏳ Awaiting Configuration
- **Config Required**: GITHUB_TOKEN (least-privilege: repo;workflow if CI)
- **Tests**:
  - [ ] Auth check
  - [ ] Create private test issue or draft PR
- **Success Criteria**: API reachable; action succeeds with given token

### 4. HTTP/OpenAPI Server
- **Purpose**: Call forms/email/analytics APIs later via HTTPS
- **Status**: ⏳ Awaiting Configuration
- **Config Required**: HTTP_ALLOWED_HOSTS (comma-separated)
- **Tests**:
  - [ ] GET https://example.org (sanity)
- **Success Criteria**: Successful outbound HTTPS to allowed hosts

---

## Manual Setup Required

### For Himanshu:
1. **GitHub Token**: Create a personal access token with `repo` scope (and `workflow` if CI is needed)
2. **HTTP Hosts**: Confirm which external hosts you allow for HTTP (e.g., forms provider, analytics)
3. **Security**: Share secrets via secure method (env vars or secrets manager; never commit to repo)

### Questions for Himanshu:
1. Do you already have a GitHub repo for this project? If yes, share repo URL and confirm access.
2. Should we enable GitHub Actions CI now for Lighthouse reports, or keep it local first?
3. Which provider do you prefer for forms and analytics (free-first)? If undecided, keep tool-agnostic for now.

---

## Future MCP Servers (Enable Later)
- **Browser/Scraper**: Competitor snapshots with robots.txt respect
- **Notion**: Editorial approvals or simple CMS
- **Google Sheets**: Lightweight tables (keywords, FAQs, experiments)

---

## Notes
- All MCP servers configured with least-privilege access
- Environment variables stored securely (never committed)
- Test results logged in `mcp_status.json`
- Ready to proceed to Landing Page v1 work order once connectivity verified

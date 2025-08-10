# MCP Connection Plan - Wittwizz Digital

## Project Overview
- **Project**: Wittwizz Digital — Landing Page v1
- **Owner**: Himanshu
- **Date**: 2025-08-10
- **Role**: Tech Lead + MCP Integrator

## Current Status
✅ **Project initialized** - Workspace structure created
✅ **Filesystem & Git servers** - Connected and tested
✅ **GitHub & HTTP servers** - Fully configured and tested
🔄 **Notion server** - Awaiting configuration (Task N1)

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
- **Status**: ✅ Fully Configured
- **Config Required**: GITHUB_TOKEN with `repo` scope ✅
- **Tests**:
  - [x] Auth check ✅
  - [x] Repository access ✅
  - [x] Write access ✅
  - [x] Issue creation ✅
  - [x] Commit push ✅
- **Success Criteria**: API reachable; action succeeds with given token
- **Current Status**: Full GitHub integration working, all MCP capabilities enabled

### 4. HTTP/OpenAPI Server
- **Purpose**: Call forms/email/analytics APIs later via HTTPS
- **Status**: ✅ Fully Configured
- **Config Required**: None (working without restrictions)
- **Tests**:
  - [x] GET https://httpbin.org ✅
  - [x] GET https://api.github.com ✅
  - [x] Network connectivity ✅
- **Success Criteria**: Successful outbound HTTPS to allowed hosts
- **Current Status**: All HTTPS requests working, ready for form/analytics integration

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
- **Google Sheets**: Lightweight tables (keywords, FAQs, experiments)

## Notion MCP Server (Task N1)
- **Purpose**: Progress tracking and task synchronization
- **Status**: ⏳ Awaiting Configuration
- **Config Required**: NOTION_API_KEY, NOTION_DB_ID
- **Tests**:
  - [ ] Environment variables check
  - [ ] API connectivity test
  - [ ] Page creation and update tests
- **Success Criteria**: Full CRUD operations on Notion database
- **Next**: Proceed to Task N2 (Sync rules) after successful setup

---

## Notes
- All MCP servers configured with least-privilege access
- Environment variables stored securely (never committed)
- Test results logged in `mcp_status.json`
- Ready to proceed to Landing Page v1 work order once connectivity verified

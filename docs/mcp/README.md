# MCP Server Setup - Wittwizz Digital

## 🎯 Objective
Set up essential MCP (Model Context Protocol) servers for the Wittwizz Digital Landing Page v1 project with least-privilege access.

## 📊 Current Status

### ✅ Connected Servers
1. **Filesystem Server** - Full read/write access to project workspace
2. **Git Server** - Local repository operations (init, commit, branch)

### ⏳ Pending Configuration
1. **GitHub Server** - Requires `GITHUB_TOKEN` with `repo` scope
2. **HTTP/OpenAPI Server** - Requires `HTTP_ALLOWED_HOSTS` configuration

## 🚀 Next Steps

### For Himanshu (Manual Setup Required)
1. **Create GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Scopes: `repo` (and `workflow` if CI is needed)
   - Copy token to clipboard

2. **Configure HTTP Allowed Hosts**
   - Decide which external APIs you'll use (forms, analytics, etc.)
   - Examples: `forms.example.com,api.analytics.com`

3. **Set Environment Variables**
   - Copy `env.sample` to `.env` in project root
   - Fill in your actual values
   - **Never commit `.env` to version control**

### For Cursor (Automated Setup)
Once tokens are configured:
1. Test GitHub API connectivity
2. Test HTTP server with allowed hosts
3. Update status files
4. Proceed to Landing Page v1 work order (Task 1)

## 📁 Project Structure
```
wittwizz/
├── content/           # Landing page content (ready for Task 1)
├── docs/
│   └── mcp/         # MCP configuration and status
└── .git/            # Git repository (mcp-setup branch)
```

## 🔒 Security Notes
- All MCP servers configured with least-privilege access
- Environment variables stored securely (never committed)
- GitHub token limited to repository scope only
- HTTP access restricted to specified hosts only

## 📋 Acceptance Criteria Status
- ✅ Prior document review completed (no prior document found)
- ✅ Filesystem and git connectivity verified
- ✅ MCP status tracking implemented
- ✅ Environment template generated
- 🔄 GitHub and HTTP connectivity pending configuration
- 🔄 Manual setup steps documented

## 🎉 Ready for Next Phase
Once GitHub and HTTP servers are configured, we can proceed to:
**"Wittwizz Digital — Landing Page v1" work order JSON (Task 1)**

---

*Last updated: 2025-08-10*
*Branch: mcp-setup*
*Status: Partially Configured*

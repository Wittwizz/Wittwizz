# Notion MCP Setup - Wittwizz Digital

## Overview
This document guides the setup and troubleshooting of Notion MCP integration for progress tracking and task synchronization.

## Prerequisites for Himanshu
1. **Create Notion Integration**
   - Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Click "New integration"
   - Name: `Wittwizz Digital MCP`
   - Associated workspace: Your Wittwizz workspace
   - Capabilities: Read content, Update content, Insert content
   - Click "Submit"
   - Copy the Internal Integration Token (starts with `secret_`)

2. **Create Notion Board Database**
   - Create a new page in your Notion workspace
   - Type `/database` and select "Table - Full page"
   - Name: `Wittwizz Progress Board`
   - Add the integration to the page (click "Share" → "Invite" → search for your integration)
   - Grant "Full access" permissions

3. **Set Environment Variables**
   - Copy `docs/mcp/.env.sample` to `.env` in project root
   - Fill in `NOTION_API_KEY` and `NOTION_DB_ID`
   - **Never commit `.env` to version control**

## Database Property Schema
Your Notion database must have these exact property names:

| Property Name | Type | Description | Required |
|---------------|------|-------------|----------|
| **Name** | Title | Task/issue name | ✅ |
| **Status** | Select | Task lifecycle status | ✅ |
| **Type** | Select | Task category | ✅ |
| **Priority** | Select | Urgency level | ✅ |
| **Owner** | Person | Assigned team member | ✅ |
| **Due** | Date | Deadline | ❌ |
| **Repo** | Text | GitHub repository URL | ❌ |
| **Branch** | Text | Git branch name | ❌ |
| **PR** | URL | GitHub PR link | ❌ |
| **LH Perf** | Number | Lighthouse Performance score | ❌ |
| **LH A11y** | Number | Lighthouse Accessibility score | ❌ |
| **Cursor Task ID** | Text | Cursor task identifier | ❌ |
| **Notes** | Text | Additional context | ❌ |

### Status Values
- `Backlog` - New tasks
- `In Progress` - Active development
- `Review` - Ready for review
- `Blocked` - Waiting for input/approval
- `Done` - Completed

### Type Values
- `Feature` - New functionality
- `Bug` - Issue fix
- `Chore` - Maintenance task
- `Documentation` - Docs update

### Priority Values
- `Low` - Nice to have
- `Medium` - Standard priority
- `High` - Important
- `Critical` - Blocking progress

## Environment Variables
```bash
# Notion Integration
NOTION_API_KEY=secret_your_integration_token_here
NOTION_DB_ID=your_database_id_here
```

## Common Errors & Solutions

### 401 Unauthorized
- **Cause**: Invalid or expired API key
- **Solution**: Regenerate integration token in Notion

### 404 Not Found
- **Cause**: Invalid database ID or integration not shared
- **Solution**: 
  1. Copy database ID from URL: `https://notion.so/workspace/database_id`
  2. Ensure integration has access to the database

### 403 Forbidden
- **Cause**: Insufficient permissions
- **Solution**: Grant "Full access" to integration in database sharing settings

### Rate Limiting
- **Cause**: Too many API calls
- **Solution**: Implement exponential backoff in automation

## Testing the Integration
1. Verify environment variables are set
2. Run API sanity check against database endpoint
3. Create test page: "Cursor Handshake"
4. Update test page status to "Done"
5. Verify all operations complete successfully

## Next Steps
After successful setup, proceed to Task N2 (Sync rules) to configure automated updates from GitHub PRs and Cursor task lifecycle.

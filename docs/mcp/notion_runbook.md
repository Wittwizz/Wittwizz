# Notion Sync Runbook - Wittwizz Digital

## Overview
This runbook provides operational guidance for the Notion sync system, including troubleshooting, recovery procedures, and manual update steps when automation fails.

## Quick Status Check

### 1. Check Sync Health
```bash
# Verify environment variables
echo "NOTION_API_KEY: ${NOTION_API_KEY:0:10}..."
echo "NOTION_DB_ID: ${NOTION_DB_ID}"

# Test API connectivity
curl -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     "https://api.notion.com/v1/databases/$NOTION_DB_ID"
```

### 2. Check Recent Sync Logs
```bash
# Look for recent sync activity
tail -f /var/log/notion-sync.log | grep -E "(ERROR|WARN|SUCCESS)"
```

## Common Sync Errors & Recovery

### Error: "Notion API Rate Limit Exceeded"
**Symptoms**: 429 status code, sync operations fail
**Recovery Steps**:
1. Wait 60 seconds for rate limit reset
2. Check current rate limit usage:
   ```bash
   curl -H "Authorization: Bearer $NOTION_API_KEY" \
        -H "Notion-Version: 2022-06-28" \
        "https://api.notion.com/v1/databases/$NOTION_DB_ID" \
        -I | grep -i "x-ratelimit"
   ```
3. If persistent, implement exponential backoff in sync logic

### Error: "Notion Page Not Found"
**Symptoms**: 404 status code, sync operations fail
**Recovery Steps**:
1. Verify the page still exists in Notion
2. Check if page was moved or deleted
3. Recreate the page manually if needed
4. Update sync mappings to handle page recreation

### Error: "Invalid Property Value"
**Symptoms**: 400 status code, property validation fails
**Recovery Steps**:
1. Check the property schema in Notion
2. Verify property names match exactly (case-sensitive)
3. Ensure property values match expected types
4. Update sync rules if property schema changed

### Error: "Authentication Failed"
**Symptoms**: 401 status code, API calls rejected
**Recovery Steps**:
1. Verify `NOTION_API_KEY` is valid and not expired
2. Check if integration still has access to the database
3. Regenerate API key if necessary
4. Re-add integration to the database

## Manual Recovery Procedures

### 1. Manual Page Creation
When sync fails to create a page:

```bash
# Create page manually via API
curl -X POST "https://api.notion.com/v1/pages" \
     -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     -H "Content-Type: application/json" \
     -d '{
       "parent": {"database_id": "'$NOTION_DB_ID'"},
       "properties": {
         "Name": {"title": [{"text": {"content": "Manual Recovery Task"}}]},
         "Status": {"select": {"name": "Backlog"}},
         "Type": {"select": {"name": "Chore"}},
         "Priority": {"select": {"name": "Medium"}},
         "Notes": {"rich_text": [{"text": {"content": "Created manually due to sync failure"}}]}
       }
     }'
```

### 2. Manual Page Update
When sync fails to update a page:

```bash
# Get page ID first
curl -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     "https://api.notion.com/v1/databases/$NOTION_DB_ID/query" \
     -d '{"filter": {"property": "Name", "title": {"equals": "Task Name"}}}'

# Update the page
curl -X PATCH "https://api.notion.com/v1/pages/PAGE_ID" \
     -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     -H "Content-Type: application/json" \
     -d '{
       "properties": {
         "Status": {"select": {"name": "In Progress"}},
         "Notes": {"rich_text": [{"text": {"content": "Updated manually"}}]}
       }
     }'
```

### 3. Database Schema Recovery
If database properties are missing or corrupted:

```bash
# Get current database schema
curl -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     "https://api.notion.com/v1/databases/$NOTION_DB_ID"

# Compare with expected schema in notion_mappings.json
# Add missing properties manually in Notion UI
```

## Sync State Recovery

### 1. Identify Stale Sync State
```bash
# Find pages that haven't been updated recently
curl -H "Authorization: Bearer $NOTION_API_KEY" \
     -H "Notion-Version: 2022-06-28" \
     "https://api.notion.com/v1/databases/$NOTION_DB_ID/query" \
     -d '{
       "filter": {
         "and": [
           {"property": "Status", "select": {"equals": "In Progress"}},
           {"property": "Last Updated", "date": {"before": "2025-01-01"}}
         ]
       }
     }'
```

### 2. Force Sync Refresh
```bash
# Trigger manual sync for specific pages
./scripts/force-sync.sh --page-id PAGE_ID --event manual.refresh
```

### 3. Reset Sync State
```bash
# Clear sync locks and retry failed operations
./scripts/reset-sync-state.sh --clear-locks --retry-failed
```

## Monitoring & Alerting

### 1. Health Check Endpoint
```bash
# Check sync system health
curl "http://localhost:3000/health/sync" | jq '.notion.status'
```

### 2. Set Up Alerts
```yaml
# Example Prometheus alert rule
groups:
  - name: notion-sync
    rules:
      - alert: NotionSyncFailure
        expr: notion_sync_failures_total > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Notion sync failures detected"
          description: "{{ $value }} sync failures in the last 5 minutes"
```

### 3. Log Analysis
```bash
# Find sync patterns
grep "sync.*failed" /var/log/notion-sync.log | \
  awk '{print $4}' | sort | uniq -c | sort -nr

# Check for specific error types
grep -E "(rate.limit|not.found|invalid.property)" /var/log/notion-sync.log
```

## Emergency Procedures

### 1. Disable Sync Temporarily
```bash
# Stop sync service
sudo systemctl stop notion-sync

# Or disable specific webhooks
curl -X DELETE "https://api.github.com/repos/OWNER/REPO/hooks/HOOK_ID" \
     -H "Authorization: token $GITHUB_TOKEN"
```

### 2. Rollback to Last Known Good State
```bash
# Restore from backup
./scripts/restore-notion-backup.sh --date "2025-01-10T12:00:00Z"

# Or manually reset specific pages
./scripts/reset-page-status.sh --page-id PAGE_ID --status "Backlog"
```

### 3. Contact Support
If all recovery procedures fail:
1. Document the error and recovery attempts
2. Check Notion status page: https://status.notion.so/
3. Contact Notion support with integration details
4. Escalate to development team if needed

## Prevention & Maintenance

### 1. Regular Health Checks
```bash
# Daily sync health check
0 9 * * * /usr/local/bin/notion-sync-health-check.sh

# Weekly schema validation
0 10 * * 1 /usr/local/bin/validate-notion-schema.sh
```

### 2. Backup Strategy
```bash
# Daily database backup
0 2 * * * /usr/local/bin/backup-notion-db.sh

# Weekly full sync state backup
0 3 * * 0 /usr/local/bin/backup-sync-state.sh
```

### 3. Performance Monitoring
```bash
# Monitor sync performance
curl "http://localhost:3000/metrics" | grep notion_sync

# Check API response times
curl -w "@curl-format.txt" -H "Authorization: Bearer $NOTION_API_KEY" \
     "https://api.notion.com/v1/databases/$NOTION_DB_ID"
```

## Troubleshooting Checklist

- [ ] Environment variables are set and valid
- [ ] Notion API key has correct permissions
- [ ] Database exists and is accessible
- [ ] Property names match exactly (case-sensitive)
- [ ] Rate limits are not exceeded
- [ ] Network connectivity is stable
- [ ] Sync service is running
- [ ] Webhook endpoints are accessible
- [ ] Error logs are being generated
- [ ] Manual API calls work

## Contact Information

- **Primary Contact**: Development Team
- **Escalation**: DevOps Team
- **Emergency**: On-call Engineer
- **Notion Support**: https://developers.notion.com/docs/support

---

*Last Updated: 2025-01-11*
*Version: 1.0.0*

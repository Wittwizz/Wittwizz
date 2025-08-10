# Scripts Directory

This directory contains automation scripts for testing, monitoring, and maintaining the Notion sync system.

## Files

### `test-notion-sync-dry-run.sh`
A comprehensive test script that validates the Notion sync configuration and simulates various events to ensure proper functionality.

**Purpose**: Validates sync rules, field mappings, and event policies before actual implementation.

**Usage**:
```bash
# Make executable (Unix/Linux/macOS)
chmod +x scripts/test-notion-sync-dry-run.sh

# Run the test suite
./scripts/test-notion-sync-dry-run.sh

# Run with output to file
./scripts/test-notion-sync-dry-run.sh > test-results.txt 2>&1
```

**What it tests**:
1. Configuration file validation
2. JSON schema integrity
3. Required sync policies presence
4. Field mappings completeness
5. Status transition rules
6. Webhook endpoint configuration
7. Error handling setup
8. Dry run mode configuration
9. Event simulation and validation
10. PR lifecycle completeness

**Requirements**:
- `jq` for JSON processing (optional, will skip if not available)
- Bash shell environment
- Access to project configuration files

**Output**:
- Console output with colored test results
- Detailed log file in `logs/notion-sync-dry-run.log`
- Exit code 0 for success, 1 for failures

## Future Scripts

This directory will contain additional automation scripts as the project evolves:

- **`force-sync.sh`**: Manual sync triggering for specific pages
- **`reset-sync-state.sh`**: Clear sync locks and retry failed operations
- **`backup-notion-db.sh`**: Database backup and restoration
- **`validate-notion-schema.sh`**: Schema validation and reporting
- **`notion-sync-health-check.sh`**: Daily health monitoring

## Security Notes

- Scripts should be run with appropriate permissions
- Environment variables containing secrets should be properly secured
- Log files may contain sensitive information and should be protected
- Scripts should validate input and sanitize data before processing

## Integration

These scripts integrate with:
- **Notion API**: For database operations and validation
- **GitHub API**: For PR lifecycle simulation
- **Lighthouse**: For performance report simulation
- **MCP Servers**: For configuration validation

## Troubleshooting

If scripts fail:
1. Check file permissions and executable status
2. Verify environment variables are set
3. Ensure required tools (like `jq`) are installed
4. Review log files for detailed error information
5. Check configuration file syntax and completeness

---

*Last Updated: 2025-01-11*
*Version: 1.0.0*

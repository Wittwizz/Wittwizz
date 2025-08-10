# Manual Testing Guide for Deep Links

## Prerequisites
1. Ensure development server is running: `npm run dev`
2. Note the port number (usually 3002 based on recent testing)

## Test Scenarios

### 1. Quick Mode Link Test
**URL**: `http://localhost:3002?mode=quick&pick=starter`
**Expected Behavior**:
- Calculator opens in Quick mode
- Starter preset is automatically selected
- URL shows `?mode=quick&pick=starter`
- Calculator state reflects starter package

### 2. Advanced Mode Link Test
**URL**: `http://localhost:3002?mode=advanced&pick=brand_kit,web_site`
**Expected Behavior**:
- Calculator opens in Advanced mode
- Brand Kit and Web Site services are selected
- URL shows `?mode=advanced&pick=brand_kit,web_site`
- Calculator shows selected services with pricing

### 3. Legacy Link Test
**URL**: `http://localhost:3002?pick=starter`
**Expected Behavior**:
- Calculator automatically switches to Quick mode
- Starter preset is selected
- URL updates to include mode parameter
- Backward compatibility maintained

### 4. Bad Link Test
**URL**: `http://localhost:3002?mode=invalid&pick=nonexistent`
**Expected Behavior**:
- Calculator opens in default state
- Invalid parameters are ignored
- Calculator defaults to Quick mode with no selections
- No errors or crashes

### 5. Copy Link Button Test
**Steps**:
1. Open calculator in any mode
2. Select some services/presets
3. Click "Copy" button in shareable URL section
4. Paste URL in new tab
5. Verify same calculator state is restored

### 6. Browser Navigation Test
**Steps**:
1. Open calculator with specific configuration
2. Navigate to different calculator state
3. Use browser back button
4. Verify original configuration is restored
5. Use browser forward button
6. Verify second configuration is restored

## Test Results Template

| Test Scenario | Status | Notes |
|---------------|--------|-------|
| Quick Mode Link | ⬜ PASS / ⬜ FAIL | |
| Advanced Mode Link | ⬜ PASS / ⬜ FAIL | |
| Legacy Link | ⬜ PASS / ⬜ FAIL | |
| Bad Link Handling | ⬜ PASS / ⬜ FAIL | |
| Copy Link Button | ⬜ PASS / ⬜ FAIL | |
| Browser Navigation | ⬜ PASS / ⬜ FAIL | |

## Issues Found
- [ ] Issue 1: Description
- [ ] Issue 2: Description

## Overall Assessment
- [ ] All tests passed
- [ ] Some tests failed (see issues above)
- [ ] Deep links working correctly
- [ ] Ready for production deployment

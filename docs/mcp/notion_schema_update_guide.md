# Notion Database Schema Update Guide

## 🚨 **Immediate Action Required**

Your Notion database is missing the required properties for MCP integration. Here's how to fix it:

## 📋 **Step-by-Step Instructions**

### 1. **Open Your Database**
- Go to: https://www.notion.so/24b3654a61ff80f8b5abf85637f0579f
- Or search for "Wittwizz Progress Board" in your Notion workspace

### 2. **Add Required Properties**
Click the "+" button next to existing properties and add these:

#### **Status Property**
- **Name**: `Status`
- **Type**: `Select`
- **Options**: 
  - `Backlog`
  - `In Progress` 
  - `Review`
  - `Blocked`
  - `Done`

#### **Type Property**
- **Name**: `Type`
- **Type**: `Select`
- **Options**:
  - `Feature`
  - `Bug`
  - `Chore`
  - `Documentation`

#### **Priority Property**
- **Name**: `Priority`
- **Type**: `Select`
- **Options**:
  - `Low`
  - `Medium`
  - `High`
  - `Critical`

#### **Owner Property**
- **Name**: `Owner`
- **Type**: `Person`

#### **Optional Properties**
- **Due**: `Date`
- **Repo**: `Text`
- **Branch**: `Text`
- **PR**: `URL`
- **LH Perf**: `Number`
- **LH A11y**: `Number`
- **Cursor Task ID**: `Text`
- **Notes**: `Text`

### 3. **Verify Setup**
After adding properties, your database should have:
- ✅ **Name** (Title - already exists)
- ✅ **Status** (Select)
- ✅ **Type** (Select)
- ✅ **Priority** (Select)
- ✅ **Owner** (Person)
- ✅ **Due** (Date)
- ✅ **Repo** (Text)
- ✅ **Branch** (Text)
- ✅ **PR** (URL)
- ✅ **LH Perf** (Number)
- ✅ **LH A11y** (Number)
- ✅ **Cursor Task ID** (Text)
- ✅ **Notes** (Text)

## 🔧 **After Schema Update**

Once you've added the properties:

1. **Notify me** that the schema is updated
2. **I'll test page creation** automatically
3. **Verify all MCP tests pass**
4. **Proceed to Task N2** (Sync rules)

## 📱 **Quick Reference**

**Database URL**: https://www.notion.so/24b3654a61ff80f8b5abf85637f0579f
**Required Properties**: 12 total (1 existing + 11 new)
**Estimated Time**: 5-10 minutes
**Difficulty**: Easy (just clicking and typing)

## 🆘 **Need Help?**

If you get stuck:
1. Take a screenshot of your database
2. Share what properties you currently see
3. I'll guide you through the specific steps

---

**Status**: ⏳ **Waiting for schema update**
**Next**: Manual property addition in Notion interface
**After**: Automated testing and full MCP integration

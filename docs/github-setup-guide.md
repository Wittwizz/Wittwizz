# GitHub Repository Setup Guide

## 🚀 Step-by-Step Instructions

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `wittwizz-landing-page`
   - **Description**: "AI-powered brand, web, and growth sprints for India's startups"
   - **Visibility**: Private (recommended for business projects)
   - **Initialize with**: Don't check any boxes (we already have content)
5. Click "Create repository"

### 2. Connect Local Repository to GitHub
After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/wittwizz-landing-page.git

# Push your existing code to GitHub
git branch -M main
git push -u origin main
```

### 3. Set Up GitHub Pages (Optional)
If you want to host the site on GitHub Pages:
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/docs" folder
6. Click "Save"

### 4. Enable GitHub Actions (Optional)
For automated testing and deployment:
1. Go to "Actions" tab in your repository
2. Click "New workflow"
3. Choose "Node.js" or "Static site deployment"
4. Customize the workflow file as needed

## 🔑 Required Permissions

### Personal Access Token
You'll need a GitHub Personal Access Token with these scopes:
- `repo` - Full control of private repositories
- `workflow` - Update GitHub Action workflows (if using CI/CD)

### Create Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` and `workflow`
4. Copy the token (you won't see it again!)
5. Store it securely (we'll use it in the next step)

## 📁 Repository Structure
Your repository will contain:
```
wittwizz-landing-page/
├── content/website/          # Landing page content and assets
├── docs/                     # Documentation and guides
├── reports/                  # Performance and analytics reports
├── releases/                 # Version release notes
└── .gitignore               # Git ignore rules
```

## 🚨 Security Notes
- Never commit `.env` files or API keys
- Keep the repository private for business projects
- Use environment variables for sensitive configuration
- Regularly rotate access tokens

## ✅ Next Steps
1. Create the GitHub repository
2. Connect your local repository
3. Push your code
4. Set up environment variables (next task)
5. Proceed to landing page implementation

## 🆘 Need Help?
If you encounter any issues:
1. Check GitHub's documentation
2. Ensure your git user.email is set to `Wittwizdigitals@gmail.com`
3. Verify you have the correct permissions
4. Contact support if needed

---

**Estimated Time**: 10-15 minutes
**Difficulty**: Beginner-friendly
**Dependencies**: GitHub account, git configured locally

# Publishing Guide for @sirenapp/agent-toolkit

This guide covers how to publish the Siren Agent Toolkit TypeScript package to npm.

## 📋 Prerequisites

Before publishing, ensure you have:

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **Organization Access**: Must be added to the `@sirenapp` organization on npm
3. **Authentication**: Configured npm authentication locally
4. **Repository Access**: Push access to the GitHub repository

## 🔐 Authentication Setup

### 1. Login to npm

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Verify Organization Access

```bash
npm access list packages @sirenapp
```

You should see the packages you have access to in the @sirenapp organization.

### 3. Configure npm Token (for CI/CD)

For automated publishing via GitHub Actions:

1. Go to [npm access tokens](https://www.npmjs.com/settings/tokens)
2. Create a new **Automation** token
3. Add it as `NPM_TOKEN` secret in GitHub repository settings

## 🚀 Manual Publishing Process

### 1. Pre-publish Checklist

- [ ] All tests passing: `npm test`
- [ ] Code linting clean: `npm run lint`
- [ ] TypeScript compilation successful: `npm run type-check`
- [ ] Build successful: `npm run build`
- [ ] Version updated in package.json
- [ ] CHANGELOG.md updated
- [ ] README.md updated with latest features

### 2. Version Management

Use semantic versioning (semver):

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features, backwards compatible)
npm version minor

# Major release (breaking changes)
npm version major
```

This will:
- Update version in package.json
- Create a git tag
- Run the `version` script (builds the package)

### 3. Publish to npm

```bash
# Dry run (see what would be published)
npm publish --dry-run

# Actual publish
npm publish
```

The `prepublishOnly` script will automatically run:
- Type checking
- Tests
- Build

### 4. Verify Publication

```bash
# Check if package is available
npm view @sirenapp/agent-toolkit

# Test installation
npm install @sirenapp/agent-toolkit
```

## 🤖 Automated Publishing via GitHub Actions

### Workflow Triggers

The GitHub Actions workflow can be triggered by:

1. **Manual Trigger**: Use the "Actions" tab in GitHub
2. **Git Tags**: Push a tag matching `v*.*.*` pattern

### Manual Trigger

1. Go to GitHub repository → Actions tab
2. Select "Publish Package" workflow
3. Click "Run workflow"
4. Choose the version type (patch/minor/major)
5. Click "Run workflow"

### Tag-based Trigger

```bash
# Create and push a version tag
git tag v1.0.1
git push origin v1.0.1
```

This will automatically trigger the publish workflow.

## 📦 What Gets Published

The published package includes:

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Package documentation
- `package.json` - Package metadata
- `LICENSE` - License file

Excluded files (via `.npmignore`):
- `src/` - Source TypeScript files
- `examples/` - Example code
- `tests/` - Test files
- Configuration files
- Development dependencies

## 🔄 Release Process

### For Patch Releases (Bug Fixes)

```bash
git checkout main
git pull origin main
npm version patch
npm publish
```

### For Minor Releases (New Features)

```bash
git checkout main
git pull origin main
npm version minor
npm publish
```

### For Major Releases (Breaking Changes)

```bash
git checkout main
git pull origin main
npm version major
npm publish
```

## 🏷️ Beta/Alpha Releases

For pre-release versions:

```bash
# Alpha release
npm version prerelease --preid=alpha
npm publish --tag alpha

# Beta release  
npm version prerelease --preid=beta
npm publish --tag beta

# Install pre-release
npm install @sirenapp/agent-toolkit@alpha
npm install @sirenapp/agent-toolkit@beta
```

## 🐛 Troubleshooting

### Common Issues

**1. Permission Denied**
```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/@sirenapp%2fagent-toolkit
```
Solution: Ensure you're added to the @sirenapp organization and have publish permissions.

**2. Version Already Exists**
```
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/@sirenapp%2fagent-toolkit - You cannot publish over the previously published versions
```
Solution: Bump the version number in package.json.

**3. Build Failures**
```
npm ERR! prepublishOnly script failed
```
Solution: Fix TypeScript errors, test failures, or build issues before publishing.

**4. Two-Factor Authentication Required**
```
npm ERR! publish Failed PUT 403
npm ERR! This operation requires a one-time password.
```
Solution: Use `npm publish --otp=123456` with your 2FA code.

### Registry Configuration

If you need to configure the npm registry:

```bash
# Set registry for @sirenapp scope
npm config set @sirenapp:registry https://registry.npmjs.org/

# Verify configuration
npm config get @sirenapp:registry
```

## 📊 Post-Publication

After successful publication:

1. **Verify Installation**: Test installing the package in a fresh project
2. **Update Documentation**: Ensure all documentation reflects the new version
3. **Announce Release**: Update relevant channels about the new release
4. **Monitor Usage**: Check npm download statistics and user feedback

## 🔍 Package Information

View package information:

```bash
# Latest version info
npm view @sirenapp/agent-toolkit

# All versions
npm view @sirenapp/agent-toolkit versions --json

# Download stats
npm view @sirenapp/agent-toolkit --json
```

## 🆘 Support

If you encounter issues during publishing:

1. Check [npm documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish)
2. Verify organization membership and permissions
3. Contact team lead for assistance with access issues
4. Create an issue in the repository for technical problems

---

**Note**: Always test the package thoroughly before publishing to ensure a smooth experience for users!
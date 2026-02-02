# Deploying The Hampstead Design Journal to hampsteadrenovations.co.uk/journal/

This guide explains how to build and deploy the journal as static files under the main site.

## Overview

The journal is configured to:
- Export as static HTML under `/journal/` basePath
- Use trailing slashes for all URLs
- Have all images unoptimized (required for static export)
- Have correct canonical URLs pointing to `www.hampsteadrenovations.co.uk/journal/`

## Build Steps

### 1. Build the Journal Static Export

```bash
cd "c:\Users\rossd\OneDrive\The Hampstead Design Journal\the-hampstead-design-journal"
npm install --legacy-peer-deps
npm run build
```

This will generate static files in the `out/` directory.

### 2. Copy to Main Site

Copy the entire `out/` contents to the main site's `public/journal/` folder:

**PowerShell:**
```powershell
# From the journal repo directory
$journalOut = "c:\Users\rossd\OneDrive\The Hampstead Design Journal\the-hampstead-design-journal\out"
$mainSiteJournal = "c:\Users\rossd\OneDrive\nw-renovation-ai\public\journal"

# Create journal directory if it doesn't exist
New-Item -ItemType Directory -Force -Path $mainSiteJournal

# Copy all files
Copy-Item -Path "$journalOut\*" -Destination $mainSiteJournal -Recurse -Force
```

**Bash/Unix:**
```bash
# From the journal repo directory
cp -r out/* ../nw-renovation-ai/public/journal/
```

### 3. Deploy Main Site

Deploy the main site as usual (e.g., `git push` to trigger Vercel deployment).

## URL Structure

After deployment, URLs will be:

| Old URL | New URL |
|---------|---------|
| `the-hampstead-design-journal.vercel.app/` | `www.hampsteadrenovations.co.uk/journal/` |
| `the-hampstead-design-journal.vercel.app/articles/{slug}/` | `www.hampsteadrenovations.co.uk/journal/articles/{slug}/` |
| `the-hampstead-design-journal.vercel.app/categories/{cat}/` | `www.hampsteadrenovations.co.uk/journal/categories/{cat}/` |

## 301 Redirects

The journal repo's `vercel.json` contains host-conditional redirects that will:
- Only trigger when accessed via `the-hampstead-design-journal.vercel.app`
- 301 redirect all paths to the corresponding path under `www.hampsteadrenovations.co.uk/journal/`

## Files Changed

### next.config.js
- Added `output: 'export'` for static generation
- Added `basePath: '/journal'` for URL prefix
- Added `trailingSlash: true` for consistent URLs
- Set `images: { unoptimized: true }` (required for static export)

### vercel.json
- Added host-conditional 301 redirects for the old domain

### SEO Updates
- All canonical URLs point to `www.hampsteadrenovations.co.uk/journal/...`
- All schema.org URLs updated to `.co.uk`
- All email addresses updated to `@hampsteadrenovations.co.uk`
- metadataBase set to new URL

## QA Checklist

After deployment, verify:

- [ ] `/journal/` loads correctly
- [ ] `/journal/articles/{any-slug}/` loads correctly
- [ ] Canonical tags point to `.co.uk` URLs
- [ ] Old Vercel URLs 301 redirect to new URLs
- [ ] Sitemap includes journal URLs with `.co.uk` domain
- [ ] JSON-LD schemas use `.co.uk` URLs
- [ ] No mixed domain references in content
- [ ] Images load correctly (with unoptimized setting)

## Automation Script

For automated deployments, here's a combined script:

```powershell
# build-and-deploy-journal.ps1

# 1. Build journal
Set-Location "c:\Users\rossd\OneDrive\The Hampstead Design Journal\the-hampstead-design-journal"
npm run build

# 2. Clear and copy to main site
$mainSiteJournal = "c:\Users\rossd\OneDrive\nw-renovation-ai\public\journal"
Remove-Item -Path $mainSiteJournal -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $mainSiteJournal
Copy-Item -Path "out\*" -Destination $mainSiteJournal -Recurse -Force

# 3. Commit and push main site
Set-Location "c:\Users\rossd\OneDrive\nw-renovation-ai"
git add public/journal
git commit -m "Update journal static export"
git push

Write-Host "Journal deployed successfully!" -ForegroundColor Green
```

## Migration Map

See `migration/journal-url-map.csv` for a complete mapping of all 1,508 article URLs from old paths to new paths.

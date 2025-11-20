# Sudhir Minimalistic Blog

A minimalist personal blog and landing page, designed as a clone of [amasad.me](https://amasad.me). This project focuses on typography, readability, and a clean aesthetic.

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [File Structure](#file-structure)
- [Design System](#design-system--requirements)
- [Setup & Usage](#setup--usage)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## Project Overview

- **Goal**: Create a personal website that serves as a blog and portfolio.
- **Aesthetic**: Minimalist, text-focused, high readability.
- **Key Features**:
    - **Dark/Light Mode**: Toggleable theme respecting system preferences.
    - **Markdown Rendering**: Essays are written in Markdown and rendered client-side.
    - **Responsive Design**: Optimized for reading on all devices.
    - **RSS Feed**: Automated RSS feed generation via GitHub Actions.
    - **Pinned Posts**: Pin important posts to the top of the homepage.
    - **External Links**: Link posts to external projects/URLs.
    - **Image Features**: Resizing, float positioning, text wrapping.

## Technology Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom styling with CSS variables for theming. No frameworks used.
- **JavaScript (Vanilla)**: Logic for theme toggling, fetching essays, and rendering markdown.
- **Libraries**:
    - [Marked.js](https://github.com/markedjs/marked): For parsing Markdown to HTML.
    - [Highlight.js](https://highlightjs.org/): For syntax highlighting in code blocks.

## File Structure

```
f:/Projects/sudhir_minimalistic/
├── .github/
│   └── workflows/
│       └── generate-rss.yml    # GitHub Actions workflow for RSS automation
├── .nojekyll                   # Prevents Jekyll processing on GitHub Pages
├── assets/
│   └── img/
│       ├── favicons/           # Site favicons
│       └── posts/              # Blog post images
├── essays/                     # Markdown essay files
├── index.html                  # Homepage with essay list
├── about.html                  # About page
├── essay.html                  # Essay template
├── styles.css                  # Global styles
├── app.js                      # Application logic
├── essays.json                 # Essay metadata (IMPORTANT!)
├── validate_essays.py          # JSON validation script (USE THIS!)
├── generate_rss.py             # RSS feed generator script
├── feed.xml                    # Generated RSS feed
└── README.md                   # This file
```

## Design System & Requirements

### Typography
- **Header Font**: System UI Stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.)
- **Body Font**: System UI Stack (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.)
- **Monospace**: 'Menlo', 'Monaco', 'Courier New', monospace

**Font Sizes**:
- **Body Text**: `20px` (Global default)
- **Site Header**: `26px`
- **Navigation Links**: `18px`
- **Essay List Links**: `19px`
- **Post Title (H1)**: `32px`
- **Post Subheadings (H2)**: `24px`
- **Post Small Headings (H3)**: `20px`

### Color Palette
- **Light Mode (Reading Mode)**:
    - Background: `#f9f7f1` (Warm Off-White)
    - Text Primary: `#383838` (Soft Black)
    - Text Secondary: `#666666`
    - Link Color: `#4183c4`
- **Dark Mode (Reading Mode)**:
    - Background: `#222222` (Soft Dark Gray)
    - Text Primary: `#cdc9c3` (Warm Gray)
    - Text Secondary: `#a0a0a0`
    - Link Color: `#64b5f6`

### Layout Rules
- **Content Width**: 70% of the viewport width on desktop.
- **Alignment**: Middle-aligned (`margin: 0 auto`).
- **Mobile**: Adjusts to 90% width on screens smaller than 600px.

### Navigation
- **Home**: Links to About, LinkedIn, Email, Github, RSS.
- **Essay/About Pages**: Minimal navigation. Only a "Back to Home" link is present to maintain focus on content.

## Setup & Usage

### Adding Essays

#### 1. Create the Markdown File
Write your essay in Markdown format and save it in the `essays/` folder.

**Frontmatter (Required):**
Each essay file must start with YAML frontmatter containing metadata:

```yaml
---
title: "Your Essay Title"
date: 2025-11-20 14:00:00 +0530
description: "A brief description of your essay for the homepage and RSS feed"
categories: [Category1, Category2]
tags: [tag1, tag2, tag3]
---
```

**How Metadata is Used:**
- **`title`**: 
  - Displayed as the essay title on the homepage list
  - Used as the page title when viewing the essay
  - Appears in the RSS feed
  - **MUST match** the `title` in `essays.json`
- **`date`**: 
  - Used for sorting essays (newest first)
  - Displayed on the essay page
  - Included in RSS feed pubDate
  - **MUST match** the `date` in `essays.json` (format: `YYYY-MM-DD`)
- **`description`**: 
  - Shown in the RSS feed
  - Can be used for SEO meta tags (future enhancement)
  - **MUST match** the `description` in `essays.json`
- **`categories` and `tags`**: 
  - Currently for organization only
  - Can be used for filtering/search (future enhancement)

**Note:** The frontmatter is automatically stripped when rendering the essay content.

#### 2. Add Images (Optional)

- Store images in `assets/img/posts/`.
- Reference them using `![Alt Text](/assets/img/posts/filename.png)`.
- **Resizing**: Append hash parameters to the URL:
    - `#w50` for 50% width
    - `#h300` for 300px height
    - `#w50-h300` for both width and height
- **Float Positioning**: Add `left` or `right` to float images with text wrapping:
    - `#left` or `#w40-left` for float left
    - `#right` or `#w40-right` for float right
    - Keep images under **800px width** to fit the layout perfectly.
- **Formatting**: Use **WebP** or **JPG** for photos, and **PNG** for graphics/screenshots.
- **Optimization**: Compress images (e.g., using TinyPNG) to ensure fast loading times.

**Example:**
```markdown
![Firewall Diagram](/assets/img/posts/firewall.png#w60-left)
```

#### 3. Update `essays.json` (CRITICAL!)

**⚠️ IMPORTANT:** This is the most critical step. The `essays.json` file controls what appears on your homepage.

Add an entry for your new essay with metadata that **MUST match** the frontmatter:

```json
{
  "slug": "your-essay-slug",
  "title": "Your Essay Title",
  "date": "2025-11-20",
  "file": "essays/your-essay-file.md",
  "description": "A brief description of your essay"
}
```

**Fields Explained:**
- **`slug`**: URL-friendly identifier (e.g., `firewall-fundamentals`)
  - Used in the URL: `essay.html?slug=firewall-fundamentals`
  - Must be unique
- **`title`**: Must **exactly match** the `title` in the essay's frontmatter
- **`date`**: Must **exactly match** the `date` in frontmatter (format: `YYYY-MM-DD`)
- **`file`**: Path to the markdown file relative to project root
- **`description`**: Must **exactly match** the `description` in frontmatter
- **`pinned`** (optional): Set to `true` to pin this post to the top of the homepage
- **`externalUrl`** (optional): Set to an external URL to make the post link directly to that URL instead of the essay page (useful for projects hosted elsewhere)

**Pinning Posts:**
To pin a post to the top of the homepage, add `"pinned": true` to its entry:
```json
{
  "slug": "important-post",
  "title": "Important Post",
  "date": "2025-04-11",
  "file": "essays/important-post.md",
  "description": "This post will appear at the top",
  "pinned": true
}
```

**External Links:**
To link a post to an external URL (e.g., a project hosted elsewhere):
```json
{
  "slug": "pokedex",
  "title": "Pokedex Project",
  "date": "2025-10-26",
  "file": "essays/2025-10-26-pokedex.md",
  "description": "Interactive Pokedex web application",
  "externalUrl": "https://sudhir.is-a.dev/PokeDex/"
}
```
- External links open in a new tab
- A ↗ icon appears next to the title

**Post Sorting Behavior:**
- **Pinned posts** appear first, sorted by date among themselves (newest first)
- **Non-pinned posts** appear after, also sorted by date (newest first)
- A 📌 icon appears on the right side of pinned post titles
- Sorting happens automatically in JavaScript - no manual ordering needed

**Example:**
If you have:
- Post A (2025-05-01, pinned)
- Post B (2025-06-01, pinned)
- Post C (2025-07-01, not pinned)
- Post D (2025-04-01, not pinned)

They will display as: **B 📌**, **A 📌**, C, D

#### 4. Regenerate RSS Feed
After adding essays, regenerate the RSS feed:
```bash
python generate_rss.py
```
(This happens automatically on GitHub Pages via GitHub Actions)

### Running Locally
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### RSS Feed

The site includes an automated RSS feed at `/feed.xml`.

**For GitHub Pages deployment:**
- The RSS feed is automatically regenerated via GitHub Actions whenever you push changes to `essays.json`, essay files, or `generate_rss.py`.
- No manual intervention required.

**For local development:**
```bash
python generate_rss.py
```

The feed uses the base URL `https://sudhir.is-a.dev` and includes all essays from `essays.json`.

## Deployment

### GitHub Pages Deployment (Recommended)

#### Initial Setup

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

3. **Configure GitHub Actions Permissions**
   - Go to **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, select:
     - ✅ **Read and write permissions**
     - ✅ **Allow GitHub Actions to create and approve pull requests**
   - Click **Save**

4. **Wait for Deployment**
   - GitHub will automatically deploy your site
   - Check the **Actions** tab to see the deployment progress
   - Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

#### Custom Domain Setup (Optional)

If you want to use a custom domain like `sudhir.is-a.dev`:

1. **Add CNAME File**
   Create a file named `CNAME` in the root directory with your domain:
   ```
   sudhir.is-a.dev
   ```

2. **Configure DNS**
   - Go to your domain provider's DNS settings
   - Add a CNAME record:
     - Name: `@` or your subdomain
     - Value: `YOUR_USERNAME.github.io`

3. **Enable HTTPS**
   - Go to **Settings** → **Pages**
   - Check **Enforce HTTPS**

#### Automated RSS Feed Generation

The GitHub Actions workflow (`.github/workflows/generate-rss.yml`) automatically:
- Runs when you push changes to `essays.json`, essay files, or `generate_rss.py`
- Generates the RSS feed using `generate_rss.py`
- Commits the updated `feed.xml` back to the repository
- Triggers a new deployment

**No manual intervention needed!**

### Updating Your Site

1. **Add or Edit Essays**
   - Create/edit markdown files in `essays/`
   - Update `essays.json`

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add new essay: Your Essay Title"
   git push
   ```

3. **Automatic Deployment**
   - GitHub Actions will automatically regenerate the RSS feed
   - GitHub Pages will redeploy your site
   - Changes will be live in 1-2 minutes

## Troubleshooting

### Common Issues

#### Posts Not Appearing on Homepage

**Problem**: You added an essay but it doesn't show up on the homepage.

**Solutions**:
1. **Check `essays.json`**: Make sure you added an entry for the new essay
2. **Verify metadata match**: Ensure `title`, `date`, and `description` in `essays.json` **exactly match** the frontmatter
3. **Check file path**: Ensure the `file` path in `essays.json` is correct
4. **Clear browser cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)

#### Essay Shows "Failed to load essay"

**Problem**: Clicking on an essay shows an error.

**Solutions**:
1. **Check file path**: Verify the `file` path in `essays.json` is correct
2. **Check frontmatter**: Ensure the markdown file has valid YAML frontmatter
3. **Check console**: Open browser console (F12) to see specific errors

#### RSS Feed Not Updating

**Problem**: RSS feed doesn't include new posts.

**Solutions**:
1. **Local**: Run `python generate_rss.py` manually
2. **GitHub Pages**: 
   - Check **Actions** tab for workflow errors
   - Verify GitHub Actions permissions are set correctly
   - Make sure you pushed changes to `essays.json`

#### Images Not Displaying

**Problem**: Images in essays don't show up.

**Solutions**:
1. **Check path**: Ensure image path starts with `/` (e.g., `/assets/img/posts/image.png`)
2. **Verify file exists**: Check that the image file is in `assets/img/posts/`
3. **Check case sensitivity**: File names are case-sensitive on GitHub Pages
4. **Commit images**: Make sure you committed and pushed the image files

#### Pinned Posts Not Staying at Top

**Problem**: Pinned posts don't appear first.

**Solutions**:
1. **Check JSON**: Ensure `"pinned": true` is set in `essays.json`
2. **Clear cache**: Hard refresh your browser
3. **Check syntax**: Ensure `essays.json` is valid JSON (no trailing commas)

#### External Links Not Working

**Problem**: External link posts don't open the URL.

**Solutions**:
1. **Check field**: Ensure `externalUrl` field is set in `essays.json`
2. **Verify URL**: Make sure the URL is complete (includes `https://`)
3. **Clear cache**: Hard refresh your browser

### Validation

**⚠️ CRITICAL: Always validate `essays.json` before committing!**

The `essays.json` file can easily become corrupted when making manual edits. **Always validate it before generating the RSS feed or committing changes.**

**Validate `essays.json`:**
```bash
python validate_essays.py
```

This will check for:
- ✅ Valid JSON syntax
- ✅ Required fields (slug, title, date, file, description)
- ✅ No duplicate slugs
- ✅ Valid external URLs (if present)

**Quick JSON syntax check:**
```bash
python -c "import json; json.load(open('essays.json'))"
```
If there's an error, it will show you the line number.

**After validation passes, generate RSS feed:**
```bash
python generate_rss.py
```

**Best Practice Workflow:**
1. Edit `essays.json`
2. Run `python validate_essays.py` ✅
3. If validation passes, run `python generate_rss.py`
4. Test locally with `python -m http.server 8000`
5. Commit and push

### Common JSON Errors

**Trailing Commas:**
```json
// ❌ WRONG - trailing comma after last item
{
  "slug": "test",
  "title": "Test",
},  // <- Remove this comma!
]
```

**Missing Commas:**
```json
// ❌ WRONG - missing comma between items
{
  "slug": "test1"
}
{  // <- Need comma here!
  "slug": "test2"
}
```

**Duplicate Entries:**
The validation script will catch duplicate slugs automatically.

## Maintenance

### Regular Tasks

#### Adding New Essays
1. Create markdown file in `essays/`
2. Add entry to `essays.json`
3. **Validate**: Run `python validate_essays.py` ✅
4. Generate RSS: `python generate_rss.py`
5. Commit and push
6. RSS feed updates automatically on GitHub Pages

#### Updating Existing Essays
1. Edit the markdown file
2. Update `date` in both frontmatter and `essays.json` if needed
3. **Validate**: Run `python validate_essays.py` ✅
4. Commit and push

#### Removing Essays
1. Delete entry from `essays.json`
2. **Validate**: Run `python validate_essays.py` ✅
3. Optionally delete the markdown file
4. Commit and push
5. RSS feed updates automatically

### Best Practices

1. **ALWAYS validate `essays.json`**: Run `python validate_essays.py` before committing any changes to `essays.json`
2. **Match metadata**: Ensure frontmatter and `essays.json` have matching `title`, `date`, and `description`
3. **Use descriptive slugs**: Make slugs URL-friendly and descriptive (e.g., `firewall-fundamentals`)
4. **Optimize images**: Compress images before adding them to keep site fast
5. **Test locally**: Always test with `python -m http.server 8000` before pushing
6. **Commit often**: Make small, frequent commits with descriptive messages
7. **Check Actions**: Monitor the **Actions** tab on GitHub for any workflow errors

### File Naming Conventions

- **Essays**: `YYYY-MM-DD-Title_With_Underscores.md` (e.g., `2025-04-11-Firewall_Fundamentals.md`)
- **Images**: `descriptive-name.png` or `descriptive-name.jpg`
- **Slugs**: `lowercase-with-hyphens` (e.g., `firewall-fundamentals`)

### Important Files to Never Delete

- `.nojekyll` - Prevents Jekyll processing on GitHub Pages
- `.github/workflows/generate-rss.yml` - RSS automation
- `essays.json` - Controls homepage content
- `validate_essays.py` - JSON validation (prevents corruption)
- `generate_rss.py` - RSS feed generator

## Future Enhancements

- SEO meta tags for individual essays
- Search functionality
- Category/tag filtering
- Reading time estimates
- Table of contents for long essays
- Image lazy loading
- Comments system

---

**Need Help?** Check the [Troubleshooting](#troubleshooting) section or review the code comments in `app.js` and `styles.css`.

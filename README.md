# Sdb002.github.io

Personal portfolio — React + Vite, deployed to GitHub Pages by GitHub Actions.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Where things live

| Path | What |
|---|---|
| `src/data.jsx` | All content: status panel, stack, project cards, thesis, contact links |
| `src/sections/` | One component per page section |
| `src/components/` | Nav (with mobile menu), oscilloscope canvas, project card, live repo grid |
| `src/hooks/useGitHubRepos.js` | Fetches public repos from the GitHub API at runtime |
| `src/styles.css` | All styles, including the responsive breakpoints (860px, 520px) |

### Adding a project

Add an entry to `PROJECTS` in `src/data.jsx`, with `repo` set to the GitHub repo name. Its link and star count come from that name.

To show screenshots, put WebP files in `public/projects/<project>/` and list them in the card's `shots`, each with its real pixel size and a caption. Cards show them in a window frame with a pager; clicking opens a full-size viewer. Set `ratio` to change the frame's shape (default `16 / 10`). Use `fit: "contain"` for shots that shouldn't be cropped.

Repos without a hand-written card show up automatically under **more on github**. They're fetched live from `api.github.com`, and a snapshot in `REPO_SNAPSHOT` is the fallback if the API is unreachable or rate-limited.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to Pages.

**One-time setup:** in the repo's **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Until that's set, Pages keeps serving the raw `main` branch, which can't run a Vite app.

# Personal Tools Directory

A React + Vite subpage for keeping track of websites, apps, services, and tools.

- Public URL: `https://kevin-m-johnston.github.io/tools/`
- Local editor: add, edit, delete, import, and export
- Source of truth: `src/data/tools.json`
- Published version: read-only

## 1. Install it in your website repository

Copy this entire folder into the root of your cloned repository and name it `tools`:

```text
kevin-m-johnston.github.io/
├── index.html
├── marine/
├── tools/              ← copy this folder here
└── .github/
```

From PowerShell, an example would be:

```powershell
Copy-Item -Recurse .\tools-subpage D:\Dev\kevin-m-johnston.github.io\tools
cd D:\Dev\kevin-m-johnston.github.io\tools
npm install
```

Use your actual repository location if it is different.

## 2. Run the local editor

```powershell
cd D:\Dev\kevin-m-johnston.github.io\tools
npm run dev
```

Vite will open the editor in your browser. While running locally, the page displays Add, Edit, Delete, Import, and Export controls.

Every change is written directly to:

```text
tools/src/data/tools.json
```

Stop the local server with `Ctrl+C`.

## 3. Test the production build

```powershell
npm run build
npm run preview
```

The compiled site is placed in `tools/dist/`. The production build is read-only and hides the editor controls.

## 4. Add `/tools` to the GitHub Pages deployment

Your Pages workflow needs to build each Vite project and assemble them into one upload folder. A complete example is included at:

```text
docs/deploy-pages-example.yml
```

Copy or adapt that file as:

```text
.github/workflows/deploy-pages.yml
```

The example expects:

- the home page to be a root `index.html`
- the Marine Vite project to be in `marine/`
- this Vite project to be in `tools/`

After deployment, the addresses will be:

```text
https://kevin-m-johnston.github.io/
https://kevin-m-johnston.github.io/marine/
https://kevin-m-johnston.github.io/tools/
```

## 5. Publish updates

After changing the list through the local editor:

```powershell
cd D:\Dev\kevin-m-johnston.github.io
git status
git add tools
git commit -m "Add tools directory"
git push
```

For later list updates, you can commit only the data file:

```powershell
git add tools/src/data/tools.json
git commit -m "Update tools list"
git push
```

GitHub Actions will rebuild and publish the site.

## Data fields

Each entry supports:

- name and URL
- description
- type and status
- categories and tags
- platforms
- pricing
- personal notes
- favourite marker
- added and updated dates

You can edit `src/data/tools.json` manually, but the local editor is safer and easier.

## Important notes

- Do not commit `node_modules/` or `dist/`.
- The included `.gitignore` excludes both folders.
- The local save API exists only inside Vite's development server.
- GitHub Pages receives only static HTML, CSS, JavaScript, and JSON.
- Visitors cannot modify your repository through the public page.
- Export a JSON backup occasionally if the collection becomes important.

## Node requirement

This package uses Vite 8. Use Node.js 20.19 or newer, or Node.js 22.12 or newer.

Check your version with:

```powershell
node --version
npm --version
```

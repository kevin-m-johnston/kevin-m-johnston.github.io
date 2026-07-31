# Windows Installation Checklist

## First-time setup

1. Extract the ZIP.
2. Rename the extracted folder to `tools`.
3. Move it into the root of `kevin-m-johnston.github.io` beside `marine`.
4. Open PowerShell in the new `tools` folder.
5. Run:

```powershell
npm install
npm run dev
```

## Add and edit entries

Use the buttons in the locally opened page. Changes save automatically to:

```text
src\data\tools.json
```

## Publish

Open PowerShell in the repository root:

```powershell
git status
git add tools
git commit -m "Add tools page"
git push
```

Before the first deployment, update the repository's GitHub Pages workflow using `docs\deploy-pages-example.yml` as the guide.

## Later updates

```powershell
cd path\to\kevin-m-johnston.github.io\tools
npm run dev
```

Make your changes, stop the server with `Ctrl+C`, and then:

```powershell
cd ..
git add tools\src\data\tools.json
git commit -m "Update tools list"
git push
```

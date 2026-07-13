# Veggie Patch Ceremonies Website

This is the refactored GitHub Pages version of the website.

## Project structure

- `index.html` — page structure and content
- `css/style.css` — all website styling
- `js/app.js` — services, add-ons, gallery, wheelbarrow, and booking behavior
- `assets/images/` — hero art and gallery photographs
- `CNAME` — connects GitHub Pages to veggiepatchceremonies.com

## Uploading this version to GitHub

1. Back up your current repository by downloading it or creating a release.
2. Delete the old standalone `index.html` and any accidental files such as `index(4).html`.
3. Upload **all files and folders from this package**, preserving the directory structure.
4. Commit directly to the `main` branch.
5. Wait for the GitHub Pages deployment to finish.
6. Hard-refresh the live site with `Ctrl + Shift + R`.

Your repository root should look like:

```
CNAME
index.html
css/
  style.css
js/
  app.js
assets/
  images/
```

## Future updates

- Text or page structure: edit `index.html`
- Colors, layout, and responsive design: edit `css/style.css`
- Services, add-ons, wheelbarrow, galleries, or booking behavior: edit `js/app.js`
- New photographs: add them to `assets/images/` and reference the relative path

The Google Apps Script booking endpoint is already retained in the JavaScript/form integration from the current working site.


## Important

This refactored version will not work if only `index.html` is uploaded. The `css`, `js`, and `assets` folders must also be uploaded to the repository with their folder structure preserved.

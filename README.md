# A little something for you 💌

A private, mobile-first proposal page. Everything you need to edit lives at
the top of `script.js` in the `CONFIG` object — her name, your messages,
photos, song, and (optional) video.

## Folder structure

```
index.html
style.css
script.js
images/   -> her-1.jpg, her-2.jpg, her-3.jpg, her-4.jpg
music/    -> her-song.mp3
video/    -> her-video.mp4   (optional)
```

## 1. Add your content

- Drop 2–4 photos into `images/`, named `her-1.jpg` through `her-4.jpg`
  (or edit the `photos` list in `script.js` to match your own filenames).
- Drop your song into `music/` as `her-song.mp3` (or update `CONFIG.song.src`).
- Optional: drop a video into `video/` as `her-video.mp4`, then set
  `CONFIG.video.enabled = true` near the top of `script.js`.
- Delete the `PUT_..._HERE.txt` placeholder file in each folder once you've
  added your real files.

## 2. Test it locally first

Just double-click `index.html` to open it in your browser and click through
the whole flow before you publish it anywhere.

## 3. Publish it — easiest way (no git commands needed)

1. Go to [github.com/new](https://github.com/new) and create a new repository
   (public, no README/license needed since you already have files).
2. On the new repo's page, click **"uploading an existing file"**.
3. Drag in `index.html`, `style.css`, `script.js`, and the whole `images`,
   `music`, and `video` folders together, then click **Commit changes**.
   (Dragging folders works in Chrome and Edge; if your browser only accepts
   individual files, drag the files one at a time — GitHub will recreate the
   folders from the file paths.)
4. Go to **Settings → Pages**. Under "Build and deployment", set Source to
   "Deploy from a branch", choose the `main` branch and `/ (root)` folder,
   then **Save**.
5. Wait about a minute, then visit `https://your-username.github.io/your-repo-name/`
   — that's the link to send her.

## 4. Publish it — with git (if you already use it)

```
git init          # skip if a .git folder already exists
git add .
git commit -m "proposal site"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

Then follow step 4 above (Settings → Pages) to turn it on.

## Updating later

If you change photos, the song, or any text after it's already live, just
re-upload the changed files the same way (drag them into the repo page and
commit) — GitHub Pages updates automatically within a minute or so. Do a
hard refresh (Ctrl/Cmd + Shift + R) if you don't see the change right away.

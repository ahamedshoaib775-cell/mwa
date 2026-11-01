# MWAD Practicals

This repository contains a single‑page static website for the **Modern Web Application Development** practical exam (II BCA DS ‘A’, subject code 24PBDS32). The site lists six practical programs, each of which can be opened, viewed with line numbers, and copied to the clipboard.

## How to run locally

1. Clone the repository.
2. Open `index.html` in a web browser (double‑click works – no server needed).
3. Click a program row to expand it, then click **Copy code** to copy the program source. Paste into Notepad, save with the displayed filename, and double‑click the saved file to run it.

## Deploy on Vercel

1. Create a new project on Vercel and select **"Other"** as the framework preset.
2. Connect the GitHub repository (or push this repo to GitHub first).
3. **Build Command:** *leave empty* (no build step required).
4. **Output Directory:** *leave empty* – Vercel will serve the files from the repository root.
5. Deploy – Vercel will serve `index.html` directly.

All assets are plain HTML, CSS and JavaScript, with no dependencies or npm packages.

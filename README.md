# MWAD Practicals

A single‑page static website for the **Modern Web Application Development** practical exam (II BCA DS ‘A’, subject code 24PBDS32).

The page lists six practical programs, each showing the exact source code (visible even with JavaScript disabled) and a **Copy code** button.

## How to run locally
1. Open `index.html` by double‑clicking it. No server or build step is required.
2. Click a program to expand it, then click **Copy code** and paste the copied text into Notepad. Save the file with the shown filename and double‑click it to run.

## Deploy on Vercel
1. Create a new project on Vercel and select the **"Other"** framework preset.
2. Connect the GitHub repository (or push this repository first).
3. **Build command:** leave empty.
4. **Output directory:** leave empty (Vercel will serve the files from the repository root).
5. Deploy – Vercel will serve `index.html` directly.

No dependencies, no `package.json`, no build tools – just plain HTML, CSS and JavaScript.

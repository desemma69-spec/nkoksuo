# Truehost & Git Version Control Deployment Guide
## Nkosuo Division - New Juaben Traditional Area Portfolio

This document outlines the step-by-step process of exporting your application from Google AI Studio, putting it under Git version control, and deploying it to **Truehost** (or any cPanel-based web hosting provider).

---

## Part 1: Exporting Your Code from Google AI Studio

You can download the full, optimized codebase from the Google AI Studio user interface:
1. Locate the **Settings** menu or the **Export** icon at the top right of the AI Studio Build interface.
2. Select **Export as ZIP** to download a complete archive of the workspace, or click **Export to GitHub** to link your GitHub profile and push the code straight to a repository in one click.

---

## Part 2: Setting Up Git Version Control locally

If you exported the project as a ZIP, follow these commands in your local computer's terminal to initialize Git:

1. **Extract the ZIP file** into your preferred folder.
2. **Open your local terminal** (Command Prompt on Windows, Terminal on Mac) and navigate to the project directory:
   ```bash
   cd /path/to/your/extracted-folder
   ```
3. **Initialize Git repository**:
   ```bash
   git init
   ```
4. **Stage and commit the files**:
   ```bash
   git add .
   git commit -m "Initial commit of Nkosuo Division Traditional Area Web App"
   ```
5. **Publish to GitHub**:
   - Go to [GitHub.com](https://github.com) and create a new repository (e.g., `new-juaben-nkosuo`).
   - Copy the repository remote URL.
   - Run the following commands in your terminal:
     ```bash
     git branch -M main
     git remote add origin https://github.com/yourusername/new-juaben-nkosuo.git
     git push -u origin main
     ```

Now, every time you make changes locally:
```bash
git add .
git commit -m "Describe your updates here"
git push
```

---

## Part 3: Compiling for Production

To deploy to a hosting provider, you must compile your TypeScript/React files into optimized, static files:

1. Install local dependencies:
   ```bash
   npm install
   ```
2. Run the production build command:
   ```bash
   npm run build
   ```
This generates a folder named `dist` in your root directory. This `dist` folder contains the compiled HTML, high-speed compiled CSS, images, and Javascript assets.

---

## Part 4: Deploying to Truehost (cPanel Hosting)

Truehost provides cPanel hosting which is optimized for high uptime and local domains. Follow these steps to host your compiled app:

### Step 1: Compress the Build Folder
Go to your project directory on your computer, navigate to the newly created `dist/` folder, select all files inside it, and **compress them into a ZIP file** (e.g., `build.zip`).
*Note: Make sure you compress the contents of the `dist/` folder directly, not the `dist/` folder itself, so that `index.html` is at the top level of your zip.*

### Step 2: Upload to cPanel
1. Log into your **Truehost Client Area** and open your **cPanel**.
2. Click on **File Manager**.
3. Double-click on the **public_html** folder (this is the root directory for your public website).
4. Click **Upload** at the top menu, select your `build.zip` file, and upload it.
5. Once uploaded, right-click on `build.zip` inside cPanel File Manager and click **Extract**. Delete the `build.zip` file afterwards to keep things clean.

### Step 3: Handle Client-Side Routing (SPA redirection)
Because React uses client-side routing, reloading pages like `/gallery` or `/projects` directly on a web server might throw a `404 Not Found` error. 

To solve this, create a `.htaccess` file inside your **public_html** folder in cPanel and paste the following configuration:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
*Tip: If you cannot see `.htaccess`, click **Settings** at the top-right of cPanel File Manager, check **Show Hidden Files (dotfiles)**, and click Save.*

---

## Part 5: Configuring Your Database (Supabase)

When hosting on Truehost, make sure to add your database credentials as environment variables or update the file `dist/assets/...` or modify them before compiling:
- If you use static hosting platforms (like Netlify or Vercel), you can set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` inside the **Environment Variables** section of their dashboards.
- For cPanel static hosting, Vite bakes the environment variables during `npm run build`. Ensure you create a local `.env` file containing:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
  And then run `npm run build` before uploading to Truehost.

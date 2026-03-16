# Noorjahan Static Site

This is a simple HTML/CSS/JS static site. It does not require any build steps.

## How to run locally

1.  Open any `.html` file directly in your browser.
2.  Alternatively, if you have Node.js installed, run:
    ```bash
    npm install
    npm run dev
    ```
    Then open `http://localhost:3000`.

## How to deploy to Hostinger

1.  Log in to your Hostinger Control Panel.
2.  Go to the **File Manager**.
3.  Open the `public_html` folder.
4.  Upload the following files and folders:
    *   `index.html`
    *   `work.html`
    *   `team.html`
    *   `contact.html`
    *   `assets/` (the entire folder)

That's it! Your site will be live immediately.

## Note on Internet Connection
This site uses CDNs for Tailwind CSS, GSAP, and Lucide icons. An internet connection is required for these styles and icons to load correctly.

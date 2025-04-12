# Node.js Content Extractor

A structured Node.js application that automates login and content scraping from public or protected learning platforms (like W3Schools) and generates styled PDFs — with optional HTML preview before export.

---

## 🚀 Features

- Express.js backend with EJS templating
- Secure login flow with Puppeteer and session persistence
- Dynamic content scraping and cleanup
- HTML preview before PDF export
- Styled, print-ready PDF generation
- MVC-style project layout for scalability
- UI separation: login and content extraction now live on distinct pages
- Automatic removal of ads, navbars, and distractions

---

## 📁 Folder Structure

```
content-extractor-node/
├── public/                # Static assets (e.g., style.css)
├── output/                # Generated PDFs and HTML previews
├── src/
│   ├── app.js             # Express app entry point
│   ├── routes/            # Route definitions
│   ├── controllers/       # Route logic (login, scraping, PDF)
│   ├── services/          # Puppeteer scraper + PDF generator
│   └── views/             # EJS templates (login, form, pdf layout)
├── user-session/          # Persistent Puppeteer session (auto-generated)
├── .env.example           # Sample environment config
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata
└── README.md              # Project documentation
```

---

## ⚙️ Setup

```bash
# Clone the repo or start fresh
npm install
cp .env.example .env
node src/app.js
```

Access the app at:

```
http://localhost:3000
```

---

## ✅ How to Use

### 🔐 Step 1: Login

Go to `/login` and enter your credentials for the learning platform (e.g., W3Schools).

- Your session is saved so you won’t need to log in again unless you clear it.
- Successful login will redirect you automatically to the content extractor form.

### 📄 Step 2: Extract Content

At `/`, paste one or more **module URLs** (comma-separated).

Choose an action:

- **Generate PDF** – Saves styled PDFs of the content
- **Preview HTML** – Opens cleaned HTML preview in your browser

---

## 🧰 Output

All generated PDFs and preview files are saved in:

```
/output/
```

File names are timestamped and preview files match the PDF layout.

---

## 🛠 Troubleshooting

### 🧹 Resetting Puppeteer Login Session

If you encounter this error when starting the app:

```
Failed to create /user-session/SingletonLock: File exists
```

It means Puppeteer’s persistent browser session was not closed properly.

To fix it, simply delete the session folder:

```bash
rm -rf ./user-session
```

This will clear your saved browser session.  
✅ You’ll need to log in again at `/login` afterward.

---

## ⚖️ Legal Note

Use this tool only with content you have permission to access and extract.  
Respect the copyright and Terms of Use of any third-party websites.

---

## 📄 License

MIT

---

## 🙌 Contributing

Pull requests and feedback are welcome.  
Let’s keep things clean, secure, and useful!

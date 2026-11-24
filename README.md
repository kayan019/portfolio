# Njogu Wilson Kiiru — Software Engineer Portfolio

A modern, responsive, high-performance portfolio website built for **Njogu Wilson Kiiru**, Software Engineer, Web Developer, and UI/UX Designer.

## 🚀 Key Sections Included

1. **Home / Hero**: Introduction, dynamic code terminal widget, role banner, quick contact, and social links to GitHub (`Kayan019`) and direct email (`kayannjogu019@gmail.com`).
2. **About Me**: Educational background as a graduate of **Kirinyaga University (Bachelor of Science in Software Engineering, Second Class Honours)**, professional interests in AI & web architecture, career ambitions, and core strengths.
3. **Technical Skills**:
   - **Backend & AI**: Python, Flask, AI Recommendation logic, RESTful APIs.
   - **Frontend & UI/UX**: JavaScript (ES6+), HTML5, CSS3, Flexbox/Grid, Responsive Design.
   - **Databases**: MySQL, SQLite, Relational schema design, POS Transaction architecture.
   - **Tools & Deployment**: Git, GitHub, Render, VS Code, DevTools.
4. **Featured Projects Showcase**:
   - **AI Career Recommendation System**: Python, Flask, AI match algorithms, database storage.
   - **Supermarket POS System**: Retail business software, inventory tracking, MySQL/SQLite transaction logging.
   - **Dairy Farming Management Website**: Agricultural technology platform, yield management & milk orders.
   - **Car Showroom Website**: Interactive auto dealership catalog, vehicle filters, test-drive booking.
   - **Photography Portfolio Website**: Visual arts showcase, lightbox gallery, booking system.
5. **Experience & Education**:
   - **Mewa Electronics Ltd**: Software Engineer (Internship: March 2026 – Present & March 2024 – September 2024). Web solutions, troubleshooting, and digital business operations.
   - **Bygrace Electronics Limited**: Software Engineer (Attachment: March 2025 – August 2025). Software development, hardware/software integration, and database tracking.
   - **Kirinyaga University**: Bachelor of Science in Software Engineering (Second Class Honours).
   - **Certifications & Continuous Learning**: Applied Python, Flask, and web technologies.
6. **Contact**:
   - Direct email with one-click clipboard copy (`kayannjogu019@gmail.com`).
   - GitHub link (`https://github.com/Kayan019`).
   - Interactive contact form with real-time field validation, mailto fallback, and optional Flask/SQLite endpoint.

---

## 🛠️ How to Run Locally

### Option 1: Direct in Any Browser (Zero Setup)
Simply double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox).

### Option 2: Python HTTP Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: Full-Stack Flask Backend (with SQLite)
```bash
pip install -r requirements.txt
python app.py
```
Open `http://localhost:5000`.

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages (Static Hosting)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Njogu Wilson Kiiru portfolio"
   ```
2. Create a repository on your GitHub account (`Kayan019`) named `Kayan019.github.io` (or `portfolio`).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/Kayan019/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository, go to **Settings > Pages**, choose `Branch: main`, and click **Save**. Your site will be live at `https://kayan019.github.io/portfolio/`!

### Deploy to Render (Flask / Full-Stack)
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New + > Web Service**.
3. Select your repository.
4. Set Build Command: `pip install -r requirements.txt`
5. Set Start Command: `gunicorn app:app`
6. Click **Deploy Web Service**.

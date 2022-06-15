# Secure File Uploader – Frontend

This is the frontend for a simple and secure file sharing app. Built with Angular, it lets users upload files directly to S3 and get a private link to share — no public bucket, no clutter.

### What it does:

- Lets users choose a file and preview its name
- Uploads files directly to Amazon S3 (via signed URL from backend)
- Shows a loading spinner while uploading
- After upload, shows a **secure download link** (valid for 15 minutes)
- Has a **Copy** button to grab the link fast
- Displays a "Copied!" toast for clean UX

---

### 🛠 Tech stack:

- Angular 13
- SCSS for styles
- Talks to a Node.js backend that signs the URLs
- Minimal dependencies, fast to load

---

### Try it locally:

```bash
git clone https://github.com/sagar-j-rao/secure-file-uploader.git
cd secure-file-uploader-frontend
npm install
ng serve

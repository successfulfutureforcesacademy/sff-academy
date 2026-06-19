# Successful Future Forces Academy — Setup Guide
## Complete step-by-step instructions for non-technical users

---

## PART 1: Set Up Supabase (Your Database)

### Step 1 — Create a Supabase Account
1. Open your browser and go to: **https://supabase.com**
2. Click **"Start your project"** → Sign up with your email
3. Confirm your email, then log in

---

### Step 2 — Create a New Project
1. Click **"New Project"**
2. Name it: `sff-academy`
3. Set a **Database Password** (save it somewhere safe!)
4. Choose **Region**: Southeast Asia (Singapore) for best speed in Pakistan
5. Click **"Create new project"** — wait 1-2 minutes

---

### Step 3 — Create the Students Table
In your Supabase project, go to **Table Editor** → **New Table**

**Table name:** `students`

| Column Name | Type | Extra |
|-------------|------|-------|
| id | int8 | Primary Key, Auto-increment |
| name | text | Not Null |
| phone | text | Not Null |
| created_at | timestamptz | Default: now() |

Click **Save**.

---

### Step 4 — Create the Questions Table
**Table name:** `questions`

| Column Name | Type | Extra |
|-------------|------|-------|
| id | int8 | Primary Key, Auto-increment |
| question_text | text | Not Null |
| option_a | text | Not Null |
| option_b | text | Not Null |
| option_c | text | Not Null |
| option_d | text | Not Null |
| correct_answer | text | Not Null (values: A, B, C, or D) |

Click **Save**.

---

### Step 5 — Create the Results Table
**Table name:** `results`

| Column Name | Type | Extra |
|-------------|------|-------|
| id | int8 | Primary Key, Auto-increment |
| student_id | int8 | Not Null |
| student_name | text | Not Null |
| phone | text | Not Null |
| score | int4 | Not Null |
| total | int4 | Not Null |
| answers | text | (stores JSON) |
| submitted_at | timestamptz | Default: now() |

Click **Save**.

---

### Step 6 — Set Row-Level Security (RLS) Policies
Go to **Authentication → Policies** for each table.

**For `students` table** — click "New Policy" → "Create a policy from scratch":
- Policy Name: `Allow read students`
- Command: SELECT
- Expression: `true`
→ Save

**For `questions` table** — New Policy:
- Policy Name: `Allow read questions`
- Command: SELECT
- Expression: `true`
→ Save

**For `results` table** — New Policy:
- Policy Name: `Allow insert and read results`
- Command: ALL
- Expression: `true`
→ Save

---

### Step 7 — Get Your API Keys
1. Go to **Settings → API** in your Supabase project
2. Copy the **Project URL** (looks like: `https://abcxyz.supabase.co`)
3. Copy the **anon/public key** (a long string of letters)

---

### Step 8 — Add Students to the Database
Go to **Table Editor → students** → Click **"Insert row"**:

Add each student with:
- **name**: Ahmad Raza *(exactly as they will type it)*
- **phone**: 03001234567 *(no spaces, no dashes)*

Repeat for all students.

---

### Step 9 — Add Questions to the Database
Go to **Table Editor → questions** → Click **"Insert row"**:

Example:
- **question_text**: What is the capital of Pakistan?
- **option_a**: Lahore
- **option_b**: Islamabad
- **option_c**: Karachi
- **option_d**: Peshawar
- **correct_answer**: B

Repeat for all your questions.

---

## PART 2: Configure Your Website Files

### Open `js/config.js` and replace:

```javascript
const SUPABASE_URL = "https://YOUR_PROJECT_URL.supabase.co";
// ↑ Replace with your Project URL from Step 7

const SUPABASE_ANON_KEY = "YOUR_ANON_KEY_HERE";
// ↑ Replace with your anon/public key from Step 7

const TEST_END_TIME = {
  hour: 17,      // 5 = 5 PM, use 24-hour format (e.g. 14 = 2 PM)
  minute: 30,    // 30 = :30 minutes
};
// ↑ Change this to the time your test should end
```

---

### Open `pages/admin.html` and find this line (around line 120):

```javascript
const ADMIN_PASSWORD = "sff2025admin";
```

**Change `sff2025admin` to your own password.**

---

## PART 3: Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub Account
Go to **https://github.com** and sign up (free)

---

### Step 2 — Create a New Repository
1. Click the **+** icon → **"New repository"**
2. Repository name: `sff-academy`
3. Make it **Public**
4. Click **"Create repository"**

---

### Step 3 — Upload Your Files
1. Click **"uploading an existing file"** link on the empty repo page
2. Drag and drop ALL your files, keeping the folder structure:
   ```
   css/design.css
   js/config.js
   js/auth.js
   js/test.js
   js/results.js
   pages/test.html
   pages/result.html
   pages/admin.html
   index.html
   ```
3. Click **"Commit changes"**

---

### Step 4 — Enable GitHub Pages
1. Go to your repository → **Settings** (top menu)
2. Click **"Pages"** (left sidebar)
3. Under **Source**, select: **Deploy from a branch**
4. Branch: **main** → Folder: **/ (root)**
5. Click **Save**
6. Wait 2 minutes, then your site is live at:
   `https://YOUR_GITHUB_USERNAME.github.io/sff-academy/`

---

## Your Website URLs

| Page | URL |
|------|-----|
| Student Login | `https://username.github.io/sff-academy/` |
| Test Page | `https://username.github.io/sff-academy/pages/test.html` |
| Student Result | `https://username.github.io/sff-academy/pages/result.html` |
| Admin Panel | `https://username.github.io/sff-academy/pages/admin.html` |

Share the **Login URL** with students. Keep the **Admin URL** private.

---

## Changing the Test End Time Later
Only edit `js/config.js`:
```javascript
const TEST_END_TIME = { hour: 14, minute: 0 }; // 2:00 PM
```
Then re-upload just that one file to GitHub.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Student says "not registered" | Check name/phone in Supabase exactly — no extra spaces |
| Test not loading | Double-check your Supabase URL and key in config.js |
| Results not showing | Check RLS policies are set correctly for results table |
| Site not live | Wait 5 minutes after enabling GitHub Pages |

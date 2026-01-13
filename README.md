# S69-01-26-Team08-Full-Stack-NextjsAnd-AWS-Azure-DelayLess

# 🔐 Environment Variables Setup

## 📌 Overview

This project uses environment variables to securely manage configuration values such as database URLs and API endpoints. Sensitive values are never hard-coded and are protected from client-side exposure.

---

## 📁 Environment Files

### `.env.local`

* Stores **actual secrets** (API keys, database URLs, tokens)
* **Ignored by Git** and never committed
* Used only on local machines or deployment platforms

### `.env.example`

* A **template file** listing all required environment variables
* Contains **placeholder values** and comments
* Helps teammates replicate the setup safely


---



## 🔒 Security Measures

* `.env.local` is excluded using `.gitignore`
* Only `.env.example` is committed
* Server-only secrets are **never used in client components**
* Prevents accidental exposure of sensitive data

---

## 🛠️ Setup Instructions

To configure environment variables locally:

```bash
cp .env.example .env.local
```

Then update `.env.local` with actual values.

⚠️ Restart the dev server after making changes:

```bash
npm run dev
```

---

## ⚠️ Common Pitfalls Avoided

* Accidentally committing `.env.local`
* Confusing build-time vs runtime variables

---

## ✅ Why This Matters

This setup ensures:

* Secure handling of secrets
* Clean separation between client and server
* Easy onboarding for new team members
* Production-ready configuration management

---

## 🧠 One-Line Explanation (for demo/video)

> “We use `.env.local` for real secrets and `.env.example` as a safe template. Only variables prefixed with `NEXT_PUBLIC_` are accessible on the client, which prevents sensitive data from being exposed.”

---



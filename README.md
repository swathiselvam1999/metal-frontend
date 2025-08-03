# 💎 Metal Rate Management System – Frontend

This is the frontend of the **Metal Rate Management System**, a full-stack MERN application to manage metal rate entries, purity levels, and filter rate history.

Deployed with:
- Frontend: **Vercel**

🔗 Backend repo: [metal-backend](https://github.com/swathiselvam1999/metal-backend)

---

## 🧰 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router

---

## 🎨 Frontend Setup

### Prerequisites

- Node.js (v16+)
- Vite

### Setup

```bash
git clone https://github.com/swathiselvam1999/metal-frontend.git
cd metal-frontend
npm install
```

### Configure Environment

Create a `.env` file in the root of the frontend folder:

```env
VITE_API_BASE_URL=https://metal-backend-p9le.onrender.com
```

### Run the App

```bash
npm run dev
```

App will start at: `http://localhost:5173`

---

## 🌐 Frontend Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Set project root: `/`
5. Add environment variable: `VITE_API_BASE_URL` with your Render backend URL
6. Deploy

Deployed frontend URL:  
`https://metal-frontend-flame.vercel.app/rate`

---

## 👩‍💻 Author

- Swathi Selvam – [GitHub](https://github.com/swathiselvam1999)

---

## 📄 License

MIT

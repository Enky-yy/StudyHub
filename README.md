1# 📚 StudyHub

A modern full-stack web application that helps students discover, create, and manage study groups. StudyHub enables learners to collaborate based on shared interests, locate nearby study groups on an interactive map, and organize learning sessions efficiently.

---

## ✨ Features

### 👥 Study Group Management

* Create new study groups
* Edit and delete groups you own
* Browse all available study groups
* View detailed information for each group

### 🤝 Collaboration

* Join existing study groups
* Leave groups anytime
* Automatic member count management
* Creator-only permissions for editing and deleting

### 🗺️ Location-Based Discovery

* Automatic geocoding of meeting locations
* Interactive map using Leaflet
* View study groups geographically
* Location details stored with each group

### 🔐 Authentication

* Secure JWT-based authentication
* User registration and login
* Protected routes
* Session persistence using access tokens

### 📊 Dashboard

* View all groups you've created
* Group statistics
* Edit and delete directly from the dashboard
* Manage your study communities in one place

---

# 🛠 Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Axios
* React Leaflet

## Backend

* FastAPI
* SQLAlchemy ORM
* Pydantic
* JWT Authentication
* SQLite

## APIs & Services

* OpenStreetMap Nominatim API
* Leaflet Maps

## Deployment

* Frontend: Vercel
* Backend: Render

---

# 📂 Project Structure

```
StudyHub
│
├── frontend
│   ├── app
│   ├── components
│   ├── libs
│   ├── types
│   └── public
│
├── backend
│   ├── routes
│   ├── models
│   ├── schemas
│   ├── utils
│   ├── database.py
│   └── main.py
│
└── README.md
```

---

# 🚀 Features Overview

* User Registration & Login
* JWT Authentication
* Create Study Groups
* Join & Leave Groups
* Dashboard Management
* Interactive Map View
* Automatic Geocoding
* Responsive UI
* RESTful APIs
* Protected Routes

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/Enky-yy/studyhub.git
cd studyhub
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///./studyhub.db
```

Run the backend

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Run the frontend

```bash
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| POST   | `/auth/register` | Register a user |
| POST   | `/auth/login`    | Login           |

## Groups

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| GET    | `/groups`            | View all groups    |
| GET    | `/groups/{id}`       | View group details |
| POST   | `/groups`            | Create a group     |
| PUT    | `/groups/{id}`       | Update group       |
| DELETE | `/groups/{id}`       | Delete group       |
| POST   | `/groups/{id}/join`  | Join group         |
| POST   | `/groups/{id}/leave` | Leave group        |
| GET    | `/groups/my`         | View my groups     |

---

# 🔒 Authentication

StudyHub uses JWT (JSON Web Tokens) for secure authentication.

Protected endpoints require:

```
Authorization: Bearer <access_token>
```

---

# 🗺️ Maps

Meeting locations are automatically converted into latitude and longitude using the OpenStreetMap Nominatim API and displayed on an interactive Leaflet map.

---

# 📈 Future Improvements

* User profiles
* Search & filtering
* Group chat
* Event scheduling
* Notifications
* QR code for joining groups
* File sharing within groups
* Attendance tracking
* AI-powered study group recommendations
* Email verification

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Harsh Shah**

If you found this project helpful, consider giving it a ⭐ on GitHub!

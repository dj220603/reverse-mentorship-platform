# 👴🤝🧑 Reverse Mentorship Platform

> **Bridging the Digital Divide:** A Full-Stack AI-powered platform connecting Elderly Learners with Young Mentors to share wisdom and technology.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-FullStack-blue)

## 📖 About The Project
The **Reverse Mentorship Platform** addresses the loneliness and technological gap faced by the elderly. It allows seniors to find mentors who speak their language and understand their specific learning needs (e.g., using WhatsApp, Video Calling).

The system uses **Machine Learning (Cosine Similarity)** to match users and features a **Voice-First UI** to make technology accessible for seniors who struggle with typing.

---

## 🚀 Key Features

### 🧠 1. AI-Powered Matching Engine
- Uses **Cosine Similarity** (Scikit-Learn) to calculate compatibility scores between Mentors and Learners.
- Matches based on **Language Preference** (Hindi/English) and **Shared Interests**.

### 🎙️ 2. Voice-Enabled Accessibility (Speech-to-Text)
- **Problem:** Seniors often struggle with small keyboards.
- **Solution:** Integrated **Web Speech API**. Seniors can simply *speak* to fill out forms.
- **Audio Guide:** The application reads out instructions (Text-to-Speech) for ease of use.

### 🤖 3. Smart Intent Recognition (NLP)
- Converts conversational Hindi/Hinglish into technical tags.
- *Example:* - User says: *"Mera beta videsh mein hai, baat karni hai"* - AI detects: **"Video Calling, WhatsApp, Skype"**
- Handles Hindi Devanagari script and English transliteration.

### 🔐 4. Secure & Scalable Architecture
- **Backend:** High-performance API using **FastAPI** (Python).
- **Database:** **PostgreSQL** running in a **Docker Container** for data persistence.
- **Frontend:** Responsive UI built with **React.js + Vite**.

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js, Vite, Axios, Web Speech API |
| **Backend** | Python, FastAPI, SQLModel, Uvicorn |
| **Database** | PostgreSQL, Docker & Docker Compose |
| **ML/AI** | Scikit-Learn, NumPy, Pandas, NLP (Keyword Mapping) |
| **Styling** | CSS3, Responsive Design |

---

## ⚙️ How to Run Locally

Follow these steps to set up the project on your machine.

### Prerequisites
- Python 3.9+
- Node.js & npm
- Docker Desktop (Optional, for Database)

### 1. Clone the Repository
```bash
git clone [https://github.com/dj220603/reverse-mentorship-platform.git](https://github.com/dj220603/reverse-mentorship-platform.git)
cd reverse-mentorship-platform

2. Setup Backend (FastAPI)
Bash

cd backend
# Create virtual environment
python -m venv venv
# Activate venv (Windows)
venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run Server
uvicorn main:app --reload
Backend runs at: http://127.0.0.1:8000

3. Setup Frontend (React)
Open a new terminal:

Bash

cd frontend
# Install dependencies
npm install
# Run Frontend
npm run dev
Frontend runs at: http://localhost:5173

4. Setup Database (Docker)
Bash

docker-compose up -d
📸 Screenshots
🔮 Future Improvements
Video Integration: Implementing Jitsi/WebRTC for in-app video calls.

Biometric Login: Face ID login for seniors to avoid remembering passwords.

Gamification: Badges and rewards for Mentors.

👨‍💻 Author
Deepak Joshi

GitHub: dj220603

Role: Full Stack Developer & AI Enthusiast

Made with ❤️ for our Elders.
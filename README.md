# Digital Twin Substation ⚡🏭

An AI/ML-driven Digital Twin platform for Extra High Voltage (EHV) Electrical Substations. It enables real-time SCADA/telemetry streaming, interactive 3D component visualization, automated fault detection and diagnosis, physics-informed load simulations, and health tracking across critical power grid assets.

---

## 🌟 Key Features

- **Interactive 3D Substation Visualization**: WebGL/Three.js-based rendering of substation layouts and assets (transformers, circuit breakers, isolators, busbars, and bay lines).
- **Real-Time Telemetry & Monitoring**: Live streaming of sensor parameters (temperature, voltage, current, pressure, vibration, load factor) via Firebase Realtime Database.
- **AI/ML Fault Detection & Predictive Maintenance**:
  - Multi-component anomaly detection and diagnosis (Isolation Forest, XGBoost, LSTM).
  - Health index scoring and remaining useful life (RUL) estimation.
  - Anomaly classification across transformers, busbars, breakers, and isolators.
- **Physics & Scenario Simulation**:
  - What-if scenario testing under extreme load, ambient conditions, and phase faults.
  - Thermal runaway and overload consequence forecasting.
- **GIS Substation Mapping**: Interactive geospatial mapping using React Leaflet for substation location and topology overviews.
- **Alerting & Notification Engine**: Automated email alerts for critical threshold violations and anomaly predictions via SMTP.

---

## 🏗️ System Architecture

The platform follows a decoupled, microservices-oriented architecture:

```
┌────────────────────────────────────────────────────────┐
│                   Next.js Frontend                     │
│         (Three.js 3D View, Leaflet GIS, Recharts)      │
└───────────────────────────┬────────────────────────────┘
                            │ REST / SSE
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Node.js / Express API                │
│    (Asset Management, Firebase Sync, Auth & Alerts)    │
└─────────────┬────────────────────────────┬─────────────┘
              │ MongoDB                    │ REST
              ▼                            ▼
   ┌──────────────────────┐   ┌──────────────────────────┐
   │    MongoDB Database   │   │     FastAPI ML Engine    │
   │  (Substations, Logs) │   │  (XGBoost, LSTM, Models) │
   └──────────────────────┘   └──────────────────────────┘
```

### Component Stack
| Service | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router), React, Three.js, Tailwind CSS, Recharts, Lucide Icons | 3D rendering, live dashboards, GIS substation locator, simulation control panel. |
| **Backend** | Node.js, Express, TypeScript, Mongoose, Firebase Admin, Nodemailer | Business logic, telemetry ingestion, database orchestration, video/stream proxies. |
| **ML Engine** | Python 3.10+, FastAPI, Uvicorn, Scikit-learn, XGBoost, PyTorch/LSTM, Pandas | Real-time inferencing, anomaly detection, scenario simulation, feature engineering. |
| **Database** | MongoDB & Firebase Realtime Database | Primary configuration storage and live real-time state synchronization. |

---

## 📂 Project Structure

```plaintext
Digital-Twin-Substation/
├── backend/                       # Express.js API (TypeScript)
│   ├── src/
│   │   ├── config/                # Environment and DB configs
│   │   ├── controllers/           # API handlers (diagnosis, simulation, video)
│   │   ├── middleware/            # Error handling, validation
│   │   ├── routes/                # Express endpoint definitions
│   │   └── app.ts                 # Server entry point
│   └── package.json
│
├── frontend/                      # Next.js App Router Frontend
│   ├── public/                    # 3D models, textures, static assets
│   ├── src/
│   │   ├── app/                   # Next.js pages & routes
│   │   │   ├── asset-details/     # Component deep dive (Transformer, Breaker, etc.)
│   │   │   ├── create-substation/ # Wizard to register substations
│   │   │   ├── diagnosis/         # AI fault analysis & diagnosis views
│   │   │   ├── live-trend/        # Real-time telemetry charts
│   │   │   ├── simulation/        # What-if scenario simulator
│   │   │   └── view-substations/  # 3D canvas and GIS map view
│   │   ├── components/            # UI components, 3D Canvas, dashboards
│   │   └── lib/                   # API client, Firebase listeners, utils
│   └── package.json
│
├── ml/                            # Machine Learning & Simulation Service
│   ├── data/                      # Training & sample datasets
│   ├── model_files/               # Pretrained models (.pkl, .joblib, .pt)
│   ├── notebooks/                 # Model training & EDA notebooks
│   ├── src/
│   │   ├── endpoints/             # FastAPI route routers
│   │   ├── inference/             # Model inference pipelines (Transformer, Breaker, etc.)
│   │   ├── preprocessing/         # Scalers and feature transformers
│   │   └── main.py                # FastAPI entry point
│   └── requirements.txt
│
├── docker-compose.yml             # Multi-container orchestration
├── .env.example                   # Unified environment variable template
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer)
- [Python](https://www.python.org/) (v3.10 - 3.12 recommended)
- [Docker & Docker Compose](https://www.docker.com/) (Optional, for containerized run)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas connection)

---

### Option 1: Docker Compose (Quickstart)

Spin up MongoDB, the ML engine, the backend API, and the Next.js frontend with one command:

```bash
docker-compose up --build
```

Services will be accessible at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **ML Service**: [http://localhost:8000](http://localhost:8000)
- **ML Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Local Development Setup

#### 1. Setup ML Service (FastAPI)
```bash
cd ml
python -m venv .venv

# Windows
.venv\Scripts\activate
# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
python src/main.py
```
*ML service starts on `http://localhost:8000`.*

#### 2. Setup Backend (Node.js/Express)
```bash
cd backend
npm install
npm run dev
```
*Backend API starts on `http://localhost:5000`.*

#### 3. Setup Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## ⚙️ Environment Configuration

Create `.env` files in `backend/` and `frontend/` (or use the root `.env.example` as a template):

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/oceanberg-digital-twin
ML_SERVICE_URL=http://localhost:8000
ALLOWED_ORIGINS=*

# Firebase Auth / Credentials
FIREBASE_USER_EMAIL=admin@example.com
FIREBASE_USER_PASSWORD=your_password
FIREBASE_SERVICE_ACCOUNT_PATH=path/to/serviceAccountKey.json

# SMTP Notifications (Optional)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://<your-project>-default-rtdb.firebaseio.com
```

---

## 🧠 ML Inference & Substation Components

The ML service assesses specific failure modes and health metrics per equipment class:

- **Power Transformer**: DGA (Dissolved Gas Analysis), top-oil temperature, winding temperature, dielectric breakdown voltage, vibration anomaly classification.
- **Circuit Breaker**: Contact wear, SF6 gas pressure drops, trip coil current anomalies, operation timing deviation.
- **Disconnect Switch / Isolator**: Contact misalignment, temperature differentials, mechanical binding during switching operations.
- **Busbar & Baylines**: Overload current spikes, thermal imbalances, and phase voltage symmetry.

---

## 📜 Documentation & Guides
- [`PARAMETER_VISUALIZATION_IMPROVEMENTS.md`](./PARAMETER_VISUALIZATION_IMPROVEMENTS.md) — SCADA parameter mapping and dashboard charting enhancements.
- [`SIMULATION_ENHANCEMENTS.md`](./SIMULATION_ENHANCEMENTS.md) — What-if simulation engine documentation and load flow models.
- [`VIDEO_ANIMATION_FIXES.md`](./VIDEO_ANIMATION_FIXES.md) — Substation 3D camera animations and video stream integration notes.

---

## 📄 License
This project is proprietary and confidential. All rights reserved.

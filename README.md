# JetLens-LSTM-NLP-MERN-Microservices
JetLens AI-powered flight booking platform that combines LSTM and NLP with a React/Three.js frontend. The Node.js microservice backend integrates Amadeus API for live flight data and Firebase for auth. Features include 3D seat visualization, real-time dashboards, and CI/CD deployment .

# 🛩️ JetLens: AI-Powered Flight Booking Platform

[//]: ![JetLens Demo](https://via.placeholder.com/800x400.png?text=JetLens+Demo+GIF)  
[//]: *(Replace with actual screenshot/gif)*

## 🚀 Key Features
| Feature | Technology Stack |
|---------|------------------|
| **AI Price Prediction** | LSTM (PyTorch) • Prophet • RMSE-optimized |
| **Natural Language Search** | Transformer NLP (HuggingFace) • Intent Recognition |
| **3D Seat Visualization** | Three.js • React Fiber |
| **Real-time Dashboard** | ApexCharts • WebSockets |
| **Microservices** | Docker • API Gateway • Auth Service |
| **CI/CD Pipeline** | GitHub Actions • Heroku/Vercel |

## 🛠️ Tech Stack
### **AI/ML Core**
```python```
# Sample LSTM Model Architecture
model = Sequential([
    LSTM(128, input_shape=(30, 1)),  # 30-day lookback
    Dropout(0.2),
    Dense(1, activation='linear')  # Price prediction
])

PyTorch for time-series forecasting

HuggingFace for flight query NLP

PyCaret for automated model training

graph TD
    A[React Frontend] --> B[Node API Gateway]
    B --> C[Auth Microservice]
    B --> D[Prediction Microservice]
    D --> E[Amadeus Flight API]\

jetlens/
├── ml-core/               # LSTM & NLP models
│   ├── price_forecasting/
│   └── nlp_processing/
├── frontend/              # React application
│   ├── public/
│   └── src/
│       ├── components/3d-seat/
├── backend/               # Microservices
│   ├── auth-service/
│   ├── prediction-service/
│   └── api-gateway/
└── infra/                 # Deployment
    ├── docker-compose.yml
    └── CI-CD/

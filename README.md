# JetLens

JetLens is a full-stack application built to tackle the real-world challenges of flight search and price prediction. By combining a Python-based backend for machine learning inference with a modern Next.js frontend, JetLens empowers users to make smarter travel decisions.

## ✨ Features

- 🤖 Predicts flight prices using a trained ML model
- 🔗 REST API built with Python (Flask)
- 💻 Modern frontend built with Next.js and Tailwind CSS
- 📝 Logging and error handling
- ⚙️ Easy local development with batch scripts

## 🛠️ Problems Solved

JetLens directly addresses several pain points in the flight booking experience:

- 🛫 **Search Airport Optimization:** Quickly finds and filters airports from massive datasets, ensuring users get fast, relevant suggestions as they type.
- 🏆 **Flight Score Recommendation:** Helps users choose the best flights by ranking options based on price, duration, and personal preferences.
- ⚡ **Fast Fetching:** Uses optimized data fetching and caching to deliver instant results and a seamless browsing experience.
- 📈 **ML-Powered Price Forecasting:** Leverages machine learning to predict flight prices, so users can confidently plan and book at the right time.

## 🖼️ Screenshots

_Add screenshots of your application below. Place your images in the `Frontend/public` or a `screenshots/` folder and reference them here:_

![Homepage](./screenshots/homepage.png)
![Prediction Result](./screenshots/prediction.png)

## 📁 Project Structure

```
├── Data/
│   ├── airports.json
│   ├── fetchAirports.py
│   └── sampleApiResponse.json
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── Modeling/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── logs/
├── run.bat
├── start_api.bat
├── README.md
├── LICENSE
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- 🐍 Python 3.6+
- 🟩 Node.js (v16+ recommended)
- 📦 npm or pnpm

### Installation

#### Backend (ML API)

1. Navigate to the `Modeling` directory:
    ```sh
    cd Modeling
    ```
2. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```
3. Start the API:
    ```sh
    python -m app
    ```

#### Frontend

1. Navigate to the `Frontend` directory:
    ```sh
    cd Frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend:
    ```sh
    npm start
    ```

#### All-in-One

You can use the provided batch script to start both services:
```sh
./run.bat
```

## 🧑‍💻 Usage

- ML API: [http://127.0.0.1:5000](http://127.0.0.1:5000)
- Frontend: [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

See [Modeling/README.md](Modeling/README.md) for deployment instructions, including Heroku setup.

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Made with ❤️ by Rohit Deshmukh**
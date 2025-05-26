# JetLens

JetLens is a full-stack application for predicting flight prices using machine learning. It features a Python-based backend for ML inference and a Next.js frontend for user interaction.

## Features

- Predicts flight prices using a trained ML model
- REST API built with Python (Flask)
- Modern frontend built with Next.js and Tailwind CSS
- Logging and error handling
- Easy local development with batch scripts

## Problems Solved

JetLens addresses several key challenges in the flight search and booking domain:

- **Search Airport Optimization:** Efficiently searches and filters airports from large datasets, providing fast and relevant suggestions to users.
- **Flight Score Recommendation:** Ranks and recommends flights based on a combination of price, duration, and user preferences, helping users make informed decisions.
- **Fast Fetching:** Implements optimized data fetching and caching strategies to ensure quick responses and a smooth user experience.
- **ML-Powered Price Forecasting:** Utilizes machine learning models to accurately predict flight prices, enabling users to find the best deals and plan their trips with confidence.

## Project Structure

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

## Getting Started

### Prerequisites

- Python 3.6+
- Node.js (v16+ recommended)
- npm or pnpm

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

## Usage

- ML API: [http://127.0.0.1:5000](http://127.0.0.1:5000)
- Frontend: [http://localhost:3000](http://localhost:3000)

## Deployment

See [Modeling/README.md](Modeling/README.md) for deployment instructions, including Heroku setup.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Made with ❤️ by Rohit Deshmukh**
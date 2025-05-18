REM filepath: d:\Coding\JetLens-LSTM-NLP-MERN-Microservices\start_api.bat
@echo off
echo Starting JetLens Flight Price Prediction API...

REM Kill any existing process on port 5000
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :5000') DO (
    taskkill /PID %%P /F 2>nul
)

REM Change to the Modeling directory
cd %~dp0\Modeling

REM Start the Flask server
python run.py

REM Wait for user input before closing
pause
@echo off
REM filepath: d:\Coding\JetLens-LSTM-NLP-MERN-Microservices\start_services.bat
echo Starting JetLens services...

REM Set working directories
set FRONTEND_DIR=%~dp0Frontend
set BACKEND_DIR=%~dp0Modeling

REM Create logs directory if it doesn't exist
if not exist "%~dp0logs" mkdir "%~dp0logs"

echo Starting ML API on port 5000...
start cmd /K "cd /d %BACKEND_DIR% && python -m app"

REM Wait for ML API to initialize
timeout /t 5 /nobreak > NUL

echo Starting Next.js frontend on port 3000...
start cmd /K "cd /d %FRONTEND_DIR% && npm start"

echo.
echo Services are starting:
echo  - ML API: http://127.0.0.1:5000
echo  - Frontend: http://localhost:3000
echo.
echo Press any key to stop all services.
pause > NUL

REM Kill processes when user presses a key
taskkill /f /im python.exe
taskkill /f /im node.exe
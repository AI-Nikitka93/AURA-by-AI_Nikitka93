@echo off
setlocal EnableExtensions

where node >nul 2>&1
if errorlevel 1 (
  echo [BLOCKED] Node.js не найден в PATH.
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [BLOCKED] npm не найден в PATH.
  exit /b 1
)

if not exist "node_modules" (
  call npm install
  if errorlevel 1 exit /b %errorlevel%
)

call npm run dev -- --host 127.0.0.1 --port 4173
exit /b %errorlevel%

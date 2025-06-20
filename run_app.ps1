# Run the Crime Prediction Flask Application
Write-Host "Starting Convicted Crime in Malaysia Prediction System..." -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "app.py")) {
    Write-Host "Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Check if virtual environment exists
if (!(Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& "venv\Scripts\Activate.ps1"

# Install requirements
Write-Host "Installing requirements..." -ForegroundColor Yellow
pip install -r requirements.txt

# Run the Flask application
Write-Host "Starting Flask application..." -ForegroundColor Green
Write-Host "Application will be available at: http://127.0.0.1:5000" -ForegroundColor Cyan
python app.py 
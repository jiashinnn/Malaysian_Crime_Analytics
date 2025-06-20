# Malaysian Crime Statistics & Prediction System

## Overview

This web application provides comprehensive insights into crime statistics across Malaysia with data visualization and predictive analytics capabilities. The system analyzes crime data by states, districts, categories, and trends to help users understand patterns and make informed predictions.

## Features

### 1. Interactive Dashboard

The system includes a responsive Power BI dashboard that visualizes crime statistics with:

- Geographic distribution across all Malaysian states and districts
- Temporal trends showing how crime rates change over time
- Breakdown by crime categories and types
- Comparative analysis tools for different regions and time periods

### 2. Advanced Prediction System

The prediction system uses machine learning to forecast crime counts based on:

- Location (State and District)
- Crime Category (Assault or Property)
- Crime Type (specific crimes within each category)
- Year (historical data from 2016-2023, with future predictions to 2030)

The system employs an ensemble of three machine learning models:
- Random Forest
- XGBoost
- Decision Tree

For future predictions (beyond 2023), the system uses trend extrapolation techniques with dampening factors to account for increasing uncertainty.

## Crime Categories

The system focuses on two main crime categories:

### Assault Crimes
- Causing Injury
- Murder
- Rape
- Robbery (Gang/Solo, Armed/Unarmed)

### Property Crimes
- Break-ins
- General Theft
- Vehicle Theft (Lorry)
- Vehicle Theft (Car)
- Vehicle Theft (Motorcycle)

## Data Coverage

Our analysis is based on comprehensive crime data from Malaysia, covering:
- 14 States
- 150+ Districts
- 8 Years (2016-2023)
- 2 Main Categories
- 12 Crime Types
- Tens of thousands of records

## Technical Implementation

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5 framework for responsive design
- Custom styling with a yellow-themed color palette
- Interactive form elements with validation
- Dynamic content using Jinja2 templating

### Backend
- Python with Flask web framework
- Machine learning models (Random Forest, XGBoost, Decision Tree)
- Future prediction with trend extrapolation algorithms
- Integration with Power BI for data visualization

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/jiashinnn/Malaysian_Crime_Analytics.git
cd Malaysian_Crime_Analytics
```

2. Create and activate a virtual environment
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Run the application
```bash
python app.py
```

5. Access the application at http://localhost:5000

## Project Structure

```
Convicted_Crime_in_Malaysia/
├── app.py                  # Main Flask application (root for deployment)
├── requirements.txt        # Python dependencies (root for deployment)
├── run_app.ps1            # PowerShell script to easily start the app
├── backend/                # Backend data and models
│   ├── models/             # Machine learning models
│   │   └── ensemble_crime_model.pkl
│   └── data/               # Data files
│       └── crime_district.csv
├── frontend/               # Frontend assets
│   ├── static/             # CSS, JS, and other static files
│   │   ├── css/
│   │   │   └── style.css   # Main stylesheet
│   │   └── js/
│   │       ├── dashboard.js
│   │       ├── form-validation.js
│   │       └── main.js     # Main JavaScript
│   └── templates/          # HTML templates
│       ├── base.html       # Base template with layout
│       ├── dashboard.html  # Dashboard page
│       ├── error.html      # Error page
│       ├── form.html       # Prediction form
│       ├── index.html      # Home page
│       └── result.html     # Prediction results
├── notebooks/              # Jupyter notebooks for analysis
│   └── crime_prediction.ipynb
└── create_templates.ps1
└── README.md          # Detailed project documentation
└── LICENSE            # License file
```

## Usage Guide

### Home Page
The home page provides an overview of the system and crime statistics in Malaysia.

### Dashboard
Access the interactive dashboard to explore crime data visually:
1. Navigate to the Dashboard page
2. Use the interactive filters to customize your view
3. Click on elements to drill down into specific data points

### Prediction System
Make crime count predictions:
1. Navigate to the Prediction page
2. Select the state and district
3. Choose the crime category and type
4. Specify the year (2016-2030)
5. Click "Generate Prediction" to see results

For future predictions (2024-2030), the system will extrapolate trends with appropriate confidence warnings.

## Deployment

You can assess my system through this link [Malaysia Crime Analytics](https://malaysian-crime-analytics.onrender.com/) 

## Limitations

- Predictions are estimates based on historical patterns and should be used for informational purposes only
- Accuracy diminishes for predictions beyond the training data period (2023)
- The system does not account for unforeseen socioeconomic or policy changes that may affect crime rates


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data source: [Malaysian Government Open Data Portal](https://www.data.gov.my/)
- Special thanks to University Utara Malaysia for supporting this project

---

© 2025 | Lim Jia Shin 294837 | Information Visualization Individual Project 

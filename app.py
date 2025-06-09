from flask import Flask, render_template, request, url_for
import pickle
import numpy as np
import os
import warnings
# Suppress sklearn version warnings for model loading
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# Load ensemble model and label encoders
try:
    with open("ensemble_crime_model.pkl", "rb") as f:
        model_data = pickle.load(f)
    
    rf_model = model_data["RandomForest"]
    xgb_model = model_data["XGBoost"]
    dt_model = model_data["DecisionTree"]
    encoders = model_data["LabelEncoders"]
    print("Models loaded successfully!")
    
except Exception as e:
    print(f"Error loading models: {e}")
    print("Please ensure all required packages are installed with correct versions.")
    # Create dummy models for testing (not recommended for production)
    rf_model = None
    xgb_model = None
    dt_model = None
    encoders = None

# Flask app
app = Flask(__name__, static_folder='static')

# Configure app for production
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'

@app.route('/')
def home():
    return render_template('index.html', active_page='home')

@app.route('/health')
def health_check():
    """Simple health check endpoint"""
    model_status = "loaded" if all([rf_model, xgb_model, dt_model, encoders]) else "failed"
    return {
        "status": "healthy",
        "models": model_status,
        "numpy_version": np.__version__ if 'np' in globals() else "not loaded"
    }

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', active_page='dashboard')

@app.route('/predict')
def predict_form():
    return render_template('form.html', active_page='predict')

@app.route('/predict', methods=['POST'])
def predict():
    # Check if models are loaded
    if rf_model is None or xgb_model is None or dt_model is None or encoders is None:
        error_message = "Models failed to load. Please check server configuration and package versions."
        return render_template('error.html', error=error_message, active_page='predict')
    
    # Get input from form
    state = request.form['state']
    district = request.form['district']
    category = request.form['category']  # Will be 'assault' or 'property'
    crime_type = request.form['type']    # Will be specific type based on category
    year = int(request.form['year'])     # Between 2016-2030
    
    # Display values for debugging
    print(f"Predicting for: State={state}, District={district}, Category={category}, Type={crime_type}, Year={year}")

    # Encode categorical inputs
    try:
        # If your model expects 'All' as a value for district when making general predictions
        # You can use district as-is from the form or modify as needed
        
        state_encoded = encoders['state'].transform([state])[0]
        district_encoded = encoders['district'].transform([district])[0]
        category_encoded = encoders['category'].transform([category])[0]
        type_encoded = encoders['type'].transform([crime_type])[0]
    except Exception as e:
        error_message = f"Error in encoding input: {e}. Please check that your selections match the training data."
        return render_template('error.html', error=error_message, active_page='predict')

    # Handle future predictions (beyond 2023)
    is_future_prediction = year > 2023
    trend_adjustment = 0  # Initialize to zero for non-future predictions
    
    # For future predictions, we'll predict for 2023 and apply a trend adjustment
    prediction_year = min(year, 2023)
    
    # Get 2020-2023 predictions to calculate trend (if doing future prediction)
    if is_future_prediction:
        # We'll calculate a 3-year trend to extrapolate
        trend_years = [2020, 2021, 2022, 2023]
        trend_predictions = []
        
        for trend_year in trend_years:
            # Prepare input for model with trend year
            trend_features = np.array([[state_encoded, district_encoded, category_encoded, type_encoded, trend_year]])
            
            # Get predictions for this year
            trend_pred_rf = rf_model.predict(trend_features)[0]
            trend_pred_xgb = xgb_model.predict(trend_features)[0]
            trend_pred_dt = dt_model.predict(trend_features)[0]
            
            # Average prediction for this trend year
            trend_avg = (trend_pred_rf + trend_pred_xgb + trend_pred_dt) / 3
            trend_predictions.append(trend_avg)
        
        # Calculate average annual change (simple linear trend)
        annual_changes = [trend_predictions[i] - trend_predictions[i-1] for i in range(1, len(trend_predictions))]
        avg_annual_change = sum(annual_changes) / len(annual_changes)
        
        # Apply annual change for future years
        years_to_extrapolate = year - 2023
        
        # Apply trend adjustment (with dampening for far future predictions)
        trend_adjustment = avg_annual_change * years_to_extrapolate
        
        # Dampen the trend for predictions further in the future (more uncertainty)
        if years_to_extrapolate > 3:
            dampening_factor = 0.8 ** (years_to_extrapolate - 3)  # Exponential dampening
            trend_adjustment *= dampening_factor

    # Prepare input for model (using 2023 max for model prediction)
    features = np.array([[state_encoded, district_encoded, category_encoded, type_encoded, prediction_year]])

    # Predict using all 3 models
    pred_rf = rf_model.predict(features)[0]
    pred_xgb = xgb_model.predict(features)[0]
    pred_dt = dt_model.predict(features)[0]

    # Apply trend adjustment for future predictions
    if is_future_prediction:
        pred_rf += trend_adjustment
        pred_xgb += trend_adjustment
        pred_dt += trend_adjustment

    # Average prediction
    average_prediction = int(round((pred_rf + pred_xgb + pred_dt) / 3))
    
    # Ensure prediction is not negative
    average_prediction = max(0, average_prediction)

    # Create prediction details for display
    prediction_details = {
        'rf': int(round(pred_rf)),
        'xgb': int(round(pred_xgb)),
        'dt': int(round(pred_dt))
    }
    
    # Create context data for result template
    context = {
        'prediction': average_prediction,
        'prediction_details': prediction_details,
        'input': {
            'state': state,
            'district': district,
            'category': category.capitalize(),
            'type': crime_type.replace('_', ' ').title(),
            'year': year
        },
        'is_future_prediction': is_future_prediction,
        'active_page': 'predict'
    }

    return render_template('result.html', **context)

# Error handler for 404
@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', error="Page not found", active_page=None), 404

# Error handler for 500
@app.errorhandler(500)
def server_error(e):
    return render_template('error.html', error="Server error occurred", active_page=None), 500

# For Gunicorn deployment, we don't need the if __name__ == '__main__' block
# Gunicorn will look for the 'app' variable to run the Flask application

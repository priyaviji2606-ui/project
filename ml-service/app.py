from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os


app = Flask(__name__)
CORS(app) # Allow cross-origin requests from Node.js

# --- 1. Load ML Models and Scaler ---
print("🔄 Loading ML models and scaler...")
try:
    # Ensure the 'models' folder exists and contains these files
    knn_model = joblib.load('models/food_matcher.pkl')
    food_db = joblib.load('models/food_database.pkl')
    scaler = joblib.load('models/scaler.pkl') 
    print("✅ ML System Ready!")
except Exception as e:
    print(f"❌ ML Load Error: {e}")
    print("👉 Tip: Run your training script (prepare_data.py) first to generate .pkl files.")
    exit()

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json or {}
        
        # 2. Get goals sent from Node.js (or fallback to defaults)
        protein_goal = float(data.get('protein_goal', 30))
        carbs_goal = float(data.get('carbs_goal', 50))
        
        # 3. Estimate Fat and Calories for the search vector
        # Using standard 0.8g fat per kg logic, but simplified here
        fat_goal = float(data.get('weight'))*0.8
        calories_goal = (protein_goal * 4) + (carbs_goal * 4) + (fat_goal * 9)
        
        # 4. Create the Input Vector
        # The order MUST match your training data: [protein, carbs, fat, calories]
        user_input = np.array([[protein_goal, carbs_goal, fat_goal, calories_goal]])
        
        # 5. SCALE the input (This prevents calories from dominating the search)
        user_input_scaled = scaler.transform(user_input)
        
        # 6. Find 5 most similar foods using KNN
        distances, indices = knn_model.kneighbors(user_input_scaled)
        
        # 7. Extract food data from the database
        recs = food_db.iloc[indices[0][:5]].to_dict('records')
        
        print(f"📱 Request Handled: P:{protein_goal}g, C:{carbs_goal}g -> Found {len(recs)} matches.")
        
        return jsonify({
            'recommendations': recs,
            'message': f'Found {len(recs)} foods matching your goals!',
            'status': 'success'
        })

    except Exception as e:
        print(f"❌ Recommendation Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def health_check():
    return jsonify({
        'status': 'ML Service is live',
        'port': 5001,
        'model_loaded': True
    })

if __name__ == '__main__':
    # Running on 5001 to avoid conflict with Node.js (5000)
    print("🚀 ML Service starting on http://localhost:5001")
    app.run(host='0.0.0.0', port=5001, debug=False)
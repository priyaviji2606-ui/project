# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
# import numpy as np

# app = Flask(__name__)

# # Load your trained models (runs once when server starts)
# food_db = joblib.load('models/food_database.pkl')
# knn_model = joblib.load('models/food_matcher.pkl')

# @app.route('/recommend', methods=['POST'])
# def recommend():
#     data = request.json
#     protein_goal = data.get('protein_goal', 50)
#     carbs_goal = data.get('carbs_goal', 100)
    
#     # Create user goal as feature vector
#     user_goal = np.array([[0, carbs_goal, 0, 200]])  # [protein, carbs, fat, calories]
    
#     # Find 5 most similar foods
#     distances, indices = knn_model.kneighbors(user_goal)
    
#     # Get top 5 recommendations
#     recs = food_db.iloc[indices[0]].to_dict('records')
    
#     return jsonify({
#         'recommendations': recs[:5],
#         'message': 'Top 5 foods for your macro goals!'
#     })

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
import joblib
import traceback

app = Flask(__name__)

print("🔄 Loading ML models...")
try:
    knn_model = joblib.load('models/food_matcher.pkl')
    food_db = joblib.load('models/food_database.pkl')
    print("✅ ML Models loaded!")
except Exception as e:
    print(f"❌ ML Load Error: {e}")
    exit()

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json or {}
        protein_goal = data.get('protein_goal', 30)
        carbs_goal = data.get('carbs_goal', 50)
        
        # User goal vector
        user_goal = [[0, carbs_goal, 0, 200]]
        
        # Find similar foods
        distances, indices = knn_model.kneighbors(user_goal)
        recs = food_db.iloc[indices[0][:5]].to_dict('records')
        
        print(f"📱 Recommendation request: P{protein_goal}g C{carbs_goal}g")
        return jsonify({
            'recommendations': recs,
            'message': f'Found {len(recs)} foods!'
        })
    except Exception as e:
        print(f"❌ Recommendation error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    return jsonify({'status': 'ML Service running!', 'port': 5001})

if __name__ == '__main__':
    print("🚀 Starting ML Service on http://localhost:5001")
    print("Press Ctrl+C to stop")
    app.run(host='0.0.0.0', port=5001, debug=False)

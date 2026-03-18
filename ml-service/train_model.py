import pandas as pd
from sklearn.neighbors import NearestNeighbors
import joblib
import os

print("🔥 Nutrition ML Training Starting...")

# Use our PERFECT sample data (no column guessing needed)
data = {
    'name': ['Chicken Breast', 'Greek Yogurt', 'Brown Rice', 'Lentils', 'Almonds', 
             'Salmon', 'Quinoa', 'Eggs', 'Broccoli', 'Avocado', 'Tuna', 'Oats'],
    'protein': [31, 10.2, 2.6, 9, 21.2, 19.8, 4.4, 12.6, 2.8, 2, 29.9, 16.9],
    'carbs': [0, 3.6, 23, 20.1, 21.6, 0, 21.3, 0.7, 6.6, 8.5, 0, 66.3],
    'fat': [3.6, 0.4, 0.9, 0.4, 49.9, 13.4, 1.9, 9.5, 0.4, 14.7, 6.3, 6.9],
    'calories': [165, 59, 111, 116, 579, 208, 120, 143, 34, 160, 184, 389]
}

df = pd.DataFrame(data)
print("✅ Loaded 12 foods with perfect data!")
print(df.head())

# ML Features
X = df[['protein', 'carbs', 'fat', 'calories']]

# Train model
print("🤖 Training AI model...")
knn = NearestNeighbors(n_neighbors=5, metric='euclidean')
knn.fit(X)

# Save everything
os.makedirs('models', exist_ok=True)
joblib.dump(knn, 'models/food_matcher.pkl')
joblib.dump(df, 'models/food_database.pkl')
joblib.dump(X, 'models/features.pkl')

print("🎉 SUCCESS! ML Model Trained!")
print("🚀 Run: python app.py")
print("\n📱 Test it:")
print("POST http://localhost:5001/recommend")
print('{"protein_goal": 30, "carbs_goal": 50}')

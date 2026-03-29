import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
import joblib
import os

print("🔥 Nutrition ML Training Starting...")

# --- 1. DATA LOADING ---
df = None

# Try to load USDA files if they exist
if os.path.exists('food.csv') and os.path.exists('food_nutrient.csv'):
    print("📖 Loading USDA Foundation Foods...")
    try:
        foods = pd.read_csv('food.csv')
        nutrients = pd.read_csv('food_nutrient.csv')
        nutrient_map = {1003: 'protein', 1004: 'fat', 1005: 'carbs', 1008: 'calories'}
        
        nutrients = nutrients[nutrients['nutrient_id'].isin(nutrient_map.keys())]
        df_nutrients = nutrients.pivot_table(index='fdc_id', columns='nutrient_id', values='amount').reset_index()
        df_nutrients.rename(columns=nutrient_map, inplace=True)
        
        df = pd.merge(foods[['fdc_id', 'description']], df_nutrients, on='fdc_id')
        df.rename(columns={'description': 'name'}, inplace=True)
        df = df.dropna(subset=['protein', 'carbs', 'fat', 'calories'])
        print(f"✅ Success! Loaded {len(df)} foods from USDA CSVs.")
    except Exception as e:
        print(f"⚠️ Error processing CSVs: {e}")

# Fallback to Manual Data if CSVs failed or don't exist
if df is None:
    print("💡 Using high-quality sample dataset for training...")
    data = {
        'name': [
            'Chicken Breast', 'Greek Yogurt', 'Brown Rice', 'Lentils', 'Almonds', 
            'Salmon', 'Quinoa', 'Eggs', 'Broccoli', 'Avocado', 'Tuna', 'Oats',
            'Spinach', 'Banana', 'Beef Steak', 'Tofu', 'Peanut Butter', 'Cottage Cheese'
        ],
        'protein': [31, 10.2, 2.6, 9, 21.2, 19.8, 4.4, 12.6, 2.8, 2, 29.9, 16.9, 2.9, 1.1, 25, 8, 25, 11],
        'carbs': [0, 3.6, 23, 20.1, 21.6, 0, 21.3, 0.7, 6.6, 8.5, 0, 66.3, 3.6, 22.8, 0, 1.9, 20, 3.4],
        'fat': [3.6, 0.4, 0.9, 0.4, 49.9, 13.4, 1.9, 9.5, 0.4, 14.7, 6.3, 6.9, 0.4, 0.3, 15, 4.8, 50, 4.3],
        'calories': [165, 59, 111, 116, 579, 208, 120, 143, 34, 160, 184, 389, 23, 89, 250, 76, 588, 98]
    }
    df = pd.DataFrame(data)

# --- 2. ML PREPARATION ---
X = df[['protein', 'carbs', 'fat', 'calories']]

# Scaling is the "secret sauce" to fix the same-results error
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# --- 3. TRAIN MODEL ---
print("🤖 Training AI model...")
# 'cosine' metric finds the best nutritional balance/ratio
knn = NearestNeighbors(n_neighbors=5, metric='cosine')
knn.fit(X_scaled)

# --- 4. SAVE MODELS ---
os.makedirs('models', exist_ok=True)
joblib.dump(knn, 'models/food_matcher.pkl')
joblib.dump(df, 'models/food_database.pkl')
joblib.dump(scaler, 'models/scaler.pkl')

print("🎉 SUCCESS! ML Model & Scaler Trained!")
print("🚀 Now run: python app.py")
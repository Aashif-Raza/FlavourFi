import { useState, useEffect } from 'react';

const NutritionInfo = ({ recipeId, recipeTitle }) => {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // dotenv.config();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchNutrition = async () => {
      if (!recipeId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNutrition(data);
      } catch (error) {
        console.error('Error fetching nutrition:', error);
        setError('Nutritional information not available');
      } finally {
        setLoading(false);
      }
    };

    fetchNutrition();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📊 Nutritional Information</h3>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-300">Loading nutrition data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📊 Nutritional Information</h3>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (!nutrition) {
    return null;
  }

  const nutritionItems = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal', color: 'bg-red-100 dark:bg-red-900', textColor: 'text-red-800 dark:text-red-200' },
    { label: 'Protein', value: nutrition.protein, unit: 'g', color: 'bg-blue-100 dark:bg-blue-900', textColor: 'text-blue-800 dark:text-blue-200' },
    { label: 'Carbs', value: nutrition.carbs, unit: 'g', color: 'bg-yellow-100 dark:bg-yellow-900', textColor: 'text-yellow-800 dark:text-yellow-200' },
    { label: 'Fat', value: nutrition.fat, unit: 'g', color: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-800 dark:text-green-200' },
    { label: 'Fiber', value: nutrition.fiber, unit: 'g', color: 'bg-purple-100 dark:bg-purple-900', textColor: 'text-purple-800 dark:text-purple-200' },
    { label: 'Sugar', value: nutrition.sugar, unit: 'g', color: 'bg-pink-100 dark:bg-pink-900', textColor: 'text-pink-800 dark:text-pink-200' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">📊 Nutritional Information</h3>
      
      {/* Main Nutrition Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {nutritionItems.map((item) => (
          <div
            key={item.label}
            className={`${item.color} ${item.textColor} p-4 rounded-lg text-center`}
          >
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm font-medium">{item.label}</div>
            <div className="text-xs opacity-75">{item.unit}</div>
          </div>
        ))}
      </div>

      {/* Additional Nutrition Info */}
      {nutrition.bad && nutrition.good && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Good Nutrients */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Good Nutrients</h4>
            <ul className="space-y-1">
              {nutrition.good.map((item, index) => (
                <li key={index} className="text-sm text-green-700 dark:text-green-300">
                  • {item.title}: {item.amount}
                </li>
              ))}
            </ul>
          </div>

          {/* Bad Nutrients */}
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Limit These</h4>
            <ul className="space-y-1">
              {nutrition.bad.map((item, index) => (
                <li key={index} className="text-sm text-red-700 dark:text-red-300">
                  • {item.title}: {item.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Daily Value Info */}
      {nutrition.nutrients && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Daily Value Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">{nutrient.title}</span>
                <span className="font-medium text-gray-800 dark:text-white">{nutrient.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Score */}
      {nutrition.healthScore && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-blue-800 dark:text-blue-200">Health Score</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${nutrition.healthScore}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                {nutrition.healthScore}/100
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionInfo; 
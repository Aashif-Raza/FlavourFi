// src/components/RecipeModal.jsx
import { useEffect, useState } from 'react';
import NutritionInfo from './NutritionInfo';

const RecipeModal = ({ recipeId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // dotenv.config();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      if (!recipeId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setError('Failed to load recipe details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeInfo();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 dark:text-gray-300">Loading recipe details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Error Loading Recipe</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-2 right-2 float-right z-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow"
          style={{ position: 'absolute', top: 16, right: 16 }}
        >
          ✖ Close
        </button>
        
        {/* Recipe Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 pr-8 text-gray-800 dark:text-white">{recipe.title}</h2>
          
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-80 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          
          {/* Recipe Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-bold text-blue-800 dark:text-blue-200">{recipe.readyInMinutes || 'N/A'}</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">minutes</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <div className="font-bold text-green-800 dark:text-green-200">{recipe.servings || 'N/A'}</div>
              <div className="text-sm text-green-600 dark:text-green-300">servings</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-bold text-purple-800 dark:text-purple-200">{recipe.spoonacularScore || 'N/A'}</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">rating</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-orange-800 dark:text-orange-200">{recipe.pricePerServing ? `$${(recipe.pricePerServing / 100).toFixed(2)}` : 'N/A'}</div>
              <div className="text-sm text-orange-600 dark:text-orange-300">per serving</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.cuisines && recipe.cuisines.map((cuisine, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                🌍 {cuisine}
              </span>
            ))}
            {recipe.diets && recipe.diets.map((diet, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                🥗 {diet}
              </span>
            ))}
            {recipe.dishTypes && recipe.dishTypes.map((dishType, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                🍽️ {dishType}
              </span>
            ))}
          </div>
        </div>

        {/* Ingredients Section */}
        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📋 Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.extendedIngredients.map((ing) => (
                <div key={ing.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {ing.amount} {ing.unit}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      {ing.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Section */}
        {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">👨‍🍳 Instructions</h3>
            <ol className="space-y-4">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{step.step}</p>
                    {step.ingredients && step.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {step.ingredients.map((ing) => (
                          <span
                            key={ing.id}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {ing.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : recipe.instructions ? (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">👨‍🍳 Instructions</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Instructions not available for this recipe.</p>
          </div>
        )}

        {/* Nutrition Information */}
        <div className="mb-8">
          <NutritionInfo recipeId={recipe.id} recipeTitle={recipe.title} />
        </div>

        {/* Additional Information */}
        {recipe.summary && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">ℹ️ Summary</h3>
            <div 
              className="text-gray-600 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        )}

        {/* Wine Pairing */}
        {recipe.winePairing && recipe.winePairing.pairedWines && recipe.winePairing.pairedWines.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">🍷 Wine Pairing</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.winePairing.pairedWines.map((wine, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full"
                >
                  {wine}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source Information */}
        {recipe.sourceName && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">📚 Source</h3>
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {recipe.sourceName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;

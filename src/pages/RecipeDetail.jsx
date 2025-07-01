// src/pages/RecipeDetail.jsx
import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeRating from '../components/RecipeRating';
import ShoppingList from '../components/ShoppingList';
import NutritionInfo from '../components/NutritionInfo';
import RecipeShare from '../components/RecipeShare';
import DarkModeToggle from '../components/DarkModeToggle';


const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  dotenv.config();
  const apiKey = import.meta.env.VITE_API_KEY;
  
  // Refs for smooth scrolling
  const ingredientsRef = useRef(null);
  const instructionsRef = useRef(null);
  const nutritionRef = useRef(null);
  const ratingRef = useRef(null);
  const additionalInfoRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        const data = await res.json();
        setRecipe(data);
        
        // Smooth scroll to top after loading
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      } catch (err) {
        console.error('Failed to load recipe:', err);
      }
    };

    fetchDetails();
  }, [id]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsScrolling(false), 1000);
  }, []);

  // Handle scroll events for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced scroll function
  const smoothScrollTo = useCallback((ref, offset = 80) => {
    if (!ref?.current) return;
    
    setIsScrolling(true);
    
    const element = ref.current;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), 1000);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DarkModeToggle />
      
      {/* Navigation Quick Links - Fixed Position */}
      <div className="fixed top-20 right-4 z-30 space-y-2">
        <button
          onClick={() => smoothScrollTo(ingredientsRef)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
          title="Ingredients"
          disabled={isScrolling}
        >
          📋
        </button>
        <button
          onClick={() => smoothScrollTo(instructionsRef)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
          title="Instructions"
          disabled={isScrolling}
        >
          👨‍🍳
        </button>
        <button
          onClick={() => smoothScrollTo(nutritionRef)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
          title="Nutrition"
          disabled={isScrolling}
        >
          📊
        </button>
        <button
          onClick={() => smoothScrollTo(ratingRef)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
          title="Rating & Reviews"
          disabled={isScrolling}
        >
          ⭐
        </button>
        <button
          onClick={() => smoothScrollTo(additionalInfoRef)}
          className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
          title="Additional Info"
          disabled={isScrolling}
        >
          ℹ️
        </button>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300"
          title="Scroll to top"
          disabled={isScrolling}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur flex items-center mb-6 py-4 rounded-lg shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
            disabled={isScrolling}
          >
            ← Back
          </button>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Recipe Details</span>
          
          {/* Quick navigation pills */}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => smoothScrollTo(ingredientsRef)}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              disabled={isScrolling}
            >
              📋 Ingredients
            </button>
            <button
              onClick={() => smoothScrollTo(instructionsRef)}
              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              disabled={isScrolling}
            >
              👨‍🍳 Instructions
            </button>
            <button
              onClick={() => smoothScrollTo(nutritionRef)}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              disabled={isScrolling}
            >
              📊 Nutrition
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{recipe.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <span>⏱ {recipe.readyInMinutes} mins</span>
                  <span>🍽 {recipe.servings} servings</span>
                  {recipe.cuisines && recipe.cuisines.length > 0 && (
                    <span>🌍 {recipe.cuisines.join(', ')}</span>
                  )}
                  {recipe.diets && recipe.diets.length > 0 && (
                    <span>🥗 {recipe.diets.join(', ')}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowShoppingList(!showShoppingList)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    disabled={isScrolling}
                  >
                    🛒 Add to Shopping List
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    disabled={isScrolling}
                  >
                    🖨️ Print Recipe
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div ref={ingredientsRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">📋 Ingredients</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.extendedIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 ml-2">
                        {ingredient.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div ref={instructionsRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">👨‍🍳 Instructions</h2>
              <div className="prose dark:prose-invert max-w-none">
                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                  <ol className="space-y-4">
                    {recipe.analyzedInstructions[0].steps.map((step, index) => (
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
                ) : (
                  <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {recipe.instructions || 'No instructions provided.'}
                  </div>
                )}
              </div>
            </div>

            {/* Nutrition Information */}
            <div ref={nutritionRef}>
              <NutritionInfo recipeId={recipe.id} recipeTitle={recipe.title} />
            </div>

            {/* Recipe Rating & Reviews */}
            <div ref={ratingRef}>
              <RecipeRating recipeId={recipe.id} recipeTitle={recipe.title} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shopping List */}
            {showShoppingList && (
              <ShoppingList recipe={recipe} onClose={() => setShowShoppingList(false)} />
            )}

            {/* Recipe Share */}
            <RecipeShare recipe={recipe} />

            {/* Additional Info */}
            <div ref={additionalInfoRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">ℹ️ Additional Information</h3>
              
              {recipe.summary && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Summary</h4>
                  <div 
                    className="text-sm text-gray-600 dark:text-gray-400 prose prose-sm dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                  />
                </div>
              )}

              {recipe.winePairing && recipe.winePairing.pairedWines && recipe.winePairing.pairedWines.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">🍷 Wine Pairing</h4>
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

              {recipe.creditsText && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Credits</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{recipe.creditsText}</p>
                </div>
              )}

              {recipe.sourceName && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Source</h4>
                  <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    {recipe.sourceName}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

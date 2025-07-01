import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/FlavourFi Logo.png';

const RecentlyViewed = ({ onViewRecipe }) => {
  const navigate = useNavigate();
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentRecipes(stored.slice(0, 4)); // Show only last 4 recipes
  }, []);

  const handleViewRecipe = (recipe) => {
    onViewRecipe(recipe);
    
    // Update recently viewed
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updated = [recipe, ...stored.filter(r => r.id !== recipe.id)].slice(0, 10);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    setRecentRecipes(updated.slice(0, 4));
  };

  const handleViewFullDetails = (recipe) => {
    // Update recently viewed
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const updated = [recipe, ...stored.filter(r => r.id !== recipe.id)].slice(0, 10);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    setRecentRecipes(updated.slice(0, 4));
    
    // Navigate to full recipe detail page
    navigate(`/recipe/${recipe.id}`);
  };

  if (recentRecipes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">🕒 Recently Viewed</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
          >
            <div className="aspect-square bg-gray-200 dark:bg-gray-600 rounded mb-2 overflow-hidden relative">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <img src={Logo} alt="FlavourFi Logo" className="h-12 w-12 object-contain inline-block rounded-full border-4 border-white dark:border-gray-800 bg-black" />
                </div>
              )}
              
              {/* Quick info overlay */}
              <div className="absolute bottom-2 left-2 flex gap-1">
                <span className="bg-blue-500/90 text-white text-xs px-1 py-0.5 rounded backdrop-blur">
                  ⏱ {recipe.readyInMinutes || 'N/A'}
                </span>
                <span className="bg-green-500/90 text-white text-xs px-1 py-0.5 rounded backdrop-blur">
                  🍽 {recipe.servings || 'N/A'}
                </span>
              </div>
            </div>
            
            <h4 className="font-medium text-sm text-gray-800 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {recipe.title}
            </h4>
            
            {/* Recipe tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {recipe.cuisines && recipe.cuisines.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  🌍 {recipe.cuisines[0]}
                </span>
              )}
              {recipe.diets && recipe.diets.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                  🥗 {recipe.diets[0]}
                </span>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewRecipe(recipe);
                }}
                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
              >
                👁️ Quick
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewFullDetails(recipe);
                }}
                className="flex-1 px-2 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
              >
                📄 Full
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed; 
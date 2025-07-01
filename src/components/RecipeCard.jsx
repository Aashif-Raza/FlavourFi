// src/components/RecipeCard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/FlavourFi Logo.png';

const RecipeCard = ({ recipe, onView, onFavorite }) => {
  const navigate = useNavigate();
  const { id, title, image, readyInMinutes, servings, cuisines, diets, dishTypes, spoonacularScore, healthScore } = recipe;
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some((fav) => fav.id === id));
  }, [id]);

  const handleFavorite = () => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = storedFavorites.filter((fav) => fav.id !== id);
      } else {
        updatedFavorites = [...storedFavorites, recipe];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
      onFavorite && onFavorite(recipe);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleViewFullDetails = () => {
    navigate(`/recipe/${id}`);
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="modern-card rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300 transform hover:-translate-y-4 group">
      <div className="relative h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {!imageError && image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700">
            <div className="text-center">
              <div className="text-5xl mb-2">
                <img src={Logo} alt="FlavourFi Logo" className="h-24 w-24 object-contain inline-block rounded-full border-4 border-white dark:border-gray-800 bg-black" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">No image</p>
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Favorite button overlay */}
        <button
          onClick={handleFavorite}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
            isFavorite
              ? 'bg-red-300 text-white shadow-lg scale-110'
              : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110 dark:bg-gray-700/90 dark:text-gray-300'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Quick info badges */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="bg-blue-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
            ⏱ {readyInMinutes || 'N/A'}m
          </span>
          <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
            🍽 {servings || 'N/A'}
          </span>
          {spoonacularScore && (
            <span className="bg-yellow-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
              ⭐ {spoonacularScore}
            </span>
          )}
        </div>

        {/* Health Score Badge */}
        {healthScore && (
          <div className="absolute top-4 left-4">
            <span className={`bg-white/90 dark:bg-gray-700/90 text-xs px-2 py-1 rounded-full backdrop-blur font-medium ${getHealthScoreColor(healthScore)}`}>
              💚 {healthScore}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-400 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={title}>
          {title}
        </h3>
        
        {/* Cuisine and dietary info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cuisines && cuisines.length > 0 && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              🌍 {cuisines[0]}
            </span>
          )}
          {diets && diets.length > 0 && (
            <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
              🥗 {diets[0]}
            </span>
          )}
          {dishTypes && dishTypes.length > 0 && (
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
              🍽️ {dishTypes[0]}
            </span>
          )}
        </div>

        {/* Additional dietary tags */}
        {diets && diets.length > 1 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {diets.slice(1, 3).map((diet, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                {diet}
              </span>
            ))}
            {diets.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +{diets.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => onView(recipe)}
              className="flex-1 btn-modern text-sm"
            >
              👁️ Quick View
            </button>
            <button
              onClick={handleViewFullDetails}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
            >
              📄 Full Details
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              isFavorite 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {isFavorite ? '❤️ Saved' : '💾 Save'}
            </span>
            
            <button
              onClick={handleFavorite}
              className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isFavorite ? 'Remove' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

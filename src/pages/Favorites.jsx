// src/pages/Favorites.jsx
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeGrid from '../components/RecipeGrid';
import RecipeModal from '../components/RecipeModal';
import Logo from '../assets/FlavourFi Logo.png';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const navigate = useNavigate();

  const loadFavorites = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(stored);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
    
    // Listen for storage changes (when favorites are updated from other components)
    const handleStorageChange = (e) => {
      if (e.key === 'favorites') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadFavorites, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [loadFavorites]);

  const handleUnfavorite = (recipe) => {
    try {
      const updated = favorites.filter((fav) => fav.id !== recipe.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setFavorites(updated);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      try {
        localStorage.removeItem('favorites');
        setFavorites([]);
      } catch (error) {
        console.error('Error clearing favorites:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow"
          >
            ← Back to Home
          </button>
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-purple-700 mb-2">
              ❤️ Your Favorite Recipes
            </h1>
            <p className="text-gray-600">
              {favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {favorites.length > 0 ? (
          <>
            <div className="flex justify-center mb-6">
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                🗑️ Clear All Favorites
              </button>
            </div>
            
            <RecipeGrid
              recipes={favorites}
              onView={(r) => setSelectedRecipeId(r.id)}
              onFavorite={handleUnfavorite}
              scrollable={false}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No favorites yet!
            </h2>
            <p className="text-gray-500 mb-6">
              Start exploring recipes and save your favorites to see them here.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <img src={Logo} alt="FlavourFi Logo" className="h-12 w-12 object-contain inline-block mr-2 rounded-full border-4 border-white dark:border-gray-800 bg-black" /> Explore Recipes
            </a>
          </div>
        )}

        {selectedRecipeId && (
          <RecipeModal
            recipeId={selectedRecipeId}
            onClose={() => setSelectedRecipeId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;

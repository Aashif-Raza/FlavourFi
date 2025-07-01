// src/components/RecipeGrid.jsx
import RecipeCard from './RecipeCard';
import Logo from '../assets/FlavourFi Logo.png';

const RecipeGrid = ({ recipes, onView, onFavorite, scrollable = false }) => {
  if (!recipes.length) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        <div className="text-6xl mb-4 animate-bounce-gentle">
          <img src={Logo} alt="FlavourFi Logo" className="h-28 w-28 object-contain inline-block rounded-full border-4 border-white dark:border-gray-800 bg-black" />
        </div>
        <h3 className="text-xl font-bold mb-2 gradient-text1">No recipes found</h3>
        <p className="text-black">Try adjusting your search terms or filters!</p>
      </div>
    );
  }

  const gridContent = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onView={onView}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );

  if (scrollable) {
    return (
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {gridContent}
      </div>
    );
  }

  return gridContent;
};

export default RecipeGrid;

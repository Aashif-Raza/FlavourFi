import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/FlavourFi Logo.png';

const RecipeCategories = ({ onCategoryChange, activeCategory = 'all' }) => {
  const navigate = useNavigate();
  const categories = [
    { id: 'all', name: 'All Recipes', icon: <img src={Logo} alt="All" className="h-12 w-12 inline-block align-middle rounded-full border-4 border-white dark:border-gray-800 bg-black" /> },
    { id: 'breakfast', name: 'Breakfast', icon: '🥞' },
    { id: 'lunch', name: 'Lunch', icon: '🥪' },
    { id: 'dinner', name: 'Dinner', icon: '🍝' },
    { id: 'dessert', name: 'Desserts', icon: '🍰' },
    { id: 'snack', name: 'Snacks', icon: '🍿' },
    { id: 'appetizer', name: 'Appetizers', icon: '🥟' },
    { id: 'beverage', name: 'Beverages', icon: '🥤' }
  ];

  const handleCategoryClick = (categoryId) => {
    // Update the active category
    onCategoryChange(categoryId);
    
    // Navigate to home with category parameter
    navigate('/', { 
      state: { 
        selectedCategory: categoryId,
        showRecipeGrid: true 
      } 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        <img src={Logo} alt="FlavourFi Logo" className="h-12 w-12 inline-block align-middle mr-2 rounded-full border-4 border-white dark:border-gray-800 bg-black" />
        Browse by Category
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories; 
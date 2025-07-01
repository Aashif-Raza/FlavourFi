// src/components/Filters.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Filters = ({ onApply, maxTimeRef }) => {
  const navigate = useNavigate();
  const [diet, setDiet] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [intolerances, setIntolerances] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cookingMethod, setCookingMethod] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    const filters = {};
    if (diet) filters.diet = diet;
    if (maxTime) filters.maxReadyTime = maxTime;
    if (cuisine) filters.cuisine = cuisine;
    if (intolerances) filters.intolerances = intolerances;
    if (difficulty) filters.difficulty = difficulty;
    if (cookingMethod) filters.cookingMethod = cookingMethod;

    onApply(filters);
    
    // Navigate to home with filters and show recipe grid
    navigate('/', { 
      state: { 
        appliedFilters: filters,
        showRecipeGrid: true 
      } 
    });
  };

  const handleClear = () => {
    setDiet('');
    setMaxTime('');
    setCuisine('');
    setIntolerances('');
    setDifficulty('');
    setCookingMethod('');
    onApply({});
    
    // Navigate to home and clear filters
    navigate('/', { 
      state: { 
        appliedFilters: {},
        showRecipeGrid: true 
      } 
    });
  };

  // Handle quick filter clicks
  const handleQuickFilterClick = (filterType, value) => {
    if (filterType === 'diet') {
      setDiet(diet === value ? '' : value);
    } else if (filterType === 'maxTime') {
      setMaxTime(maxTime === value ? '' : value);
    }
    
    // Apply the filter immediately and navigate
    const filters = {};
    if (filterType === 'diet') {
      filters.diet = diet === value ? '' : value;
    } else if (filterType === 'maxTime') {
      filters.maxReadyTime = maxTime === value ? '' : value;
    }
    
    onApply(filters);
    navigate('/', { 
      state: { 
        appliedFilters: filters,
        showRecipeGrid: true 
      } 
    });
  };

  // Handle dropdown changes with immediate navigation
  const handleDropdownChange = (filterType, value) => {
    let newFilters = {};
    
    // Build the complete filter object with current state
    if (diet) newFilters.diet = diet;
    if (maxTime) newFilters.maxReadyTime = maxTime;
    if (difficulty) newFilters.difficulty = difficulty;
    
    if (filterType === 'cuisine') {
      setCuisine(value);
      newFilters.cuisine = value;
    } else if (filterType === 'cookingMethod') {
      setCookingMethod(value);
      newFilters.cookingMethod = value;
    } else if (filterType === 'intolerances') {
      setIntolerances(value);
      newFilters.intolerances = value;
    }
    
    // Apply the filter immediately and navigate
    onApply(newFilters);
    navigate('/', { 
      state: { 
        appliedFilters: newFilters,
        showRecipeGrid: true 
      } 
    });
  };

  // Handle difficulty selection with immediate navigation
  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    
    let newFilters = {};
    if (diet) newFilters.diet = diet;
    if (maxTime) newFilters.maxReadyTime = maxTime;
    if (cuisine) newFilters.cuisine = cuisine;
    if (cookingMethod) newFilters.cookingMethod = cookingMethod;
    if (intolerances) newFilters.intolerances = intolerances;
    newFilters.difficulty = value;
    
    onApply(newFilters);
    navigate('/', { 
      state: { 
        appliedFilters: newFilters,
        showRecipeGrid: true 
      } 
    });
  };

  // Handle diet selection with immediate navigation
  const handleDietChange = (value) => {
    setDiet(value);
    
    let newFilters = {};
    if (maxTime) newFilters.maxReadyTime = maxTime;
    if (cuisine) newFilters.cuisine = cuisine;
    if (difficulty) newFilters.difficulty = difficulty;
    if (cookingMethod) newFilters.cookingMethod = cookingMethod;
    if (intolerances) newFilters.intolerances = intolerances;
    newFilters.diet = value;
    
    onApply(newFilters);
    navigate('/', { 
      state: { 
        appliedFilters: newFilters,
        showRecipeGrid: true 
      } 
    });
  };

  const hasActiveFilters = diet || maxTime || cuisine || intolerances || difficulty || cookingMethod;

  const filterOptions = {
    diets: [
      { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
      { value: 'vegan', label: 'Vegan', icon: '🌱' },
      { value: 'gluten free', label: 'Gluten-Free', icon: '🌾' },
      { value: 'ketogenic', label: 'Keto', icon: '🥑' },
      { value: 'paleo', label: 'Paleo', icon: '🥩' },
      { value: 'pescetarian', label: 'Pescetarian', icon: '🐟' }
    ],
    cuisines: [
      { value: 'italian', label: 'Italian', icon: '🍝' },
      { value: 'mexican', label: 'Mexican', icon: '🌮' },
      { value: 'indian', label: 'Indian', icon: '🍛' },
      { value: 'chinese', label: 'Chinese', icon: '🥢' },
      { value: 'japanese', label: 'Japanese', icon: '🍱' },
      { value: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
      { value: 'american', label: 'American', icon: '🍔' },
      { value: 'french', label: 'French', icon: '🥖' },
      { value: 'thai', label: 'Thai', icon: '🍜' },
      { value: 'greek', label: 'Greek', icon: '🧀' },
      { value: 'spanish', label: 'Spanish', icon: '🥘' },
      { value: 'middle eastern', label: 'Middle Eastern', icon: '🌯' }
    ],
    difficulties: [
      { value: 'easy', label: 'Easy', icon: '😊', color: 'green' },
      { value: 'medium', label: 'Medium', icon: '😐', color: 'yellow' },
      { value: 'hard', label: 'Hard', icon: '😰', color: 'red' }
    ],
    cookingMethods: [
      { value: 'baking', label: 'Baking', icon: '🍰' },
      { value: 'grilling', label: 'Grilling', icon: '🔥' },
      { value: 'slow cooking', label: 'Slow Cooking', icon: '⏰' },
      { value: 'frying', label: 'Frying', icon: '🍳' },
      { value: 'steaming', label: 'Steaming', icon: '💨' },
      { value: 'roasting', label: 'Roasting', icon: '🔥' },
      { value: 'boiling', label: 'Boiling', icon: '💧' }
    ],
    intolerances: [
      { value: 'dairy', label: 'Dairy Free', icon: '🥛' },
      { value: 'egg', label: 'Egg Free', icon: '🥚' },
      { value: 'gluten', label: 'Gluten Free', icon: '🌾' },
      { value: 'peanut', label: 'Peanut Free', icon: '🥜' },
      { value: 'seafood', label: 'Seafood Free', icon: '🦐' },
      { value: 'shellfish', label: 'Shellfish Free', icon: '🦞' },
      { value: 'soy', label: 'Soy Free', icon: '🫘' },
      { value: 'wheat', label: 'Wheat Free', icon: '🌾' }
    ]
  };

  return (
    <div className="modern-card rounded-2xl p-6 mb-6 animate-fade-in-scale">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-3xl animate-pulse-glow">🔍</div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">Advanced Filters</h3>
            <p className="text-blackdark:text-gray-300 text-sm">
              Refine your recipe search with precision
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-modern text-sm"
        >
          {isExpanded ? '📦 Collapse' : '📋 Expand'}
        </button>
      </div>

      {/* Quick Filter Chips */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-400 dark:text-gray-400 mb-3">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          {filterOptions.diets.slice(0, 3).map((option) => (
            <button
              key={option.value}
              onClick={() => handleQuickFilterClick('diet', option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                diet === option.value
                  ? 'bg-green-500 text-white shadow-medium'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
          <button
            onClick={() => handleQuickFilterClick('maxTime', '30')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
              maxTime === '30'
                ? 'bg-blue-500 text-white shadow-medium'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
          >
            <span className="mr-2">⚡</span>
            Quick (≤30min)
          </button>
        </div>
      </div>

      {/* Detailed Filters */}
      <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Diet Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-2">🥗</span>
              Diet Preference
            </label>
            <div className="space-y-2">
              {filterOptions.diets.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="diet"
                    value={option.value}
                    checked={diet === option.value}
                    onChange={(e) => handleDietChange(e.target.value)}
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cuisine Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-2">🌍</span>
              Cuisine Type
            </label>
            <select
              value={cuisine}
              onChange={(e) => handleDropdownChange('cuisine', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300"
            >
              <option value="">🌐 All Cuisines</option>
              {filterOptions.cuisines.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Max Time Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-2">⏱️</span>
              Maximum Time
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Any time limit"
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300"
                min="1"
                max="300"
                ref={maxTimeRef}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                ⏰
              </div>
            </div>
            <div className="flex gap-2">
              {[15, 30, 45, 60].map((time) => (
                <button
                  key={time}
                  onClick={() => handleQuickFilterClick('maxTime', time.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                    maxTime === time.toString()
                      ? 'bg-blue-500 text-white shadow-medium'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                  }`}
                >
                  ≤{time}m
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-2">📊</span>
              Difficulty Level
            </label>
            <div className="space-y-2">
              {filterOptions.difficulties.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={option.value}
                    checked={difficulty === option.value}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cooking Method */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-2">👨‍🍳</span>
              Cooking Method
            </label>
            <select
              value={cookingMethod}
              onChange={(e) => handleDropdownChange('cookingMethod', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300"
            >
              <option value="">🍳 Any Method</option>
              {filterOptions.cookingMethods.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Intolerances Filter */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800 dark:text-white flex items-center">
              <span className="mr-2">⚠️</span>
              Dietary Restrictions
            </label>
            <select
              value={intolerances}
              onChange={(e) => handleDropdownChange('intolerances', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300"
            >
              <option value="">✅ No Restrictions</option>
              {filterOptions.intolerances.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleApply}
          className="btn-modern text-lg px-8 py-3 animate-pulse-glow"
        >
          🎯 Apply Filters
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 font-medium text-lg hover:scale-105 shadow-medium"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700 animate-slide-in-up">
          <div className="flex items-center mb-3">
            <span className="text-lg mr-2">🎯</span>
            <p className="text-sm font-bold text-blue-800 dark:text-blue-200">Active Filters:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {diet && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">🥗</span>
                {diet}
              </span>
            )}
            {cuisine && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">🌍</span>
                {cuisine}
              </span>
            )}
            {maxTime && (
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">⏱️</span>
                ≤{maxTime}min
              </span>
            )}
            {difficulty && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">📊</span>
                {difficulty}
              </span>
            )}
            {cookingMethod && (
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">👨‍🍳</span>
                {cookingMethod}
              </span>
            )}
            {intolerances && (
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">⚠️</span>
                {intolerances}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;

dotenv.config();
const API_KEY = import.meta.env.VITE_API_KEY; 
// const API_KEY = '8512b72ca37948a388a0755756245b71'; 
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export const fetchRecipes = async (query = '', filters = {}, category = 'all') => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query,
      number: 20,
      addRecipeInformation: true,
      fillIngredients: true,
      ...filters,
    });

    // Add category-specific filtering
    if (category && category !== 'all') {
      // Map our categories to Spoonacular's cuisine types
      const categoryMapping = {
        'breakfast': 'breakfast',
        'lunch': 'lunch',
        'dinner': 'dinner',
        'dessert': 'dessert',
        'snack': 'snack',
        'appetizer': 'appetizer',
        'beverage': 'beverage'
      };
      
      if (categoryMapping[category]) {
        params.append('type', categoryMapping[category]);
      }
    }

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return [];
  }
};

export const fetchRandomRecipe = async () => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`
    );
    const data = await response.json();
    return data.recipes[0];
  } catch (error) {
    console.error('Failed to fetch random recipe:', error);
    return null;
  }
};

// New function to fetch recipes by category
export const fetchRecipesByCategory = async (category, limit = 12) => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      number: limit,
      addRecipeInformation: true,
      fillIngredients: true,
    });

    if (category && category !== 'all') {
      const categoryMapping = {
        'breakfast': 'breakfast',
        'lunch': 'lunch',
        'dinner': 'dinner',
        'dessert': 'dessert',
        'snack': 'snack',
        'appetizer': 'appetizer',
        'beverage': 'beverage'
      };
      
      if (categoryMapping[category]) {
        params.append('type', categoryMapping[category]);
      }
    }

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Failed to fetch recipes by category:', error);
    return [];
  }
};

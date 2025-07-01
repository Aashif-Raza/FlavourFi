# Recipe Finder App (FlavourFi)

Discover, search, and save your favorite recipes with FlavourFi! This modern web app helps you find recipes tailored to your taste, ingredients, and lifestyle, with beautiful UI and advanced filtering.

## Features
- 🔍 **Smart Search**: Find recipes by ingredients, cuisine, or dietary needs
- ⚡ **Quick & Easy Filters**: Filter by cooking time, difficulty, and more
- 🍽️ **Recipe Categories**: Browse by meal type (breakfast, lunch, dinner, etc.)
- ❤️ **Save Favorites**: Curate your own recipe collection
- 🕒 **Recently Viewed**: Quickly access recipes you've checked before
- 📋 **Detailed Recipe View**: See ingredients, instructions, nutrition, and more
- 🌙 **Dark Mode**: Switch between light and dark themes

## Screenshots
_Add screenshots here if desired_

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Recipe-Finder-App
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up your API key:**
   - This app uses the [Spoonacular API](https://spoonacular.com/food-api). Get your free API key from their website.
   - Create a `.env` file in the root directory and add:
     ```env
     VITE_SPOONACULAR_API_KEY=your_api_key_here
     ```
   - _Note: The current codebase has the API key hardcoded in several files. For better security, move the key to the `.env` file and update the code to use `import.meta.env.VITE_SPOONACULAR_API_KEY`._

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Usage
- Use the search bar to find recipes by keyword or ingredient.
- Apply filters for dietary needs, cooking time, and more.
- Click on a recipe card to view details, nutrition, and instructions.
- Save your favorite recipes for quick access later.

## Project Structure
```
Recipe-Finder-App/
  src/
    api/           # API utility functions
    assets/        # Images and static assets
    components/    # Reusable React components
    pages/         # Main app pages (Home, Favorites, RecipeDetail)
    index.css      # Global styles
    main.jsx       # App entry point
  public/          # Static files
  package.json     # Project metadata and scripts
  vite.config.js   # Vite configuration
```

## Environment Variables
- `VITE_SPOONACULAR_API_KEY`: Your Spoonacular API key (recommended to use `.env` for security)

## Credits
- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- UI inspired by modern recipe and food apps
- Images from [Unsplash](https://unsplash.com/) and other free sources

## License
MIT License

---

_If you use this project, please consider starring the repo and giving credit!_

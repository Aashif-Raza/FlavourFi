// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import RecipeDetail from './pages/RecipeDetail';
import DarkModeToggle from './components/DarkModeToggle';
import Logo from './assets/FlavourFi Logo.png';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Navigation */}
        <nav className="glass border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center space-x-3 group">
                  <img src={Logo} alt="FlavourFi Logo" className="h-10 w-10 object-contain animate-bounce-gentle group-hover:scale-110 transition-transform duration-300 rounded-full border-4 border-white dark:border-gray-800 bg-black" />
                  <span className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                    FlavourFi
                  </span>
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="nav-link px-4 py-2 rounded-xl text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium"
                >
                  🏠 Home
                </a>
                <a
                  href="/favorites"
                  className="nav-link px-4 py-2 rounded-xl text-black dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                >
                  ❤️ Favorites
                </a>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="glass border-t border-gray-200 dark:border-gray-700 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img src={Logo} alt="FlavourFi Logo" className="h-8 w-8 object-contain rounded-full border-4 border-white dark:border-gray-800 bg-black" />
                  <span className="text-xl font-bold gradient-text">FlavourFi</span>
                </div>
                <p className="text-black dark:text-gray-100 leading-relaxed">
                  Discover, save, and cook amazing recipes from around the world. 
                  Your personal recipe companion for every culinary adventure.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-black dark:text-white mb-4">Features</h3>
                <ul className="space-y-2 text-black dark:text-gray-100">
                  <li>🔍 Smart Recipe Search</li>
                  <li>📋 Shopping List Generator</li>
                  <li>⭐ Recipe Ratings & Reviews</li>
                  <li>📊 Nutritional Information</li>
                  <li>🌙 Dark Mode Support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-black dark:text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-black dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      🏠 Home
                    </a>
                  </li>
                  <li>
                    <a href="/favorites" className="text-black dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      ❤️ Favorites
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-black dark:text-gray-400">
            <p className="text-sm text-white"> 
              &copy; 2025 FlavourFi. Made with ❤️ by <span className="font-medium text-blue-600">Md Aashif Raza</span> for food lovers everywhere around the world.
            </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

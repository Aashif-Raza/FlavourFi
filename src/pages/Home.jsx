// src/pages/Home.jsx
import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import RecipeCategories from '../components/RecipeCategories';
import RecentlyViewed from '../components/RecentlyViewed';
import RecipeGrid from '../components/RecipeGrid';
import RecipeModal from '../components/RecipeModal';
import Spinner from '../components/Spinner';
import DarkModeToggle from '../components/DarkModeToggle';
import { fetchRecipes } from '../api/fetchRecipes';
import Logo from '../assets/FlavourFi Logo.png';
import BgImage from '../assets/ella-olsson-oPBjWBCcAEo-unsplash.jpg';
import HeroBg from '../assets/cov-img.jpg';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('chicken');
  const [filters, setFilters] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showGridFullscreen, setShowGridFullscreen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  const mainRef = useRef(null);
  const searchBarRef = useRef(null);
  const maxTimeRef = useRef(null);
  const recipeGridRef = useRef(null);
  const categoriesRef = useRef(null);
  const filtersRef = useRef(null);
  const recentlyViewedRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    const results = await fetchRecipes(query, filters, selectedCategory);
    setRecipes(results);
    setLoading(false);
  }, [query, filters, selectedCategory]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

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

  // Enhanced scroll function with better timing and offset
  const smoothScrollTo = useCallback((ref, offset = 0, delay = 0) => {
    if (!ref?.current) return;
    
    setIsScrolling(true);
    
    setTimeout(() => {
      const element = ref.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }, delay);
  }, []);

  // Handle navigation state from RecipeCategories and Filters
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedCategory) {
        setSelectedCategory(location.state.selectedCategory);
      }
      if (location.state.appliedFilters) {
        setFilters(location.state.appliedFilters);
      }
      if (location.state.showRecipeGrid) {
        setShowGridFullscreen(true);
        // Enhanced scroll to recipe grid with better timing
        setTimeout(() => {
          smoothScrollTo(recipeGridRef, 80, 200);
        }, 100);
      }
    }
  }, [location.state, smoothScrollTo]);

  // Scroll to top and close overlays when navigating to Home
  useEffect(() => {
    if (location.pathname === '/') {
      // Only close grid if no navigation state is present
      if (!location.state?.showRecipeGrid) {
        setShowGridFullscreen(false);
        // Smooth scroll to top with delay
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, location.state]);

  // Enhanced scroll to main app section
  const handleExplore = () => {
    smoothScrollTo(mainRef, 20);
  };

  // Enhanced feature card handlers with better scroll behavior
  const handleSmartSearch = () => {
    smoothScrollTo(searchBarRef, 100, 300);
    setTimeout(() => {
      if (searchBarRef.current) {
        searchBarRef.current.focus();
      }
    }, 800);
  };

  const handleQuickEasy = () => {
    smoothScrollTo(filtersRef, 100, 300);
    setTimeout(() => {
      if (maxTimeRef.current) {
        maxTimeRef.current.focus();
      }
    }, 800);
  };

  const handleSaveFavorites = () => {
    navigate('/favorites');
  };

  // Enhanced search with better scroll behavior
  const handleSearch = (val) => {
    setQuery(val);
    setShowGridFullscreen(true);
    setTimeout(() => {
      smoothScrollTo(recipeGridRef, 80, 200);
    }, 100);
  };

  // Enhanced close grid with smooth scroll back
  const handleCloseGrid = () => {
    setShowGridFullscreen(false);
    setTimeout(() => {
      smoothScrollTo(mainRef, 20, 100);
    }, 200);
  };

  // Handle category change with scroll to results
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Scroll to recipe grid after category change
    setTimeout(() => {
      smoothScrollTo(recipeGridRef, 80, 100);
    }, 500);
  };

  // Handle viewing a recipe (for recently viewed)
  const handleViewRecipe = (recipe) => {
    setSelectedRecipeId(recipe.id);
  };

  // Scroll to specific sections
  const scrollToCategories = () => {
    smoothScrollTo(categoriesRef, 80);
  };

  const scrollToFilters = () => {
    smoothScrollTo(filtersRef, 80);
  };

  const scrollToRecentlyViewed = () => {
    smoothScrollTo(recentlyViewedRef, 80);
  };

  const scrollToRecipeGrid = () => {
    smoothScrollTo(recipeGridRef, 80);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && showGridFullscreen) {
        handleCloseGrid();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGridFullscreen]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image for the whole page */}
      <img src={BgImage} alt="Background" className="fixed inset-0 w-full h-full object-cover z-0" style={{pointerEvents: 'none'}} />
      {/* Main Content */}
      <div className="relative z-10">
        <DarkModeToggle />
        
        {/* Navigation Quick Links - Fixed Position */}
        {!showGridFullscreen && (
          <div className="fixed top-20 left-4 z-30 flex flex-col space-y-2">
            <button
              onClick={scrollToCategories}
              className="mr-1 glass p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
              title="Browse Categories"
            >
              🍽️
            </button>
            <button
              onClick={scrollToFilters}
              className="mr-1 glass p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
              title="Advanced Filters"
            >
              🔍
            </button>
            <button
              onClick={scrollToRecentlyViewed}
              className="mr-1 glass p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
              title="Recently Viewed"
            >
              🕒
            </button>
            <button
              onClick={scrollToRecipeGrid}
              className="glass p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-all duration-300 text-sm font-medium"
              title="Recipe Grid"
            >
              📋
            </button>
          </div>
        )}
        
        {/* Scroll to Top Button */}
        {showScrollToTop && !showGridFullscreen && (
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
        
        {/* Hero Section */}
        {!showGridFullscreen && (
          <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden gradient-bg">
            {/* Hero Background Image */}
            <img
              src={HeroBg}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ pointerEvents: 'none' }}
            />
            {/* Optional: Overlay for readability */}
            <div className="absolute inset-0 bg-black/30 z-0" />
            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 py-24">
              {/* Main Title */}
              <div className="mb-1">
                <div className="text-8xl md:text-9xl mb-2 animate-bounce-gentle -mt-14">
                  <img src={Logo} alt="FlavourFi Logo" className="h-48 md:h-64 w-auto object-contain mx-auto rounded-full border-8 border-white dark:border-gray-800 bg-black" />
                </div>
                <h1 className="text-6xl md:text-8xl font-extrabold mb-4 gradient-text drop-shadow-lg ">
                  FlavourFi
                </h1>
                <div className="font-sans text-3xl md:text-4xl font-medium mb-4 text-black dark:text-white animate-bounce drop-shadow">
                  Smart Recipe Finder
                </div>
              </div>

              {/* Description */}
              <p className="font-thin font-sans italic max-w-3xl text-xl md:text-xl text-gray-900 dark:text-gray-200 mb-8 drop-shadow leading-relaxed text-center">
Unlock a world of flavors with FlavourFi!
<span className="block mt-2">Discover inspiring recipes tailored to your taste, ingredients, and lifestyle.</span>
<span className="block mt-2">Effortlessly save your favorites and curate your own delicious recipe collection.</span>
</p>

              {/* CTA Button */}
              <button
                onClick={handleExplore}
                className="btn-modern text-2xl px-12 py-6 animate-pulse-glow"
                disabled={isScrolling}
              >
                🚀 Explore Recipes
              </button>

              {/* Stats */}
              <div className="flex gap-8 mt-8 mb-8 text-white/80">
                <div className="text-center">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm">Cuisines</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm">Available</div>
                </div>
              </div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center"
              onClick={handleExplore}
              title="Scroll to explore"
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center hover:border-white/80 transition-colors">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-white/70 text-xs mt-2 text-center">Scroll to explore</p>
            </div>
          </section>
        )}

        {/* Main App Section */}
        {!showGridFullscreen && (
          <section ref={mainRef} className="pt-16 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Feature Highlights */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-center mb-4 gradient-text1">
                Why Choose FlavourFi?
              </h2>
              <p className="text-center text-gray-700 dark:text-gray-700 mb-12 text-lg">
                Everything you need to discover, save, and cook amazing recipes
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                <div className="modern-card rounded-2xl p-8 text-center slide-in-up">
                  <div className="text-5xl mb-6 animate-bounce-gentle">🔍</div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text">Smart Search</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Find recipes by ingredients, cuisine, or dietary needs with our intelligent search engine
                  </p>
                  <button 
                    onClick={handleSmartSearch}
                    className="mt-6 btn-modern"
                    disabled={isScrolling}
                  >
                    Try Search
                  </button>
                </div>

                <div className="modern-card rounded-2xl p-8 text-center slide-in-up">
                  <div className="text-5xl mb-6 animate-bounce-gentle">⚡</div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text">Quick & Easy</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Filter by cooking time and difficulty level to find perfect recipes for any occasion
                  </p>
                  <button 
                    onClick={handleQuickEasy}
                    className="mt-6 btn-modern"
                    disabled={isScrolling}
                  >
                    Browse Filters
                  </button>
                </div>

                <div className="modern-card rounded-2xl p-8 text-center slide-in-up">
                  <div className="text-5xl mb-6 animate-bounce-gentle">❤️</div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text">Save Favorites</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Create your personal recipe collection and never lose your favorite dishes again
                  </p>
                  <button 
                    onClick={handleSaveFavorites}
                    className="mt-6 btn-modern"
                  >
                    View Favorites
                  </button>
                </div>
              </div>
            </div>
            
            {/* Recently Viewed */}
            <div ref={recentlyViewedRef} className="mb-16 slide-in-up-delay-3">
              <RecentlyViewed onViewRecipe={handleViewRecipe} />
            </div>
            
            {/* Recipe Categories */}
            <div ref={categoriesRef} className="mb-16">
              <RecipeCategories 
                onCategoryChange={handleCategoryChange}
                activeCategory={selectedCategory}
              />
            </div>
            
            {/* Search and Filters */}
            <div ref={filtersRef} className="mb-16">
              <div className="modern-card rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center gradient-text">
                  Find Your Perfect Recipe
                </h2>
                <SearchBar onSearch={handleSearch} inputRef={searchBarRef} />
                <Filters onApply={(f) => setFilters(f)} maxTimeRef={maxTimeRef} />
              </div>
            </div>
            
            {/* Normal RecipeGrid (hidden when fullscreen) */}
            <div ref={recipeGridRef}>
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : (
                <RecipeGrid
                  recipes={recipes}
                  onView={(r) => setSelectedRecipeId(r.id)}
                  scrollable={loading}
                />
              )}
              {selectedRecipeId && (
                <RecipeModal
                  recipeId={selectedRecipeId}
                  onClose={() => setSelectedRecipeId(null)}
                />
              )}
            </div>
          </section>
        )}

        {/* Fullscreen Recipe Grid */}
        {showGridFullscreen && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 animate-fade-in overflow-y-auto">
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold gradient-text">
                  Search Results for "{query}"
                </h2>
                <button
                  onClick={handleCloseGrid}
                  className="btn-modern"
                  disabled={isScrolling}
                >
                  ✖ Close
                </button>
              </div>
            </div>
            <div className="p-4 max-w-7xl mx-auto">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : (
                <RecipeGrid
                  recipes={recipes}
                  onView={(r) => setSelectedRecipeId(r.id)}
                />
              )}
              {selectedRecipeId && (
                <RecipeModal
                  recipeId={selectedRecipeId}
                  onClose={() => setSelectedRecipeId(null)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

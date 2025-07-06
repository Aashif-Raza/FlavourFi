// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, inputRef }) => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce input to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 6000); // 6s delay

    return () => clearTimeout(handler);
  }, [input]);

  // Trigger search when debounced input changes
  useEffect(() => {
    if (debouncedInput.trim()) {
      onSearch(debouncedInput.trim());
    }
  }, [debouncedInput, onSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleSearchClick = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className={`relative group ${isFocused ? 'scale-105' : 'scale-100'} transition-transform duration-300 flex flex-row justify-center items-center gap-4`}>
        {/* Search input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="🔍 Search for recipes, ingredients, or cuisines..."
          className="w-full px-6 py-4 pl-14 pr-20 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-2xl shadow-soft focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-400/20 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
          ref={inputRef}
        />
        <button
            className="btn-modern text-2xl px-12 py-6 animate-pulse-glow"
            onClick={handleSearchClick}
               >
                Search
        </button>
       
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
      
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['pasta', 'chicken', 'vegetarian', 'dessert', 'quick', 'italian'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setInput(suggestion);
              onSearch(suggestion);
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <br></br>
    </form>
  );
};

export default SearchBar;
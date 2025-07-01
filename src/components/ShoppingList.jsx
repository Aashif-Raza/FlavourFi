import { useState, useEffect } from 'react';

const ShoppingList = ({ recipe, onClose }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Load existing shopping list
    const stored = JSON.parse(localStorage.getItem('shoppingList')) || [];
    setShoppingList(stored);
  }, []);

  const addRecipeIngredients = () => {
    if (!recipe || !recipe.extendedIngredients) return;

    const newItems = recipe.extendedIngredients.map(ingredient => ({
      id: Date.now() + Math.random(),
      name: ingredient.original,
      quantity: ingredient.amount + ' ' + ingredient.unit,
      category: 'Recipe Ingredients',
      checked: false,
      addedFrom: recipe.title
    }));

    const updatedList = [...shoppingList, ...newItems];
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const addCustomItem = () => {
    if (!newItem.trim()) return;

    const newItemObj = {
      id: Date.now(),
      name: newItem.trim(),
      quantity: '',
      category: 'Custom',
      checked: false,
      addedFrom: 'Manual'
    };

    const updatedList = [...shoppingList, newItemObj];
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
    setNewItem('');
    setShowAddForm(false);
  };

  const toggleItem = (itemId) => {
    const updatedList = shoppingList.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const removeItem = (itemId) => {
    const updatedList = shoppingList.filter(item => item.id !== itemId);
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const clearCompleted = () => {
    const updatedList = shoppingList.filter(item => !item.checked);
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear the entire shopping list?')) {
      setShoppingList([]);
      localStorage.removeItem('shoppingList');
    }
  };

  const exportList = () => {
    const listText = shoppingList
      .filter(item => !item.checked)
      .map(item => `- ${item.name}${item.quantity ? ` (${item.quantity})` : ''}`)
      .join('\n');
    
    const blob = new Blob([listText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const checkedCount = shoppingList.filter(item => item.checked).length;
  const totalCount = shoppingList.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">🛒 Shopping List</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {checkedCount}/{totalCount}</span>
            <span>{Math.round((checkedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(checkedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Recipe Ingredients Button */}
      {recipe && recipe.extendedIngredients && (
        <button
          onClick={addRecipeIngredients}
          className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          📝 Add "{recipe.title}" Ingredients
        </button>
      )}

      {/* Add Custom Item */}
      <div className="mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          ➕ Add Custom Item
        </button>
        
        {showAddForm && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
            />
            <div className="flex gap-2">
              <button
                onClick={addCustomItem}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Shopping List Items */}
      {shoppingList.length > 0 ? (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {shoppingList.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                item.checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <div className="flex-1">
                <p className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {item.name}
                </p>
                {item.quantity && (
                  <p className="text-sm text-gray-600">{item.quantity}</p>
                )}
                <p className="text-xs text-gray-500">Added from: {item.addedFrom}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Your shopping list is empty. Add ingredients from recipes or custom items!</p>
      )}

      {/* Action Buttons */}
      {shoppingList.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={clearCompleted}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
          >
            Clear Completed
          </button>
          <button
            onClick={exportList}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
          >
            Export List
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList; 
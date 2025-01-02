import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg mb-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                  Recipes
                </Link>
                <Link to="/add" className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                  Add Recipe
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
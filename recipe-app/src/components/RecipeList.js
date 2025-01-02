import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
      const recipesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecipes(recipesData);
    });

    return () => unsubscribe();
  }, []);

  const toggleIngredient = async (recipeId, ingredientIndex) => {
    const recipe = recipes.find(r => r.id === recipeId);
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[ingredientIndex] = {
      ...updatedIngredients[ingredientIndex],
      checked: !updatedIngredients[ingredientIndex].checked
    };

    try {
      await updateDoc(doc(db, 'recipes', recipeId), {
        ingredients: updatedIngredients
      });
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {recipes.map(recipe => (
        <div key={recipe.id} className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() => toggleIngredient(recipe.id, index)}
                  className="mr-2"
                />
                <span className={ingredient.checked ? 'line-through text-gray-500' : ''}>
                  {ingredient.name}
                </span>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
            <p className="whitespace-pre-wrap">{recipe.instructions}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
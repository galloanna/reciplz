import { useState } from 'react';

const AddIngredient = ({ loading, ingredients, updateIngredients }) => {

    const [newIngredient, setNewIngredient] = useState(null);
    
    const addToIngredients = (e) => {
        e.preventDefault();
        ingredients.push(newIngredient);
        console.log(ingredients);
        updateIngredients();
    }

    return(
        <form className="form-widget">
        <div className="container mx-auto w-72 py-4">
            <input type="text" 
            name="text" 
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            placeholder="Bananas"
            id="ingredient"
            onChange={(e) => setNewIngredient(e.target.value)}
            />
          </div>
            <button className="w-44 h-11 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700" disabled={loading} onClick={addToIngredients}>
              Add Ingredient
            </button>
      </form>
    );
}

export default AddIngredient;
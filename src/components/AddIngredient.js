import { useState } from "react";

const AddIngredient = ({ loading, ingredients, updateIngredients }) => {
  const [newIngredient, setNewIngredient] = useState(null);

  const addToIngredients = (e) => {
    e.preventDefault();
    ingredients.push(newIngredient);
    console.log(ingredients);
    updateIngredients();
  };

  return (
    <form className="container form-widget flex mx-auto items-center justify-center w-full lg:w-1/2 mb-16">
      <label htmlFor="ingredient" className="visually-hidden">
        Add a new ingredient
      </label>
      <input
        type="text"
        name="text"
        className="pl-5 py-3 border-zinc-300 border-2 text-lg placeholder-zinc-500 w-full rounded-full mr-5"
        placeholder="add ingredient"
        id="ingredient"
        autoComplete="off"
        onChange={(e) => setNewIngredient(e.target.value)}
      />
      <button
        className="rounded-full p-2 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800"
        disabled={loading}
        onClick={addToIngredients}
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
          />
        </svg>
        <span className="visually-hidden">Add ingredient</span>
      </button>
    </form>
  );
};

export default AddIngredient;

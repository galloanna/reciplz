// get the fields values
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AddIngredient from "./AddIngredient";
import Ingredient from "./Ingredient";

const Pantry = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [recipesReady, setRecipesReady] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  let selectedIngredients = [];

  useEffect(() => {
    getIngredients();
  }, [session]);

  const getIngredients = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data } = await supabase
        .from("profiles")
        .select("ingredients")
        .eq("id", user.id)
        .single();

      if (data) {
        setIngredients(data.ingredients);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      selectedIngredients = [...selectedIngredients, value];
    } else {
      selectedIngredients = selectedIngredients.filter((e) => e !== value);
    }
    console.log(selectedIngredients)
  };

  const updateIngredients = async (e) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        ingredients,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedIngredients}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    )
      .then((res) => res.json())
      .then(({ hits }) => {
        setRecipeData(hits);
        setRecipesReady(true);
        console.log(hits);
      })
      .catch(() => {
        console.error("Could not load recipes");
        setRecipesReady(false);
      });
  };

  return (
    <div aria-live="polite" className="container">
      {loading ? (
        "Saving ..."
      ) : (
        <div>
          <AddIngredient
            updateIngredients={updateIngredients}
            loading={loading}
            ingredients={ingredients}
          />
          <fieldset className="flex flex-wrap gap-2" onChange={handleIngredientCheck}>
            <legend className="visually-hidden">Select from your ingredients</legend>
            {ingredients.map((ingredient) => {
              return (
                <Ingredient key={ingredient} ingredientName={ingredient} />
              );
            })}
          </fieldset>
        </div>
      )}
      <div>
        <button
          className="w-44 h-11 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
          onClick={fetchRecipes}
        >
          Search Recipes
        </button>
        {recipesReady && (
          <>
            {recipeData.map((item) => {
              return <span key={item.recipe.label}>{item.recipe.label}</span>;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Pantry;

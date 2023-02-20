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
  const [recipesMessage, setRecipeMessage] = useState('');
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
    console.log(selectedIngredients);
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
    setRecipeMessage('Fetching recipes...')
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedIngredients}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    )
      .then((res) => res.json())
      .then(({ hits }) => {
        setRecipeData(hits);
        setRecipesReady(true);
        console.log(hits);
        setRecipeMessage('')
      })
      .catch(() => {
        setRecipeMessage('Error loading recipes. Please try again.')
        console.error("Could not load recipes");
        setRecipesReady(false);
      });
  };

  return (
    <div className="container flex justify-center">
      <div aria-live="polite">
        {loading ? (
          <p className="text-xl text-center mb-8 text-zinc-700 font-semibold">
            Updating pantry...
          </p>
        ) : (
          <div>
            <AddIngredient
              updateIngredients={updateIngredients}
              loading={loading}
              ingredients={ingredients}
            />
            <fieldset
              className="flex flex-wrap gap-2"
              onChange={handleIngredientCheck}
            >
              <legend className="text-xl text-center mb-8 text-zinc-700 font-semibold">
                Curently in your pantry
              </legend>
              {ingredients.sort().map((ingredient) => {
                return (
                  <Ingredient key={ingredient} ingredientName={ingredient} />
                );
              })}
            </fieldset>
          </div>
        )}
        <button
          className="mx-auto rounded-full px-8 py-4 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800"
          disabled={loading}
          onClick={fetchRecipes}
        >
          Search Recipes
        </button>
        {recipesReady ? (
          <>
            {recipeData.map((item) => {
              return <span key={item.recipe.label}>{item.recipe.label}</span>;
            })}
          </>
        ) : (
          <p className="text-xl text-center mb-8 text-zinc-700 font-semibold">
            { recipesMessage }
          </p>
        )}
      </div>
    </div>
  );
};

export default Pantry;

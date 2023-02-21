// get the fields values
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AddIngredient from "./AddIngredient";
import Ingredient from "./Ingredient";
import RecipeSearchButton from "./RecipeSearchButton";
import IngredientDeleteButton from "./IngredientDeleteButton";
import Recipe from "./Recipe";

const Pantry = ({ session }) => {
  // let selectedIngredients = [];

  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState(null);
  const [recipesReady, setRecipesReady] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [recipesMessage, setRecipeMessage] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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
      setSelectedIngredients([...selectedIngredients, value]);
      // selectedIngredients = [...selectedIngredients, value];
    } else {
      setSelectedIngredients(selectedIngredients.filter((e) => e !== value));
      // selectedIngredients = selectedIngredients.filter((e) => e !== value);
    }
    console.log("Selected ingredients are ", selectedIngredients);
  };

  const updateIngredients = async () => {
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
    setRecipeMessage("Fetching recipes...");
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${selectedIngredients}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    )
      .then((res) => res.json())
      .then(({ hits }) => {
        setRecipeData(hits);
        setRecipesReady(true);
        setRecipeMessage("");
      })
      .catch(() => {
        setRecipeMessage("Error loading recipes. Please try again.");
        console.error("Could not load recipes");
        setRecipesReady(false);
      });
  };

  const deleteIngredients = async () => {
    const allIngredients = ingredients;
    const ingredientsToDelete = selectedIngredients;
    const deletionSet = new Set(ingredientsToDelete);
    const remainingIngredients = allIngredients.filter((ingredient) => {
      return !deletionSet.has(ingredient);
    });
    console.log("Ingredients left after deletion: ", remainingIngredients);

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        ingredients: remainingIngredients,
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
      setSelectedIngredients([]);
      setRecipesReady(false);
      setLoading(false);
    }

    getIngredients();
  };

  return (
    <div className="container">
      <div aria-live="polite" className="flex flex-col w-full items-center">
        {loading ? (
          <p className="text-xl text-center mb-8 text-zinc-700 font-semibold">
            Updating pantry...
          </p>
        ) : (
          <div className="w-full">
            <AddIngredient
              updateIngredients={updateIngredients}
              loading={loading}
              ingredients={ingredients}
            />
            <form role="search">
              <fieldset
                className="flex flex-wrap gap-2"
                onChange={handleIngredientCheck}
              >
                <legend className="text-xl text-center mb-8 text-zinc-700 font-semibold">
                  {ingredients.length} ingredients currently in your pantry.
                  <p className="text-lg text-zinc-500 font-normal mt-2">
                    Select ingredients to search recipes.
                  </p>
                </legend>
                {ingredients.sort().map((ingredient) => {
                  return (
                    <Ingredient key={ingredient} ingredientName={ingredient} />
                  );
                })}
              </fieldset>
            </form>
          </div>
        )}
        <div className="flex gap-2">
          <RecipeSearchButton loading={loading} fetchRecipes={fetchRecipes} />
          <IngredientDeleteButton deleteIngredients={deleteIngredients} />
        </div>
        <p className="text-xl text-center mb-8 text-zinc-700 font-semibold">
          {recipesMessage}
        </p>
        {recipesReady && (
          <ul className="flex gap-2 flex-wrap items-center justify-center">
            {recipeData.map((item) => {
              return <Recipe item={item} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pantry;

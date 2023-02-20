// get the fields values
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AddIngredient from "./AddIngredient";
import Ingredient from "./Ingredient";

const Pantry = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState(null);
  let selectedIngredients = [];

  useEffect(() => {
    getIngredients();
  }, [session]);

  const getIngredients = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
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

    console.log(`${value} is ${checked}`);

    if (checked) {
    selectedIngredients = [...selectedIngredients, value];
    } else {
    selectedIngredients = selectedIngredients.filter((e) => e !== value);
    }

    console.log("selected ingredients are", selectedIngredients);
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

  return (
    <div aria-live="polite" className="container mx-auto">
      {loading ? (
        "Saving ..."
      ) : (
        <div>
          <AddIngredient
            updateIngredients={updateIngredients}
            loading={loading}
            ingredients={ingredients}
          />
          <form onChange={handleIngredientCheck}>
            {ingredients.map((ingredient) => {
              return (
                <Ingredient key={ingredient} ingredientName={ingredient} />
              );
            })}
          </form>
        </div>
      )}
    </div>
  );
};

export default Pantry;

// get the fields values 
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

const Pantry = ( { session } ) => {

    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState(null);
    const [newIngredient, setNewIngredient] = useState(null);

    useEffect(() => {
        getIngredients()
    }, [session])

    const getIngredients = async () => {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
            .from('profiles')
            .select('ingredients')
            .eq('id', user.id)
            .single()

            if(data){
                setIngredients(data.ingredients)
            }

        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
        }
    }

    const addToIngredients = (e) => {
        e.preventDefault();
        ingredients.push(newIngredient);
        console.log(ingredients);
        updateIngredients();
    }

    const updateIngredients = async (e) => {

        try {
            setLoading(true)
            const user = supabase.auth.user();

            const updates = {
                id : user.id,
                ingredients,
                updated_at: new Date()
            }

            let { error } = await supabase.from("profiles")
            .upsert(updates, { returning : 'minimal'})

            if(error){
                throw error;
            }
        } catch (error) {
            alert(error.message)
        } finally{
            setLoading(false)
        }
    }

    return (
        <div aria-live="polite" className='container mx-auto'>
      {loading ? (
        'Saving ...'
      ) : (
        // <form onSubmit={updateIngredientsArray} className="form-widget">
        <div>
            <div>
                {ingredients.map((ingredient) => {
                    return <p>{ingredient}</p>;
                })}
            </div>
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
              <div className='text-center'>
                  <button className="w-44 h-11 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700" disabled={loading} onClick={addToIngredients}>
                    Add Ingredient
                  </button>
              </div>
            </form>
        </div>
      )}
      
    </div>
    )


}

export default Pantry;

// update these values
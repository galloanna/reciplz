// get the fields values 
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import AddIngredient from "./AddIngredient"
import Ingredient from "./Ingredient"

const Pantry = ( { session } ) => {

    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState(null);
    

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
            <AddIngredient updateIngredients={updateIngredients} loading={loading} ingredients={ingredients} />
            <form>
                {ingredients.map((ingredient) => {
                    return <Ingredient key={ingredient} ingredientName={ingredient} />;
                })}
            </form>
        </div>
      )}
      
    </div>
    )


}

export default Pantry;

// update these values
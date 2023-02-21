// get the fields values 
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

const Account = ( { session,  } ) => {
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState(session.user.email)

    useEffect(() => {
        getProfile()
    }, [session])

    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const user = supabase.auth.user();

            const updates = {
                id : user.id,
                email,
                ingredients: [],
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

    const getProfile = async () => {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data } = await supabase
            .from('profiles')
            .select(`email`)
            .eq('id', user.id)
            .single()

            if(data){
                setEmail(data.email)
            }

        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div aria-live="polite" className='container mx-auto'>
      {loading ? (
          <p className="text-xl text-center mb-8 text-zinc-700 font-semibold">Loading...</p>
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 form-widget mx-auto">
          <label htmlFor="email" className="visually-hidden">Enter your email addrress</label>
              <input type="text" 
              name="text" 
              className="mx-auto w-80 pl-5 py-3 border-zinc-300 border-2 text-lg placeholder-zinc-500 rounded-full mb-3" 
              placeholder="you@email.com"
              id="email"
              value={email || ''}
              readonly
            //   onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          <div className='text-center'>
              <button className="mx-auto w-56 rounded-full px-8 py-4 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800" disabled={loading}>
                Confirm Email
              </button>
          </div>
        </form>
      )}
      
    </div>
    )
}

export default Account;
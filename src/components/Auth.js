import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [userMessage, setUserMessage]= useState('Log in with your email address to get cooking.');
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setUserMessage('Sending magic link...')
      const { error } = await supabase.auth.signIn({ email }, {redirectTo: `${window.location.origin}/confirm-account`})
      if (error) throw error
      setUserMessage('Success! Check your email for the magic link.')
    } catch (error) {
      console.log(error.error_description || error.message)
      setUserMessage('Something went wrong. Please refresh and try again.')
    } finally {
    }
  }

  return (
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 form-widget mx-auto" aria-live="polite">
        <p className="text-xl text-center mb-12 text-zinc-700">{userMessage}</p>
          <form onSubmit={handleLogin} className="flex flex-col w-full">
            <label htmlFor="website" className="visually-hidden">Enter your email addrress</label>
            <input type="email" 
              name="email" 
              className="mx-auto w-80 pl-5 py-3 border-zinc-300 border-2 text-lg placeholder-zinc-500 rounded-full mb-3" 
              placeholder="you@email.com"
              id="website"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
               <button className="mx-auto w-56 rounded-full px-8 py-4 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800" >
               Send magic link
              </button>
          </form>
      </div>
    
  )
}
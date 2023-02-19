import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Auth from "./components/Auth";
import Pantry from "./components/Pantry";
import Account from "./components/Account";
import { Routes, Route } from 'react-router-dom';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container mx-auto">
      {session && <Navbar /> }
      <Routes>
        <Route path="/" element={!session ? <><Hero /><Auth /></> : <Pantry />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </div>
  );
}

export default App;

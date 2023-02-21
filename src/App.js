import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Auth from "./components/Auth";
import Pantry from "./components/Pantry";
import Account from "./components/Account";
import Footer from "./components/Footer";
import "./App.css";


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-6 lg:px-10 pb-[88px]">
        <Navbar session={session} />
        <Hero />
        <Routes>
          <Route path="/" element={!session ? <Auth /> : <Pantry />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </div>
      <Footer className="h-[88px]" />
    </div>
  );
}

export default App;

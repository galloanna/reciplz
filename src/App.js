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
  const [isExistingUser, setIsExistingUser] = useState(false);

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
        <Routes>
          <Route path="/" element={!session ? <><Hero heroText={"We have food at home!"}/><Auth /></> : <><Hero heroText={"We have food at home!"}/><Account key={session.user.id} session={session} isExistingUser={isExistingUser} setIsExistingUser={setIsExistingUser}/></>}></Route>
          <Route path="/pantry" element={!session ? <><Hero heroText={"We have food at home!"}/><Auth /></> : <><Hero heroText={"The kitchen is calling."}/><Pantry key={session.user.id} session={session}/></>}></Route>
          <Route path="/confirm-account" element={!session ? <><Hero heroText={"We have food at home!"}/><Auth /></> : <><Hero heroText={"One more thing! Is this you?"}/><Account key={session.user.id} session={session} isExistingUser={isExistingUser} setIsExistingUser={setIsExistingUser}/></>}></Route>
        </Routes>
      </div>
      <Footer className="h-[88px]" />
    </div>
  );
}

export default App;

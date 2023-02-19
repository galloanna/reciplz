import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    let navigate = useNavigate();
    const redirectOnLogout = () =>{ 
        let path = "/"; 
        navigate(path);
      }
      
    return (
        <nav className="navbar">
            <h1>Reciplz</h1>
            <div className="links">
                <a href="/">Pantry</a>
                <a href="/account">Account</a>
                <button type="button" className="button" onClick={() => {
                    supabase.auth.signOut()
                    redirectOnLogout()}}>
                  Log out
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
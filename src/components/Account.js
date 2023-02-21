// get the fields values
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Account = ({ session, userConfirmed, setUserConfirmed }) => {
  const [userMessage, setUserMessage] = useState(
    "Please confirm your email address to continue."
  );
  const [email, setEmail] = useState(session.user.email);
  const [loading, setLoading] = useState(true);
  const [initialIngredients, setInitialIngredients] = useState([]);


  useEffect(() => {
    getProfile();
  }, [session]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        email,
        ingredients: initialIngredients,
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
      setUserConfirmed(true);
      setUserMessage(`Confirmed! Let's eat!`);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data } = await supabase
        .from("profiles")
        .select(`email`)
        .eq("id", user.id)
        .single();

      if (data) {
        setEmail(data.email);
        setInitialIngredients(data.ingredients);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full lg:w-1/2 form-widget mx-auto"
      aria-live="polite"
    >
      <p className="text-xl text-center mb-12 text-zinc-700">{userMessage}</p>
      <form
        onSubmit={updateProfile}
        className="form-widget flex flex-col w-full"
      >
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 form-widget mx-auto">
          <label htmlFor="email" className="visually-hidden">
            Enter your email addrress
          </label>
          <input
            type="text"
            name="text"
            className="mx-auto w-80 pl-5 py-3 border-zinc-300 border-2 text-lg placeholder-zinc-500 rounded-full mb-3"
            placeholder="you@email.com"
            id="email"
            value={email || ""}
            readOnly
            //   onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-center">
          {!userConfirmed ? (
            <button
              className="mx-auto w-56 rounded-full px-8 py-4 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800"
              disabled={loading}
            >
              Confirm Email
            </button>
          ) : (
            <Link to={"../pantry"}>
              <button className="mx-auto w-56 rounded-full px-8 py-4 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800">
                Go to Pantry
              </button>
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default Account;

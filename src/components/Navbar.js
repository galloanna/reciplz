import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ session }) => {
  const navigate = useNavigate();

  const [mobileIsOpen, setMobileIsOpen] = useState(false);

  const redirectOnLogout = () => {
    setMobileIsOpen(false);
    const path = "/";
    navigate(path);
  };

  const toggleMobileMenu = () => {
    setMobileIsOpen(!mobileIsOpen);
  };

  return (
    <nav className="bg-white border-gray-200 py-2.5 rounded">
      <div className="relative container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mr-2"
            id="a"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2500 1840.5"
          >
            <path d="M2500,935c0-309.5-252-561.5-561.5-561.5-90.5,0-179.5,22-259.5,63.5C1575,177,1322,0,1030.5,0c-244,0-463.5,125-589,321.5C185,370.5,0,593,0,855.5c0,300,244,543.5,543.5,543.5h6.5l12,63.5c16.5,86.5,16.5,174,0,260.5l-16.5,85.5c-1.5,8.5,1,17.5,7,23.5,6,6,14.5,9,23,8,222-35,448.5-52.5,674-52.5s452,17.5,674,52.5c1.5,0,2.5,.5,4,.5,7.5,0,14.5-3,19.5-8.5,6-6.5,8.5-15.5,6-24.5-25-101.5-26.5-208.5-4.5-310.5,305.5-6.5,551.5-256,551.5-562ZM53,855.5c0-221,145-410.5,352-470.5-23,45.5-41,94-54,145-3.5,14,5,28.5,19.5,32,14,3.5,28.5-5,32-19.5,16-65,42-125,75-180,1.5-2,3-4,4-6.5C597,171,801.5,53,1029.5,53c279,0,520,175.5,609.5,430,.5,1,.5,2,1,3,12,34.5,21,70,27,107,2,13,13.5,22,26,22,1.5,0,3,0,4.5-.5,14.5-2.5,24.5-16,22-30.5-5.5-33-13.5-65.5-23-96.5,74-40,156.5-61.5,241-61.5,280,0,508,228,508,508s-228,508-508,508h-10c-171.5-3-326.5-90.5-418-235,41-38.5,77-81.5,107-128.5,8-12.5,4.5-29-8-36.5-12.5-8-29-4.5-36.5,8-32,49-70.5,94-114.5,133h0c-118,104.5-270.5,162-428,162-85.5,0-169-16.5-247.5-49-1.5-1-3-1.5-5-2-69.5-29.5-133-70.5-188-122.5-9-8-18-17-27-26.5-10-10.5-27-11-37.5-1s-11,27-1,37.5c10,10.5,19.5,20,29.5,29,45.5,42.5,96,78.5,151,107.5-43,15-88,24-134,26.5h0c-8.5,.5-17,.5-27,.5-270,1-490-219-490-489.5Zm1841,925.5c-212.5-31.5-428.5-47.5-644-47.5s-432.5,16-645,47.5l9.5-48.5c18-93,18-187.5,0-280.5l-11-56.5c58-6.5,114-22,167.5-46.5,82.5,33,170,49.5,259.5,49.5,160.5,0,315.5-55,439.5-155.5,96,146,251.5,238,425.5,251-19,95-19.5,192.5-1.5,287Z" />
          </svg>
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Reciplz
          </span>
        </a>
        {session && (
          <>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
              aria-controls="navbar-default"
              aria-expanded={mobileIsOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              className={`${
                mobileIsOpen ? "absolute top-10" : "hidden"
              } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="flex items-center flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                <li className="mb-4 md:mb-0">
                  <a
                    href="/"
                    className="text-zinc-700 hover:text-purple-700 text-lg font-semibold"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-6 md:mb-0">
                  <a
                    href="/account"
                    className="text-zinc-700 hover:text-purple-700 text-lg font-semibold"
                  >
                    Account
                  </a>
                </li>
                <li className="mb-4 md:mb-0">
                  <button
                    type="button"
                    className="rounded-full px-5 py-2 text-lg text-white font-semibold bg-purple-700 hover:bg-purple-800"
                    onClick={() => {
                      supabase.auth.signOut();
                      redirectOnLogout();
                    }}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

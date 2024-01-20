import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(!nav);

  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // This useEffect runs whenever loggedIn state changes
    if (!loggedIn) {
      // If not logged in, reset the navigation state
      setNav(false);
    }
  }, [loggedIn]);

  const logOutUser = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:4000/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        //console.log(data.status.message);
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        navigate("/")
      } else {
        const data = await response.json();
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      name="navbar"
      className="w-screen h-[80px] z-10 bg-zinc-300 fixed drop-shadow-lg"
    >
      <div className="px-2 flex justify-between items-center w-full h-full">
        {/* Logo Section */}
        <h1 className="text-3xl font-bold ml-9 sm:text-4xl">M & G.</h1>

        {/* Navigation Section */}
        <div className="flex ml-auto mr-9">
          <ul className="hidden md:flex space-x-3">
            {loggedIn ? (
              // Links when logged in
              <>
                <li className="hover:text-indigo-600 hover:bounceOrig mt-3">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-indigo-600 hover:bounceOrig mt-3">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="hover:text-indigo-600 hover:bounceOrig mt-3">
                  <Link to="/exercises">Exercises</Link>
                </li>
                <li className="bg-transparent hover:bg-indigo-600 font-bold hover:text-white py-2 px-4 border-2 border-indigo-600 hover:border-transparent hover:bounceOrig rounded-full text-indigo-600 mr-4 shadow-xl">
                  <button onClick={logOutUser}>Logout</button>
                </li>
              </>
            ) : (
              // Links when logged out
              <>
                <li className="bg-transparent hover:bg-indigo-600 font-bold hover:text-white py-3 px-4 border-2 border-indigo-600 hover:border-transparent hover:bounceOrig rounded-full text-indigo-600 mr-4 shadow-xl">
                  <Link to="/login">Login</Link>
                </li>
                <li className="px-8 py-3 bg-indigo-600 border-2 text-white rounded-full hover:bg-transparent border-indigo-600 hover:text-indigo-600 hover:bounceOrig shadow-xl">
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>

        {/* Mobile Menu */}
        <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8 mt-9"}>
          {loggedIn ? (
            // Links when logged in
            <>
              <li
                className="border-b-2 border-zinc-300 w-full"
                onClick={handleClose}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className="border-b-2 border-zinc-300 w-full"
                onClick={handleClose}
              >
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li
                className="border-b-2 border-zinc-300 w-full"
                onClick={handleClose}
              >
                <Link to="/exercises">Exercises</Link>
              </li>
              <li
                className="border-b-2 border-zinc-300 w-full"
                onClick={logOutUser}
              >
                Logout
              </li>
            </>
          ) : (
            // Links when logged out
            <>
              <li
                className="border-b-2 border-zinc-300 w-full"
                onClick={handleClose}
              >
                <Link to="/login">Login</Link>
              </li>
              <li
                className="border-b-2 border-zinc-300 w-full"
                onClick={handleClose}
              >
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

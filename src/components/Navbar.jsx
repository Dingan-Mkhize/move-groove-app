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

      // console.log("Request URL:", "http://localhost:4000/logout");
      // console.log("Request Headers:", response.headers);
      // console.log("Request Status:", response.status);

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
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-9 sm:text-4xl">M & G.</h1>

          <ul className="hidden md:flex">
            <li className="hover:text-indigo-600 hover:bounceOrig">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-indigo-600 hover:bounceOrig">
              <Link to="dashboard">Dashboard</Link>
            </li>
            <li className="hover:text-indigo-600 hover:bounceOrig">
              <Link to="exercises">Exercises</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex pr-4">
          {loggedIn ? (
            <Link
              className="bg-transparent hover:bg-indigo-600 font-bold hover:text-white py-2 px-4 border-2 border-indigo-600 hover:border-transparent hover:bounceOrig rounded-full text-indigo-600 mr-4 shadow-xl"
              to={"/logout"}
              onClick={logOutUser}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                className="bg-transparent hover:bg-indigo-600 font-bold hover:text-white py-3 px-4 border-2 border-indigo-600 hover:border-transparent hover:bounceOrig rounded-full text-indigo-600 mr-4 shadow-xl"
                to={"/login"}
              >
                Login
              </Link>
              <button className="px-8 py-3 bg-indigo-600 border-2 text-white rounded-full hover:bg-transparent border-indigo-600 hover:text-indigo-600 hover:bounceOrig shadow-xl">
                <Link to="/signup">Signup</Link>
              </button>
            </>
          )}
        </div>

        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>

      {/* Hamburger Menu*/}
      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
        <li className="border-b-2 border-zinc-300 w-full">
          <Link onClick={handleClose} to="home" smooth="true" duration={500}>
            Home
          </Link>
        </li>
        <li className="border-b-2 border-zinc-300 w-full">
          <Link
            onClick={handleClose}
            to="dashboard"
            smooth="true"
            offset={-200}
            duration={500}
          >
            Dashboard
          </Link>
        </li>
        <li className="border-b-2 border-zinc-300 w-full">
          <Link
            onClick={handleClose}
            to="exercises"
            smooth="true"
            offset={-50}
            duration={500}
          >
            Exercises
          </Link>
        </li>

        <div className="flex flex-col my-4">
          <button className="bg-transparent text-indigo-600 px-8 py-3 mb-4  hover:bg-indigo-600 font-bold hover:text-white border-2 border-indigo-600 hover:border-transparent hover:bounceOrig rounded-full shadow-xl">
            <Link to="/login">Log In</Link>
          </button>
          <button className="px-8 py-3 bg-indigo-600 border-2 text-white rounded-full hover:bg-transparent border-indigo-600 hover:text-indigo-600 hover:bounceOrig shadow-xl">
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

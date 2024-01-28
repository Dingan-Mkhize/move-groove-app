import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    // This useEffect runs whenever loggedIn state changes
    if (!loggedIn) {
      // If not logged in, reset the navigation state
      setNav(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    // This useEffect handles the window resize
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logOutUser = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:4000/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        //console.log(data.status.message);
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        navigate("/");
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
        <div className="block md:hidden mr-6">
          <button onClick={handleNav}>
            {nav ? <XIcon className="w-5" /> : <MenuIcon className="w-5" />}
          </button>
        </div>
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full bg-zinc-300 ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="text-3xl hero-font font-bold border-black text-black p-3">
          M & G
        </h1>
        {loggedIn ? (
          <>
            <li className="p-4 border-b border-black bg-zinc-300 text-black hover:text-indigo-600">
              <Link
                onClick={handleNav}
                to="/"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li className="p-4 border-b border-black bg-zinc-300 text-black hover:text-indigo-600">
              <Link
                onClick={handleNav}
                to="/dashboard"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Dashboard
              </Link>
            </li>
            <li className="p-4 border-b border-black bg-zinc-300 text-black hover:text-indigo-600">
              <Link
                onClick={handleNav}
                to="/exercises"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Exercises
              </Link>
            </li>
            <li
              className="p-4 border-gray-900 bg-zinc-300 rounded-br-3xl hover:text-indigo-600"
              onClick={logOutUser}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            {/* Logged-out links */}
            <li
              className="p-4 border-b border-gray-900 bg-zinc-300 hover:text-indigo-600"
              onClick={handleNav}
            >
              <Link to="/login">Login</Link>
            </li>
            <li
              className="p-4 border-gray-900 bg-zinc-300 rounded-br-3xl hover:text-indigo-600"
              onClick={handleNav}
            >
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import signupImg from "../assets/mg-signup-img.png";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Suppressing the specific ESLint warning
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useContext(LoginContext); // Use context
  const navigate = useNavigate();

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const user = {
        email,
        password,
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", response.headers.get("Authorization"));
        console.log(
          "Token stored in localStorage:",
          response.headers.get("Authorization"))
        setLoggedIn(true);
        setErrorMessage("");
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Error!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage(error.message || "Error!");
    }
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={signupImg} alt="" />
      </div>

      <div className="flex flex-col justify-center">
        <form
          onSubmit={createUser}
          className="max-w-[400px] w-full mx-auto rounded-md shadow-xl bg-zinc-300 p-6"
        >
          <p className="text-center -mb-3 italic font-bold">
            Come and join us!
          </p>
          <h2 className="text-4xl font-bold text-center py-6">
            Moove & Groove
          </h2>
          <div className="flex flex-col py-2"></div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border-2 border-black rounded-full p-2"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Confirm Email</label>
            <input
              className="border-2 border-black rounded-full p-2"
              type="email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border-2 border-black rounded-full p-2"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border w-full my-3 py-2 bg-indigo-600 rounded-full text-white hover:bounceOrig shadow-x"
          >
            Sign Up
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;

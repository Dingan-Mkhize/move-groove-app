import React, { useState } from "react";
import signupImg from "../assets/signupImg.jpeg";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const user = {
        username,
        email,
        password,
      };

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("jwt", JSON.stringify(data.status.data));
        setErrorMessage("");
      } else {
        setErrorMessage("Error!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Error!");
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
          <div className="flex flex-col py-2">
            <label htmlFor="username">First Name</label>
            <input
              id="username"
              className="border-2 border-black rounded-full p-2"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="username">Surname</label>
            <input
              className="border-2 border-black rounded-full p-2"
              type="text"
            />
          </div>
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

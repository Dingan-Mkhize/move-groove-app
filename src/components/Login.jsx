import React from "react";
import loginImg from "../assets/loginImg.avif";
import { useState } from "react";

const Login = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function logInUser(event) {
    event.preventDefault();
    fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          localStorage.setItem("jwt-token", data.token);
          setUserName("");
          setEmail("")
          setPassword("");
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="flex flex-col justify-center">
        <form
          onSubmit={logInUser}
          className="max-w-[400px] w-full mx-auto rounded-md shadow-xl bg-zinc-300 p-6"
        >
          <p className="text-center -mb-3 italic font-bold">
            Welcome back!
          </p>
          <h2 className="text-4xl font-bold text-center py-6">
            Moove & Groove
          </h2>
          <div className="flex flex-col py-2">
            <label>Username</label>
            <input
              className="border-2 border-black rounded-full p-2"
              value={username}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border-2 border-black rounded-full p-2"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border-2 border-black rounded-full p-2"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="border w-full my-3 py-2 bg-indigo-600 rounded-full text-white hover:bounceOrig shadow-x">
            Log In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" name="" /> Remember Me
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

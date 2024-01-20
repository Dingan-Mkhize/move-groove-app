import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import loginImg from "../assets/mg-login-img.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Suppressing the specific ESLint warning
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a JWT token is present in local storage and update loggedIn state
    const jwtToken = localStorage.getItem("jwt");
    setLoggedIn(!!jwtToken);
  }, [setLoggedIn]); 

  async function logInUser(event) {
    try {
      event.preventDefault();
      let response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      });

      let data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", response.headers.get("Authorization"));
        console.log(
          "Token stored in localStorage:",
          response.headers.get("Authorization")
        );
        setLoggedIn(true);

        // Navigate to the dashboard after successfully logging in
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data.message);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="flex flex-col justify-center">
        <div>
          <form
            onSubmit={logInUser}
            className="max-w-[400px] w-full mx-auto rounded-md shadow-xl bg-zinc-300 p-6"
          >
            <p className="text-center -mb-3 italic font-bold">Welcome back!</p>
            <h2 className="text-4xl font-bold text-center py-6">
              Moove & Groove
            </h2>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

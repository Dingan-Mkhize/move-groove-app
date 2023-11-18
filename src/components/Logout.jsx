import loginImg from "../assets/loginImg.avif";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const Logout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedOut, setLoggedOut] = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    // check if a JWT token is present in local storage
    const jwtToken = localStorage.getItem("jwt");
    console.log("jwtToken", jwtToken);
    setLoggedOut(!jwtToken);
  }, [navigate, setLoggedOut]);

  useEffect(() => {
    // Redirect to the home page when the user is logged in
    if (loggedOut) {
      navigate("/", { replace: true});
    }
  }, [navigate]);

  function logOutUser(event) {
    event.preventDefault();
    fetch("http://localhost:3000/users/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.status.code === 200) {
          console.log(data.status.message);
          localStorage.removeItem("jwt", data.token);
          setLoggedOut(true);
          setEmail("");
          setPassword("");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="flex flex-col justify-center">
            <form
              onSubmit={logOutUser}
              className="max-w-[400px] w-full mx-auto rounded-md shadow-xl bg-zinc-300 p-6"
            >
              <p className="text-center -mb-3 italic font-bold">
                Goodbye! Come back soon!
              </p>
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
  );
};

export default Logout;

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="edit" element={<Edit />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;

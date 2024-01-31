import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import ProtectedRoute from "./components/ProtectedRoute"; 
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"; 
import Home from "./components/Home"; 
import Dashboard from "./components/Dashboard"; 
import Exercises from "./components/Exercises"; 
import Edit from "./components/Edit"; 
import Add from "./components/Add";  
import Login from "./components/Login";
import useScrollToTop from "./hooks/useScrollToTop.js"; 

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useScrollToTop();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []); // Dependency on navigate to ensure it's available

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <Navbar />
      <div className="max-w-[1240px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/edit/:exerciseId" element={<Edit />} />
            <Route path="/add/:id" element={<Add />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;

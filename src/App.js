import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import Edit from "./components/Edit";
import Add from "./components/Add";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.jwt ? true : false
    );

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false){
      localStorage.clear();
      }
    }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/edit/:exerciseId" element={<Edit />} />
        <Route path="/add/:id" element={<Add />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </LoginContext.Provider>
  );
}

export default App;

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="edit" element={<Edit />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

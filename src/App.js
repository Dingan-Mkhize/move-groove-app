import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

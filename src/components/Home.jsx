import React from "react";
import { Link } from "react-router-dom"
import bgImg from "../assets/hero-img.avif";

const Hero = () => {
  return (
    <div
      name="home"
      className="w-full h-screen bg-white-200 flex flex-col justify-between items-center"
    >
      <div className=" grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="flex flex-col md:items-start w-full px-2 py-9">
          <p className="text-2xl italic">You have to get up and MOVE!</p>
          <h1 className="py-3 text-5xl md:text-7xl font-bold">Move & Groove</h1>
          <p className="text-2xl italic">If you wanna find the GROOVE!</p>
          <button className="py-3 px-6 sm:w-[60%] my-4 bg-indigo-600 rounded-full text-white hover:animate-bounce shadow-xl">
            <Link to="/signup">Get Started</Link>
          </button>
        </div>
        <div className="mx-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d] border-2 border-indigo-600"
            src={bgImg}
            alt="/"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { FaCheck, FaPlus, FaChartLine } from "react-icons/fa";

import bgImg from "../assets/hero-img.avif";

const Hero = () => {
  return (
    <div
      name="home"
      className="w-full h-screen bg-white-200 flex flex-col justify-between items-center"
    >
      <div className=" grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="flex flex-col md:items-start w-full px-2 py-8">
          <p className="text-2xl italic">You have to get up and MOVE!</p>
          <h1 className="py-3 text-5xl md:text-7xl font-bold">Move & Groove</h1>
          <p className="text-2xl italic">If you wanna find the GROOVE!</p>
          <button className="py-3 px-6 sm:w-[60%] my-4 bg-indigo-600 rounded-full text-white hover:animate-bounce shadow-xl">
            Get Started
          </button>
        </div>
        <div className="mx-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d] border-2 border-indigo-600"
            src={bgImg}
            alt="/"
          />
        </div>

{/* icon message */}
        <div
          className="absolute mx-auto flex flex-col items-center py-8 md:min-w-[760px] bottom-[5%] md:left-1/2 transform md:-translate-x-1/2 bg-zinc-300 rounded-xl text-center shadow-xl border-2 border-indigo-600"
        >
          <p className="text-xl italic font-bold mb-3">Your no fuss workout tracker</p>
          <div className="flex justify-between flex-wrap px-4">
            <p className="flex px-4 py-2 text-black">
              <FaCheck className="h-6 mx-3 text-indigo-600" /> Check In
            </p>
            <p className="flex px-4 py-2 text-black">
              <FaPlus className="h-6 mx-3 text-indigo-600" /> Add Workout
            </p>
            <p className="flex px-4 py-2 text-black">
              <FaChartLine className="h-6 mx-3 text-indigo-600" /> Track
              Progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

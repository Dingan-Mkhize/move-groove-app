import React from "react";
import {
  CloudUploadIcon,
  DatabaseIcon,
  PaperAirplaneIcon,
  ServerIcon,
} from "@heroicons/react/solid";

import bgImg from "../assets/hero-img.avif";

const Hero = () => {
  return (
    <div
      name="home"
      className="w-full h-screen bg-white-200 flex flex-col justify-between"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
          <p className="text-2xl italic">You have to get up and MOVE!</p>
          <h1 className="py-3 text-5xl md:text-7xl font-bold">Move & Groove</h1>
          <p className="text-2xl italic">If you wanna find the GROOVE!</p>
          <button className="py-3 px-6 sm:w-[60%] my-4 bg-indigo-600 rounded text-white hover:animate-bounce">Get Started</button>
        </div>
        <div className="mx-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d]"
            src={bgImg}
            alt="/"
          />
        </div>
        
        <div
          className="absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%] md:left-1/2 transform md:-translate-x-1/2 bg-zinc-300
            border border-slate-300 rounded-xl text-center shadow-xl mx-9"
        >
          <p>Data Services</p>
          <div className="flex justify-between flex-wrap px-4">
            <p className="flex px-4 py-2 text-black">
              <CloudUploadIcon className="h-6 text-indigo-600" /> App Security
            </p>
            <p className="flex px-4 py-2 text-black">
              <DatabaseIcon className="h-6 text-indigo-600" /> Dashboard Design
            </p>
            <p className="flex px-4 py-2 text-black">
              <ServerIcon className="h-6 text-indigo-600" /> Cloud Data
            </p>
            <p className="flex px-4 py-2 text-black">
              <PaperAirplaneIcon className="h-6 text-indigo-600" /> API
            </p>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Hero;

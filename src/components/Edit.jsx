import React from "react";
import bgImg from "../assets/hero-img.avif";

const Edit = () => {
  return (
    <div
      name="edit"
      className="h-screen w-full flex flex-col justify-between items-center"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="m-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d] border-2 border-indigo-600"
            src={bgImg}
            alt="/"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col justify-center">
          <form className="max-w-[400px] w-full mx-auto rounded-md p-6">
            <h2 className="text-4xl font-bold text-center py-6">
              Add Your Workout
            </h2>
            <div className="flex flex-col py-2">
              <label>Date</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="date"
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Duration - minutes</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="number"
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Distance - km</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="number"
              />
            </div>
            <button className="w-full py-3 px-6 my-4 bg-indigo-600 rounded-full text-white hover:animate-bounce shadow-xl">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Edit;

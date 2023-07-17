import React from "react";

import { Exercises } from "../Data";

const Activities = () => {
  return (
    <div
      name="exercises"
      className="w-full h-screen bg-[#ffffff] text-zinc-300"
    >
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="mt-20">
          <header className="text-4xl text-[#000000] font-bold inline border-b-4 border-indigo-600">
            My Exercises
          </header>
          <p className="py-6 text-[#000000] font-bold">Choose a new exercise</p>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4">
          {Exercises.map((exercise) => (
            <div
              className="rounded-xl shadow-xl bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-600 border-2 border-indigo-600"
              key={exercise.id}
            >
              <img
                className="w-20 mx-auto pt-5"
                src={exercise.img}
                alt="skills icons"
              />
              <p className="my-4 text-[#ffffff]">{exercise.title}</p>
              <div className="flex justify-center">
                <button className=" bg-white text-[#000000]  rounded-full mb-2 mx-auto py-1 px-3 hover:scale-110 duration-500 border-2 border-indigo-600 hover:animate-bounce shadow-xl">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;

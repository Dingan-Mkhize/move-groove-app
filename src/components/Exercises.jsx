import React from "react";
import { Exercises } from "../Data";
import { useNavigate } from "react-router-dom";

const Activities = () => {
  let navigate = useNavigate();

  const handleAddExercise = async (selectedExercise) => {
    const exerciseData = {
      exercise: selectedExercise.title, // Make sure this matches your backend's expected params
      duration: 30, // Set a default duration or get from user
      date: new Date().toISOString().slice(0, 10), // Set today's date as default or get from user
    };

    const jwtToken = localStorage.getItem("jwt");

    try {
      const response = await fetch("http://localhost:4000/activity_logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        throw new Error("Failed to add exercise");
      }

      const newActivityLog = await response.json();
      navigate(`/edit/${newActivityLog.id}`, {
        state: { activityLog: newActivityLog },
      });
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  return (
    <div name="exercises" className="w-full h-fit bg-[#ffffff] text-zinc-300">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="mt-20">
          <header className="text-4xl text-[#000000] font-bold inline border-b-4 border-indigo-600">
            Exercises
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
                <button
                  className="flex bg-white text-[#000000]  rounded-full mb-2 mx-auto py-1 px-3 hover:scale-110 duration-500 border-2 border-indigo-600 hover:bounceOrig shadow-xl"
                  onClick={() => handleAddExercise(exercise)}
                >
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

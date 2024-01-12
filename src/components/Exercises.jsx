import React from "react";
import { Exercises } from "../Data";
import { Link, useNavigate } from "react-router-dom";

const Activities = () => {
  let navigate = useNavigate();

  const handleAddExercise = async (selectedExercise) => {
    // Define the exercise data structure as required by your backend
    const exerciseData = {
      name: selectedExercise.title,
      // other fields like date, duration, etc., if needed
    };

    try {
      const response = await fetch("/api/activity_logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization headers if required
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        throw new Error("Failed to add exercise");
      }

      // Redirect or update UI after successfully adding the exercise
      navigate("/path-to-redirect"); // Redirect to a confirmation or activity log page
    } catch (error) {
      console.error("Error adding exercise:", error);
      // Handle and display error to the user
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
                <button className="flex bg-white text-[#000000]  rounded-full mb-2 mx-auto py-1 px-3 hover:scale-110 duration-500 border-2 border-indigo-600 hover:bounceOrig shadow-xl">
                  <Link to="/edit">Add</Link>
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

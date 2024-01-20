import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import bgImg from "../assets/mg-hero-img-add.png";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const exerciseName = location.state?.exercise || "No exercise selected"; // Get the exercise name from the location state

  const [workout, setWorkout] = useState({
    exercise: exerciseName,
    date: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleCreate = async () => {
    const jwtToken = localStorage.getItem("jwt");

    try {
      const response = await fetch("http://localhost:4000/activity_logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${jwtToken}`,
        },
        body: JSON.stringify({ activity_log: workout }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating the workout:", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="m-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d] border-2 border-indigo-600"
            src={bgImg}
            alt="/"
          />
        </div>
        <div className="flex flex-col justify-center">
          <form className="max-w-[400px] w-full mx-auto rounded-md p-6">
            <h2 className="text-4xl font-bold text-center py-6">
              Add Your Workout
            </h2>

            <div className="flex flex-col py-2">
              <label>Exercise</label>
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                {exerciseName}
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label>Date</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="date"
                name="date"
                value={workout.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col py-2">
              <label>Duration - minutes</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="number"
                name="duration"
                value={workout.duration}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="w-full py-3 px-6 my-4 bg-indigo-600 rounded-full text-white hover:bounceOrig shadow-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;

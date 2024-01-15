import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/hero-img.avif";

const Add = () => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    exercise: "",
    date: "",
    duration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleCreate = async () => {
    const jwtToken = localStorage.getItem("jwt");
    console.log("JWT Token:", jwtToken); // Debug the token

    const url = "http://localhost:4000/activity_logs";

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: jwtToken, // Use the token as is, assuming it already has 'Bearer '
      };
      console.log("Request Headers:", headers); // Debug the headers

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ activity_log: workout }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Redirect to the dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating the workout:", error);
      // Optionally, update state here to show error message to the user
    }
  };

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
        <div className="flex flex-col justify-center">
          <form className="max-w-[400px] w-full mx-auto rounded-md p-6">
            <h2 className="text-4xl font-bold text-center py-6">
              Add Your Workout
            </h2>

            <div className="flex flex-col py-2">
              <label>Exercise</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="text"
                name="exercise"
                value={workout.exercise}
                onChange={handleInputChange}
                placeholder="Enter exercise name"
              />
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

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImg from "../assets/hero-img.avif";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({ date: "", duration: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location && location.state && location.state.workoutData) {
      setIsEditing(true);
      setWorkout(location.state.workoutData);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `/api/workouts/${workout.id}` // URL for updating
      : "/api/workouts"; // URL for creating

    const method = isEditing ? "PUT" : "POST"; // HTTP method based on the action

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // Include other necessary headers, like authorization if needed
        },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Redirect or update UI after successful operation
      navigate("/path-after-successful-operation");
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Handle errors here, such as displaying a message to the user
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
          <form
            className="max-w-[400px] w-full mx-auto rounded-md p-6"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-bold text-center py-6">
              {isEditing ? "Edit Your Workout" : "Add Your Workout"}
            </h2>
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
              type="submit"
              className="w-full py-3 px-6 my-4 bg-indigo-600 rounded-full text-white hover:bounceOrig shadow-xl"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;

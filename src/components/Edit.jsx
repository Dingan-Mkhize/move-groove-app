import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import bgImg from "../assets/mg-hero-img-edit.png";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exerciseId } = useParams(); // Get the exerciseId from the URL
  const [workout, setWorkout] = useState({
    exercise: "",
    date: "",
    duration: "",
  });

  useEffect(() => {
    if (location.state && location.state.workoutData) {
      setWorkout(location.state.workoutData);
    } else {
      // Fetch the exercise data if not provided in location.state
      const fetchExerciseData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/activity_logs/${exerciseId}`,
            {
              method: "GET",
              headers: {
                Authorization: `${localStorage.getItem("jwt")}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setWorkout(data);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchExerciseData();
    }
  }, [exerciseId, location.state]);

  // This effect sets the workout data when the component mounts
  useEffect(() => {
    if (location.state && location.state.workoutData) {
      setWorkout(location.state.workoutData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleUpdate = async () => {
    const jwtToken = localStorage.getItem("jwt");

    try {
      const response = await fetch(
        `http://localhost:4000/activity_logs/${workout.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`,
          },
          body: JSON.stringify({ activity_log: workout }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      console.log("Success:", updatedData);
      navigate("/dashboard"); // Redirect to the dashboard after update
    } catch (error) {
      console.error("Error updating the workout:", error);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto mx-9">
        <div className="m-9">
          <img
            className="w-full rounded-xl shadow-xl shadow-[#7d7d7d] border-2 border-indigo-600 mt-12"
            src={bgImg}
            alt="Background"
          />
        </div>
        <div className="flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto rounded-md p-6"
            onSubmit={(e) => {
              e.preventDefault(); 
              handleUpdate(); 
            }}
          >
            <h2 className="text-4xl font-bold text-center py-6">
              Edit Your Workout
            </h2>

            {/* Non-editable field for exercise */}
            <div className="flex flex-col py-2">
              <label>Exercise</label>
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                {workout.exercise}
              </div>
            </div>

            {/* Editable fields for date and duration */}
            <div className="flex flex-col py-2">
              <label>Date</label>
              <input
                className="border-2 border-indigo-600 rounded-full p-2"
                type="date"
                name="date"
                value={workout.date}
                onChange={handleInputChange}
                required
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
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 my-4 bg-indigo-600 rounded-full text-white hover:bounceOrig shadow-xl"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;

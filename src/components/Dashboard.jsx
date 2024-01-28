import React, { useState, useEffect } from "react";
import DurationFrequencyChart from "../components/Chart.jsx";
import { Link } from "react-router-dom";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const jwtToken = localStorage.getItem("jwt");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    console.log(`${jwtToken}`); // Log the JWT token

    const fetchActivities = async () => {
      console.log("Fetching activities...");
      try {
        const response = await fetch("http://localhost:4000/activity_logs", {
          method: "GET",
          headers: {
            Authorization: `${jwtToken}`, // Use jwtToken in the request console.log(`Bearer ${jwtToken}`);
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchActivities();
  }, [jwtToken]); // Depend on jwtToken

  const handleDeleteExercise = async (exerciseId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/activity_logs/${exerciseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${jwtToken}`, // Use jwtToken in the request header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete exercise");
      }

      setActivities(
        activities.filter((activity) => activity.id !== exerciseId)
      ); // Update state
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  return (
    <div
      name="dashboard"
      className="w-full h-fit grid md:grid-cols-1 grid-cols-1 items-center"
    >
      <div className="mt-10">
        <div className="mt-20 mx-4 md:mx-20">
          <header className="text-4xl text-[#000000] font-bold inline border-b-4 border-indigo-600">
            Dashboard
          </header>

          <div className=" flex flex-col items-center justify-center mt-6">
            <h1 className="text-center text-xl italic py-6 text-[#000000] font-bold">
              Add a new exercise to your routine!
            </h1>

            <button className="mx-auto my-4 bg-indigo-600 text-white font-semibold py-2 px-10 rounded-full hover:bounceOrig shadow-xl transition ease-in duration-200 min-w-[200px]">
              <Link to="/exercises" className="block text-center">
                New Exercise
              </Link>
            </button>
          </div>
        </div>

        <div className="mx-4 md:mx-20 my-10 p-6 border-2 border-indigo-600 rounded shadow-xl">
          <DurationFrequencyChart activities={activities} />
        </div>

        <div className="mx-4 md:mx-20 my-10 border-2 border-indigo-600 rounded shadow-xl">
          <Card className="overflow-hidden">
            <Title className="text-center text-2xl md:text-3xl p-3">
              My Activities
            </Title>
            <div className="overflow-x-auto">
              <Table className="mt-5">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Exercise</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Duration</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.exercise}</TableCell>
                      <TableCell>
                        <Text>{activity.date}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{activity.duration}</Text>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-between items-center space-x-2">
                          <Link
                            to={`/edit/${activity.id}`}
                            className="hover:text-indigo-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteExercise(activity.id)}
                            className="hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

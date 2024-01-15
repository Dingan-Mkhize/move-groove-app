import React, { useState, useEffect } from "react";
//import { PencilIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import {
  //AreaChart,
  Card,
  //Metric,
  //TabList,
  //Tab,
  //TabGroup,
  //TabPanels,
  //TabPanel,
} from "@tremor/react";

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";

//import { logic } from "../Data";
// import { data } from "../Data";

// const numberFormatter = (value: number) =>
//   Intl.NumberFormat("us").format(value).toString();
// const percentageFormatter = (value: number) =>
//   `${Intl.NumberFormat("us")
//     .format(value * 100)
//     .toString()}%`;
// function sumArray(array: any[], metric: string) {
//   return array.reduce(
//     (accumulator, currentValue) => accumulator + currentValue[metric],
//     0
//   );
// }

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const jwtToken = localStorage.getItem("jwt"); // Retrieve JWT token from local storage

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
        setActivities(data); // Set activities in state
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
      className="w-full h-fit grid md:grid-cols-1 items-center"
    >
      <div className="mt-10">
        <div className="mt-20 mx-20">
          <header className="text-4xl text-[#000000] font-bold inline border-b-4 border-indigo-600">
            Dashboard
          </header>

          <div className=" flex flex-col items-center justify-center">
            <h1 className="text-center text-xl italic py-6 text-[#000000] font-bold">
              Add a new exercise to your routine!
            </h1>

            <button className="items-center py-3 sm:w-[30%] my-4 bg-indigo-600 rounded-full text-white hover:bounceOrig shadow-xl">
              <Link to="/exercises">New Exercise</Link>
            </button>
          </div>
        </div>

        {/* <div className="mx-20 my-10 border-2 border-indigo-600 rounded shadow-xl">
          <Card className="p-0">
            <TabGroup>
              <TabList>
                <Tab className="p-4 sm:p-6 text-left">
                  <p className="text-sm sm:text-base">Activities</p>
                  <Metric className="mt-2 text-inherit">
                    {numberFormatter(sumArray(data, "Activities"))}
                  </Metric>
                </Tab>
                <Tab className="p-4 sm:p-6 text-left">
                  <p className="text-sm sm:text-base">Page views</p>
                  <Metric className="mt-2 text-inherit">
                    {numberFormatter(sumArray(data, "Page Views"))}
                  </Metric>
                </Tab>
                <Tab className="p-4 sm:p-6 text-left">
                  <p className="text-sm sm:text-base">Bounce rate</p>
                  <Metric className="mt-2 text-inherit">
                    {percentageFormatter(
                      sumArray(data, "Bounce Rate") / data.length
                    )}
                  </Metric>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className="p-6">
                  <AreaChart
                    className="h-80 mt-10"
                    data={data}
                    index="Month"
                    categories={["Activities"]}
                    colors={["blue"]}
                    valueFormatter={numberFormatter}
                    showLegend={false}
                    yAxisWidth={50}
                  />
                </TabPanel>
                <TabPanel className="p-6">
                  <AreaChart
                    className="h-80 mt-10"
                    data={data}
                    index="Month"
                    categories={["Page Views"]}
                    colors={["blue"]}
                    valueFormatter={numberFormatter}
                    showLegend={false}
                    yAxisWidth={50}
                  />
                </TabPanel>
                <TabPanel className="p-6">
                  <AreaChart
                    className="h-80 mt-10"
                    data={data}
                    index="Month"
                    categories={["Bounce Rate"]}
                    colors={["blue"]}
                    valueFormatter={percentageFormatter}
                    showLegend={false}
                    yAxisWidth={40}
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </div> */}

        <div className="mx-20 my-10 border-2 border-indigo-600 rounded shadow-xl">
          <Card>
            <Title className="text-3xl">My Activities</Title>
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Exercise</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Duration</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>{" "}
                  {/* Added Actions header */}
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
        <span className="hover:text-indigo-600 pr-3">
          <Link to={`/edit/${activity.id}`}>Edit</Link> 
        </span>
        <button
          className="hover:text-indigo-600 pl-3"
          onClick={() => handleDeleteExercise(activity.id)}
        >
          Delete
        </button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

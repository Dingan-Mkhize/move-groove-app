import React, { useState, useEffect } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
} from "victory";

const DurationFrequencyChart = ({ activities }) => {

const [chartWidth, setChartWidth] = useState(
  window.innerWidth < 768 ? window.innerWidth : 900
);
const [chartHeight, setChartHeight] = useState(
  window.innerWidth < 768 ? 300 : 400
);

useEffect(() => {
  function handleResize() {
    setChartWidth(window.innerWidth < 768 ? window.innerWidth : 900);
    setChartHeight(window.innerWidth < 768 ? 300 : 400);
  }

  window.addEventListener("resize", handleResize);

  // Cleanup the event listener on component unmount
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Filter and sort activities data
  const filteredSortedActivities = activities
    .filter((activity) => new Date(activity.date) >= oneMonthAgo)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((activity) => ({
      date: new Date(activity.date).toISOString().split("T")[0],
      duration: activity.duration,
      exercise: activity.exercise || "Unknown Exercise",
    }));

  return (
    <>
      <h3 className="text-center text-2xl font-semibold text-black mb-6">
        Exercise Duration and Frequency
      </h3>
      <VictoryChart
        theme={VictoryTheme.material}
        width={chartWidth}
        height={chartHeight}
        padding={{ top: 20, bottom: 90, left: 50, right: 50 }}
        containerComponent={<VictoryVoronoiContainer responsive={true} />}
      >
        {/* X and Y Axes */}
        <VictoryAxis
          fixLabelOverlap={true}
          style={{
            tickLabels: {
              angle: -45,
              textAnchor: "end",
              fontSize: 12,
              padding: 5,
              fill: "black",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x} min`}
          style={{
            tickLabels: {
              fontSize: 12,
              padding: 3,
              fill: "black",
            },
          }}
        />

        {/* Line component */}
        <VictoryLine
          data={filteredSortedActivities}
          x="date"
          y="duration"
          style={{
            data: { stroke: "rgb(79, 70, 229)" },
          }}
        />

        {/* Scatter component for markers */}
        <VictoryScatter
          data={filteredSortedActivities}
          x="date"
          y="duration"
          size={6}
          style={{ data: { fill: "rgb(79, 70, 229)" } }}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ fill: "white", stroke: "gray", strokeWidth: 1 }}
              style={{ fontSize: 12, fill: "black" }}
            />
          }
          labels={({ datum }) =>
            `Exercise: ${datum.exercise}\nDuration: ${datum.duration} min\nDate: ${datum.date}`
          }
        />
      </VictoryChart>
    </>
  );
};

export default DurationFrequencyChart;

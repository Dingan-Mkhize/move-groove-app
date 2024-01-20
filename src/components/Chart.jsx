//import React, { useState, useEffect } from "react";
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
      <h3 className="text-center text-lg font-semibold text-black mt-6">
        Exercise Duration and Frequency
      </h3>
      <VictoryChart
        theme={VictoryTheme.material}
        width={900}
        height={400}
        containerComponent={<VictoryVoronoiContainer responsive />}
      >
        {/* X and Y Axes */}
        <VictoryAxis
          fixLabelOverlap={true}
          style={{
            tickLabels: {
              angle: -45,
              textAnchor: "end",
              fontSize: 9,
              padding: 3,
              fill: "black",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x} min`}
          style={{
            tickLabels: {
              fontSize: 9,
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
              style={{ fontSize: 10, fill: "black" }}
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

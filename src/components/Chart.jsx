import React, { useState, useEffect } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
//import { data } from "../Data";


const DurationFrequencyChart = ({ activities }) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Filter and sort activities data
  const filteredSortedActivities = activities
    .filter((activity) => new Date(activity.date) >= oneMonthAgo)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((activity) => ({
      date: new Date(activity.date).toISOString().split("T")[0], // format date as YYYY-MM-DD
      duration: activity.duration,
    }));

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) =>
            `Duration: ${datum.duration} min\nDate: ${datum.date}`
          }
          labelComponent={
            <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />
          }
        />
      }
      >
        
      <VictoryAxis
        fixLabelOverlap={true}
        style={{
          tickLabels: {
            angle: -45,
            textAnchor: "end",
            fontSize: 6, // Smaller font size for labels
            padding: 10,
            fill: "black", // Black color for labels
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x} min`}
        style={{
          tickLabels: {
            fontSize: 6, // Smaller font size for Y-axis labels
            fill: "black", // Black color for Y-axis labels
          },
        }}
      />
      <VictoryLine
        data={filteredSortedActivities}
        x="date"
        y="duration"
        style={{
          data: { stroke: "rgb(79, 70, 229)" }, // Line color
        }}
      />
    </VictoryChart>
  );
};

export default DurationFrequencyChart;

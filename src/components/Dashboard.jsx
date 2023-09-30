import React from "react";
import { StatusOnlineIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom"
import {
  AreaChart,
  Card,
  Metric,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
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
  Badge,
} from "@tremor/react";

import { logic } from "../Data";
import { data } from "../Data";

const numberFormatter = (value: number) =>
  Intl.NumberFormat("us").format(value).toString();
const percentageFormatter = (value: number) =>
  `${Intl.NumberFormat("us")
    .format(value * 100)
    .toString()}%`;
function sumArray(array: any[], metric: string) {
  return array.reduce(
    (accumulator, currentValue) => accumulator + currentValue[metric],
    0
  );
}

const Dashboard = () => {
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

        <div className="mx-20 my-10 border-2 border-indigo-600 rounded-xl shadow-xl">
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
        </div>

        <div className="mx-20 my-10 border-2 border-indigo-600 rounded-xl shadow-xl">
          <Card>
            <Title className="text-3xl">My Activites</Title>
            <Table className="mt-5">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Exercise</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Duration</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logic.map((item) => (
                  <TableRow key={item.exercise}>
                    <TableCell>{item.exercise}</TableCell>
                    <TableCell>
                      <Text>{item.date}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{item.duration}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge color="emerald" icon={StatusOnlineIcon}>
                        {item.status}
                      </Badge>
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

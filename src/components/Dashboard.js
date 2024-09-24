import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom"; // Import useLocation
import "chart.js/auto";
import UserData from "./UserData";
import UserProfile from "./UserProfile";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const location = useLocation(); // Get location
  const userId = location.state?.userId; // Get userId from state

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const chartData = {
    labels: data.map((agent) => agent.firstName + " " + agent.lastName),
    datasets: [
      {
        label: "Policies Sold",
        data: data.map((agent) => agent.policiesSold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Credit Points",
        data: data.map((agent) => agent.creditPoints),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#2e8b57] p-6 rounded-lg shadow-md w-full max-w-6x1">
        <div className="flex justify-center items-start w-full space-x-4">
          <div className="flex-row justify-center items-start w-full space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <div className="w-full mb-4">
                <UserProfile userId={userId} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <div className="w-full mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Bar Chart
                </h2>
                <Bar data={chartData} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <UserData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

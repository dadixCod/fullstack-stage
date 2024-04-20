import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const MyDoughnutChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/statistiques");
        const data = await response.json();

        if (data && data.length > 0) {
          // Process data to extract quantity and type
          const quantities = data.map((entry) => entry.quantity);
          const types = data.map((entry) => entry.type);

          // Create data structure for Chart.js
          setChartData({
            labels: types,
            datasets: [
              {
                data: quantities,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                  "#FF8A80",
                  "#8C9EFF",
                  "#FFD180",
                  "#A7FFEB",
                  "#FF80AB",
                  "#C5E1A5",
                  "#E040FB",
                  "#80CBC4",
                  "#FFAB40",
                  "#FF80AB",
                  "#81D4FA",
                  "#DCE775",
                  "#9575CD",
                  "#FFD54F",
                  "#90A4AE",
                ],
              },
            ],
          });
        } else {
          console.error("Data is empty or undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="mt-2 mb-3" style={{ width: "600px", height: "400px" }}>
        {chartData.labels && chartData.datasets && (
          <Doughnut data={chartData} />
        )}
      </div>
    </div>
  );
};

export default MyDoughnutChart;

import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ allDriverData }) => {
  const ageDataArray = [
    { "18-27": 0 },
    { "28-37": 0 },
    { "38-47": 0 },
    { "48-57": 0 },
    { "58+": 0 },
  ];

  const ageStats = allDriverData.map((driver) => {
    if (driver.age >= 18 && driver.age <= 27) {
      ageDataArray[0]["18-27"] = ageDataArray[0]["18-27"] + 1;
    } else if (driver.age >= 28 && driver.age <= 37) {
      ageDataArray[1]["28-37"] = ageDataArray[1]["28-37"] + 1;
    } else if (driver.age >= 38 && driver.age <= 47) {
      ageDataArray[2]["38-47"] = ageDataArray[2]["38-47"] + 1;
    } else if (driver.age >= 48 && driver.age <= 57) {
      ageDataArray[3]["48-57"] = ageDataArray[3]["48-57"] + 1;
    } else if (driver.age >= 58) {
      ageDataArray[4]["58+"] = ageDataArray[4]["58+"] + 1;
    }
    return driver.age;
  });

  const data = {
    labels: ["18-27", "28-37", "38-47", "48-57", "58+"],
    datasets: [
      {
        label: "# of Crash Events By Age",
        data: [
          ageDataArray[0]["18-27"],
          ageDataArray[1]["28-37"],
          ageDataArray[2]["38-47"],
          ageDataArray[3]["48-57"],
          ageDataArray[4]["58+"],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "UF Traffic Bar Chart",
      },
    },
  };

  return (
    <div>
      <Bar
        style={{ height: "280px", width: "800px" }}
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarChart;

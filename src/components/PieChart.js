import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ allDriverData }) => {
  const injurySeverityData = [
    { None: 0 },
    { Injury: 0 },
    { "Serious Injury": 0 },
    { Fatal: 0 },
  ];

  const injuryStats = allDriverData.map((driver) => {
    if (driver.injury_severity === "None") {
      injurySeverityData[0]["None"] = injurySeverityData[0]["None"] + 1;
    } else if (driver.injury_severity === "Injury") {
      injurySeverityData[1]["Injury"] = injurySeverityData[1]["Injury"] + 1;
    } else if (driver.injury_severity === "Serious Injury") {
      injurySeverityData[2]["Serious Injury"] =
        injurySeverityData[2]["Serious Injury"] + 1;
    } else if (driver.injury_severity === "Fatal") {
      injurySeverityData[3]["Fatal"] = injurySeverityData[3]["Fatal"] + 1;
    }

    return driver;
  });

  const data = {
    labels: ["Fatal", "Injury", "None", "Serious Injury"],
    datasets: [
      {
        label: "Crash Severity",
        data: [
          injurySeverityData[3]["Fatal"],
          injurySeverityData[1]["Injury"],
          injurySeverityData[0]["None"],
          injurySeverityData[2]["Serious Injury"],
        ],
        backgroundColor: [
          "rgba(199, 0, 0, 1)",
          "rgba(240, 208, 0, 1)",
          "rgba(0, 199, 0, 1)",
          "rgba(199, 83, 0, 1)",
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
    plugins: {
      title: {
        display: true,
        text: "UF Crash Severity Chart",
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;

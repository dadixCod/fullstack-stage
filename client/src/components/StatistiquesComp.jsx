import React from "react";
import MyDoughnutChart from "./MyDoughnutChart";
import PrintableStatistiques from "./PrintableStatistiques";

const StatistiquesComp = () => {
  return (
    <div>
      <h1>Statistiques</h1>
      <MyDoughnutChart />
      <PrintableStatistiques />
    </div>
  );
};

export default StatistiquesComp;

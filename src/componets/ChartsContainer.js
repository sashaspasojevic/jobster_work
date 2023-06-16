import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  return (
    <Wrapper>
      <h4>MonthlyApplications</h4>
      <button
        type='button'
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? "Change to Area Chart" : "Change to Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;

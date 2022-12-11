import React from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { useAxiosQuery } from "../../hooks/use-axios-query";
import { ngrokApi, ApiKeys } from "../../lib/ngrok-api";

import "./dashboard-page.css";

const AVAILABLE_DETAILED_STATISTICS = ["profiles", "subscriptions", "clicks"];
const UNAVAILABLE_DETAILED_STATISTICS = ["users", "messages"];

const toCapitalCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const DashboardPage = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useAxiosQuery(
    ApiKeys.Dashboard,
    ngrokApi.getAllData,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="container dashboard">
        <h2>Dashboard</h2>
        <div className="centered">
          <img src="/spinner.gif" alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="container dashboard">
      <h2>Dashboard</h2>
      <hr />
      <div className="statistics">
        {Object.entries(data).map(([name, value], i) => (
          <div className="statistic" key={i}>
            <p>{value}</p>
            <p
              className={cn({
                "statistic-link": AVAILABLE_DETAILED_STATISTICS.includes(name),
              })}
              disabled={UNAVAILABLE_DETAILED_STATISTICS.includes(name)}
              onClick={
                AVAILABLE_DETAILED_STATISTICS.includes(name)
                  ? () => navigate("/" + name)
                  : null
              }
            >
              {toCapitalCase(name)}
            </p>
          </div>
        ))}
      </div>
      <br />
      <hr />
    </div>
  );
};

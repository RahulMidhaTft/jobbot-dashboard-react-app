import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { endpoints } from "../../api/endpoints";
import useApiRequest from "../../hooks/useGetRequest";
import { Route, Routes, useNavigate } from "react-router";
import { routes } from "../../routes";

const AVAILABLE_DETAILED_STATISTICS = ["Profiles", "Subscriptions"];
const UNAVAILABLE_DETAILED_STATISTICS = ["Users", "Messages", "Clicks"];

export const Dashboard = () => {
  const [viewingStatistic, setViewingStatistic] = useState("Profiles");

  const { isLoading, responseData: dashboardCounts } = useApiRequest(
    endpoints.dashboard.count
  );
  const navigate = useNavigate();

  const statisticClickHandler = (event) => {
    setViewingStatistic(event.target.outerText);
  };

  useEffect(() => {
    const navigateTo = viewingStatistic === "Profiles" ? "/" : "/subs";
    navigate(navigateTo, {
      state: {
        title: viewingStatistic,
        count: dashboardCounts[viewingStatistic.toLowerCase()],
      },
    });
  }, [viewingStatistic, dashboardCounts, navigate]);

  return (
    <div className="container dashboard">
      <h2>Dashboard</h2>
      {isLoading ? (
        <div className="centered">
          <img src="/spinner.gif" alt="Loading" />
        </div>
      ) : (
        <>
          <hr />
          <div className="statistics">
            {UNAVAILABLE_DETAILED_STATISTICS.map((statistic, index) => (
              <div className="statistic" key={index}>
                <p>{dashboardCounts[statistic.toLowerCase()]}</p>
                <p disabled={true}>{statistic}</p>
              </div>
            ))}
            {AVAILABLE_DETAILED_STATISTICS.map((statistic, index) => {
              if (statistic !== viewingStatistic) {
                return (
                  <div className="statistic" key={index}>
                    <p>{dashboardCounts[statistic.toLowerCase()]}</p>
                    <p
                      className="statistic-link"
                      onClick={statisticClickHandler}
                    >
                      {statistic}
                    </p>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <br />
          <hr />

          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.jsx} />
            ))}
          </Routes>
        </>
      )}
    </div>
  );
};

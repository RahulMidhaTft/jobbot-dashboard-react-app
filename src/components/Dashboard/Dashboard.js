import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { endpoints } from "../../api/endpoints";

import "./Dashboard.css";

const AVAILABLE_DETAILED_STATISTICS = ["Profiles", "Subscriptions", "Clicks"];
const UNAVAILABLE_DETAILED_STATISTICS = ["Users", "Messages"];

export const Dashboard = () => {
  const [viewingStatistic, setViewingStatistic] = useState("Profiles");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardCounts, setDashboardCounts] = useState([]);
  const [error, setError] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const makeAxiosRequest = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.dashboard.count, {
          signal: controller.signal,
        });
        isMounted && setDashboardCounts(response.data);
      } catch (error) {
        setError("Error fetching dashboard counts");
        console.log(error.message);
      }
    };

    makeAxiosRequest().then(() => {
      setIsLoading(false);
    });

    return () => {
      setIsLoading(true);
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const navigate = useNavigate();

  const statisticClickHandler = (event) => {
    console.log(event.target.outerText);
    setViewingStatistic(event.target.outerText);
  };

  useEffect(() => {
    const navigateTo =
      viewingStatistic === "Profiles"
        ? "/profiles"
        : viewingStatistic === "Subscriptions"
        ? "/subs"
        : viewingStatistic === "Clicks"
        ? "/clicks"
        : "/";
    navigate(navigateTo, {
      state: {
        title: viewingStatistic,
        count: dashboardCounts[viewingStatistic.toLowerCase()],
      },
    });
  }, [viewingStatistic, dashboardCounts, navigate]);

  const dashboardJsx = error ? (
    <h5>{error}</h5>
  ) : (
    <>
      <hr />
      <div className="statistics">
        {UNAVAILABLE_DETAILED_STATISTICS.map((statistic, index) => (
          <div className="statistic" key={index}>
            <p>{dashboardCounts[statistic.toLowerCase()]}</p>
            <p disabled>{statistic}</p>
          </div>
        ))}
        {AVAILABLE_DETAILED_STATISTICS.map((statistic, index) => {
          if (statistic !== viewingStatistic) {
            return (
              <div className="statistic" key={index}>
                <p>{dashboardCounts[statistic.toLowerCase()]}</p>
                <p className="statistic-link" onClick={statisticClickHandler}>
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
    </>
  );

  return (
    <div className="container dashboard">
      <h2>Dashboard</h2>
      {isLoading ? (
        <div className="centered">
          <img src="/spinner.gif" alt="Loading" />
        </div>
      ) : (
        dashboardJsx
      )}
    </div>
  );
};

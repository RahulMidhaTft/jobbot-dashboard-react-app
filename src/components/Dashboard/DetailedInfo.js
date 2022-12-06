import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { endpoints } from "../../api/endpoints";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { CustomTable } from "../UI/CustomTable";
import UserInfo from "../UI/UserInfo";
import "./DetailedInfo.css";

const SUBSCRIPTIONS_HEADERS = ["Name", "Query", "Location", "Entries"];
const PROFILES_HEADERS = ["Name", "Head", "Location", "Profile", "Email"];

function getTableHeaders(title) {
  if (title === "Subscriptions") {
    return SUBSCRIPTIONS_HEADERS;
  } else {
    return PROFILES_HEADERS;
  }
}

export const DetailedInfo = () => {
  const [profileViewing, setProfileViewing] = useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const {
    state: { title, count },
  } = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const makeAxiosRequest = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.dashboard.data, {
          signal: controller.signal,
        });
        isMounted && setData(response.data);
      } catch (error) {
        setError("Error fetching data");
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

  const profileCloseHandler = () => {
    setProfileViewing(false);
  };

  const viewProfileHandler = (index) => {
    setProfileViewing(true);
    setSelectedProfileIndex(index);
  };

  const detailedDataJsx = error ? (
    <h5> {error}</h5>
  ) : (
    <CustomTable
      data={data}
      viewProfile={viewProfileHandler}
      headers={getTableHeaders(title)}
    />
  );

  return (
    <div className="container">
      {profileViewing && (
        <UserInfo
          closeProfile={profileCloseHandler}
          data={data[selectedProfileIndex]}
        />
      )}
      <h2>
        {title} ({count})
      </h2>
      {isLoading ? (
        <div className="centered">
          <img src="/spinner.gif" alt="Loading" />
        </div>
      ) : (
        detailedDataJsx
      )}
    </div>
  );
};

import { useState } from "react";
import { useLocation } from "react-router";
import { endpoints } from "../../api/endpoints";
import useGetRequest from "../../hooks/useGetRequest";
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
  const {
    state: { title, count },
  } = useLocation();

  const { isLoading, responseData: data } = useGetRequest(
    endpoints.dashboard.data
  );

  const profileCloseHandler = () => {
    setProfileViewing(false);
  };

  const viewProfileHandler = (index) => {
    setProfileViewing(true);
    setSelectedProfileIndex(index);
  };

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
        <CustomTable
          data={data}
          viewProfile={viewProfileHandler}
          headers={getTableHeaders(title)}
        />
      )}
    </div>
  );
};

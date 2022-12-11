import React, { useState, useContext } from "react";

import { useAxiosQuery } from "../../hooks/use-axios-query";
import { AuthContext } from "../../context/auth-context";
import { ApiKeys, ngrokApi } from "../../lib/ngrok-api";
import { CustomTable } from "../../components/UI/CustomTable";
import UserInfo from "../../components/UI/UserInfo";

import "./subscriptions-page.css";

const TABLE_HEADERS = ["Name", "Query", "Location", "Entries"];

export const SubscriptionsPage = () => {
  const { data } = useContext(AuthContext);
  const [profileViewing, setProfileViewing] = useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(-1);

  const { data: subscriptions, isLoading } = useAxiosQuery(
    ApiKeys.Subscriptions,
    ngrokApi.getSubscriptions,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const profileCloseHandler = () => {
    setProfileViewing(false);
  };

  const viewProfileHandler = (index) => {
    setProfileViewing(true);
    setSelectedProfileIndex(index);
  };

  if (isLoading) {
    return (
      <div className="container subscriptions">
        <h2>{`Subscriptions (${data.subscriptions})`}</h2>
        <hr />
        <div className="centered">
          <img src="/spinner.gif" alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="container subscriptions">
      <h2>{`Subscriptions (${data.subscriptions})`}</h2>
      <hr />
      <CustomTable
        data={subscriptions}
        viewProfile={viewProfileHandler}
        headers={TABLE_HEADERS}
      />

      {profileViewing && (
        <UserInfo
          closeProfile={profileCloseHandler}
          data={subscriptions[selectedProfileIndex]}
        />
      )}
    </div>
  );
};

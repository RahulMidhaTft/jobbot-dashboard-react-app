import React, { useState, useContext } from "react";

import { useAxiosQuery } from "../../hooks/use-axios-query";
import { AuthContext } from "../../context/auth-context";
import { ngrokApi, ApiKeys } from "../../lib/api/ngrok-api";
import { CustomTable } from "../../components/common/CustomTable";
import UserInfo from "../../components/common/UserInfo";

import "./profiles-page.css";

const TABLE_HEADERS = ["Name", "Head", "Location", "Profile", "Email"];

export const ProfilesPage = () => {
  const { data } = useContext(AuthContext);
  const [profileViewing, setProfileViewing] = useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(-1);

  const { data: profiles, isLoading } = useAxiosQuery(
    ApiKeys.Profiles,
    ngrokApi.getProfiles,
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
      <div className="container profiles">
        <h2>{`Profiles (${data.profiles})`}</h2>
        <hr />
        <div className="centered">
          <img src="/spinner.gif" alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <div className="container profiles">
      <h2>{`Profiles (${data.profiles})`}</h2>
      <hr />
      <CustomTable
        data={profiles}
        viewProfile={viewProfileHandler}
        headers={TABLE_HEADERS}
      />

      {profileViewing && (
        <UserInfo
          closeProfile={profileCloseHandler}
          data={profiles[selectedProfileIndex]}
        />
      )}
    </div>
  );
};

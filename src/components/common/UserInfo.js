import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import "./UserInfo.css";

const Backdrop = ({ onBackdropClick }) => {
  return <div className="backdrop" onClick={onBackdropClick} />;
};

const ModalOverlay = ({ data }) => {
  return (
    <Card className="user-info">
      <header className="modal-header">
        <h5>
          {data.name.split(" ")[0]} "{data.designation}"
        </h5>
      </header>
      <div className="user-profile">
        <hr />
        <i className="fa fa-5x fa-user user-icon" aria-hidden="true"></i>
        <div className="user-name-location">
          <h5>{data.name}</h5>
          <p>{data.location}</p>
        </div>
        <p>{data.designation}</p>
        <div className="user-search-queries">
          <h6>Search Queries:</h6>
          {data.entries.map((entry, index) => (
            <p key={index} className="search-query">
              {entry}
            </p>
          ))}
        </div>

        <hr />
      </div>
      <footer className="actions">
        <p>
          <strong>Email:</strong>
        </p>
        <p>{data.email || "None"}</p>
        <p>
          <strong>Search:</strong>
        </p>

        <ul>
          {data.search.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
        <p>
          <strong>Docs:</strong>
        </p>
        <p>{data.docs || "None"}</p>
      </footer>
    </Card>
  );
};

const UserInfo = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onBackdropClick={props.closeProfile} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay data={props.data} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default UserInfo;

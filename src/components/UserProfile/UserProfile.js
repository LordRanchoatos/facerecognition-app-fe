import React from "react";
import Navigation from "../Navigation/Navigation";
import "./UserProfile.css";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");

function UserProfile({
  onRouteChange,
  isSignedIn,
  name,
  id,
  email,
  entries,
  joined,
}) {
  const date = dayjs(joined).format("DD/MM/YYYY");
  dayjs.extend(relativeTime);
  const fNow = dayjs(joined).fromNow();

  return (
    <div>
      <Navigation
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
        name={name}
      />
      <div className="profile">
        {isSignedIn ? (
          <div >
            <h3>Hey! {name}</h3>
            <p>User Id email: {id}</p>
            <p>registered email: {email}</p>
            <p>
              joined: {date} ({fNow})
            </p>
            <p>Numbers of entries so far email: {entries}</p>
          </div>
        ) : (
          <div>
            <h3>Hey friend you have to be login first</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

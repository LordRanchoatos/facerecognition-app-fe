import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ onRouteChange, isSignedIn, name }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/">
          <p
            onClick={() => onRouteChange("signout")}
            className="f3 link dim dark underline pa3 pointer"
          >
            Sign out
          </p>
        </Link>

        <Link to="profile">
          <p
            // onClick={() => onRouteChange("signout")}
            className="f3 link dim dark underline pa3 pointer"
          >
            @{name}
          </p>
        </Link>
        <Link to="profile">user</Link>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/">
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim dark underline pa3 pointer"
          >
            Sign in
          </p>
        </Link>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim dark underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;

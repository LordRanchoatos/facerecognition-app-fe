import React from 'react';
import Navigation from '../Navigation/Navigation';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function UserProfile({ onRouteChange, isSignedIn, name }) {
  return (
    <div>
    <Navigation onRouteChange={onRouteChange}/>
        <div>THIS THE USER profile PAGE</div>
    </div>
  )
}

export default UserProfile
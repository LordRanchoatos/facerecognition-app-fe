import React from 'react';
import Navigation from '../Navigation/Navigation';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function UserProfile({ onRouteChange, isSignedIn, name }) {
    console.log('IS SIGNED IN: ', isSignedIn)
  return (
    <div>
    <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} name={name}/>
        <div>THIS THE USER profile PAGE</div>
    </div>
  )
}

export default UserProfile
import React from 'react';
import Navigation from '../Navigation/Navigation';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function UserProfile({ onRouteChange, isSignedIn, name, id, email, entries, joined }) {
    console.log('IS SIGNED IN: ', isSignedIn)
  return (
    <div>
    <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} name={name}/>
    {isSignedIn?
        <div>
            <h3>Hey! {name}</h3>
            <p>User Id email: {id}</p>
            <p>registered email: {email}</p>
            <p>joined: {joined}</p>
            <p>Numbers of entries so far email: {entries}</p>
        </div> : <div>
            <h3>Hey friend you have to be login first</h3>
        </div>}
    </div>
  )
}

export default UserProfile
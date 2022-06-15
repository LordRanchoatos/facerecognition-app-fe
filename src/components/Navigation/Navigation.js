import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, name }) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end' }}>
        <p 
          onClick={() => onRouteChange("signout")} 
          className='f3 link dim dark underline pa3 pointer'>Sign out
        </p>
        <p 
          // onClick={() => onRouteChange("signout")} 
        className='f3 link dim dark underline pa3 pointer'>@{name}
        </p>
      </nav>
    )
} else {
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end' }}>
        <p 
          onClick={() => onRouteChange("signin")} 
          className='f3 link dim dark underline pa3 pointer'>Sign in</p>
        <p 
          onClick={() => onRouteChange("register")} 
          className='f3 link dim dark underline pa3 pointer'>Register</p>
      </nav>
  )
}
  
}

export default Navigation;
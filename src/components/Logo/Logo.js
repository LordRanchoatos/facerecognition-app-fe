import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = ()=> {
    return (
        <div className= "ma4 nt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }}>
                <div className="Tilt-inner pa3">
                    <img alt='logo' style={{paddingTop:'5px'}} src={brain}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
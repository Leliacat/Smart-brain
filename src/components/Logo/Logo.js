import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} >
                <div className="Tilt-inner"> 
                    <img alt='brain-logo'  src= {brain}/>
                    <span className='emoji' role='img' aria-label='emoji' >👽 </span>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
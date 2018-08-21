import React from 'react';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav  style = {{display:'flex', justifyContent: 'flex-end', marginRight: '80px', transform: 'translateY(-160px)'}}>
            <p onClick={() => onRouteChange('signin')} className= 'f3 link dim black underline pointer'>Sign out</p>
        </nav>
    );
}

export default Navigation;
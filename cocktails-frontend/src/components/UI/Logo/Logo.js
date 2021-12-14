import React from 'react';
import './Logo.css';
import {NavLink} from "react-router-dom";

const Logo = () => {
    return (
        <div className="Logo">
            <NavLink to="/">Cocktails builder</NavLink>
        </div>
    );
};

export default Logo;
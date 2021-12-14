import React from 'react';
import {NavLink} from "react-router-dom";
import './Anonymous.css';

const Anonymous = () => {
  return (
    <div className="AnonymousPanel">
        <NavLink to='/register'>Sign up</NavLink>
        <NavLink className="loginBtn" to='/login'>Sing in</NavLink>
    </div>
  );
};

export default Anonymous;
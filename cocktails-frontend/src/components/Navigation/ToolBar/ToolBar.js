import React from 'react';
import './ToolBar.css';
import Logo from "../../UI/Logo/Logo";
import AppToolbar from "../../UI/AppToolbar/AppToolbar";

const ToolBar = () => {
    return (
        <header className="Toolbar">
            <div className="Toolbar-logo">
                <Logo/>
            </div>
            <div>
                <AppToolbar/>
            </div>
        </header>
    );
};

export default ToolBar;
import React from 'react';
import './Layout.css';
import ToolBar from "../../Navigation/ToolBar/ToolBar";

const Layout = ({children}) => {
    return (
        <>
         <ToolBar/>
         <main className="Layout-Content">
             {children}
         </main>
        </>
    );
};

export default Layout;
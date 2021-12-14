import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import theme from "./theme";
import store from "./store/configureStore";
import {ToastContainer} from "react-toastify";
import {MuiThemeProvider} from "@material-ui/core";


import 'react-toastify/dist/ReactToastify.css';


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <ToastContainer/>
                <App/>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
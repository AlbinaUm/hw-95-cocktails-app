import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import {useDispatch} from "react-redux";
import {facebookAppId} from "../../../config";
import {facebookLoginRequest, facebookRegisterRequest} from "../../../store/actions/usersActions";

const FacebookLogin = ({action}) => {
    const dispatch = useDispatch();

    const  facebookResponse = response => {
        if (action === "Login"){
            dispatch(facebookLoginRequest(response));
        } else if (action === "Sing up"){
            dispatch(facebookRegisterRequest(response));
        }

    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            render={props => (
                <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    {action} with facebook
                </Button>
            )}
            callback={facebookResponse}
        />
    );
};

export default FacebookLogin;
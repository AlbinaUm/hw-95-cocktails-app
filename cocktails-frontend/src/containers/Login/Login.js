import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearUserErrorsRequest, loginUserRequest} from "../../store/actions/usersActions";
import LoginForm from "../../components/loginForm/loginForm";

const Login = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const user = useSelector(state => state.users.user);
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        dispatch(clearUserErrorsRequest());

        if (user) Navigate(`/`);
    }, [dispatch, user, Navigate]);


    const onInputChange = e => {
        const {name, value} = e.target;
        setUserData(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUserRequest({...userData}));
    };

    return (
        <>
            <LoginForm
                userData={userData}
                error={error}
                loading={loading}
                submitFormHandler={submitFormHandler}
                onInputChange={onInputChange}
            />
        </>
    );
};

export default Login;
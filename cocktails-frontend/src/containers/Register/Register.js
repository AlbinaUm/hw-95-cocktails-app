import React, {useEffect} from 'react';
import RegisterForm from "../../components/registerForm/registerForm";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearUserErrorsRequest} from "../../store/actions/usersActions";

const Register = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(clearUserErrorsRequest());

        if (user) Navigate('/');
    }, [dispatch, user, Navigate]);

    return (
        <>
            <RegisterForm/>
        </>
    );
};

export default Register;
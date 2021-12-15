import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserErrorsRequest} from "../../store/actions/usersActions";
import {toast} from "react-toastify";

const Cocktails = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(clearUserErrorsRequest());

        if (!user){
            toast.warning('You must to login !');
            Navigate('/login');
        }

    }, [dispatch, user]);




    return (
        <>

        </>
    );
};

export default Cocktails;
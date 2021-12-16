import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserErrorsRequest} from "../../store/actions/usersActions";
import {toast} from "react-toastify";
import {fetchAllCocktailsRequest} from "../../store/actions/cocktailsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShortCocktailInfo from "../../components/shortCocktailInfo/shortCocktailInfo";
import './Cocktails.css';

const Cocktails = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const cocktails = useSelector(state => state.cocktails.cocktails);
    const loading = useSelector(state => state.cocktails.fetchCocktailsLoading);

    useEffect(() => {
        dispatch(clearUserErrorsRequest());

        if (!user){
            toast.warning('You must to login !');
            Navigate('/login');
        }

        dispatch(fetchAllCocktailsRequest());

    }, [dispatch, user, Navigate]);


    return cocktails && (
        <>
            {loading ? <Spinner/> :
                <>
                    {cocktails.length === 0 ? <h1>No cocktails yet</h1>
                        :
                        <div className="FullCocktailsList">
                            {cocktails.map(c => (
                                <ShortCocktailInfo
                                    key={c._id}
                                    id={c._id}
                                    image={c.image}
                                    title={c.title}
                                    published={c.published}
                                    onDelete={() => console.log(c._id)}
                                    onPublished={() => console.log(c._id)}
                                />
                            ))}
                        </div>
                    }
                </>
            }
        </>
    );
};

export default Cocktails;
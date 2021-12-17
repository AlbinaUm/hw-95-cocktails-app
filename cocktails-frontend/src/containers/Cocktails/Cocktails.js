import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserErrorsRequest} from "../../store/actions/usersActions";
import {toast} from "react-toastify";
import {
    clearCocktailsErrorsRequest,
    deleteCocktailRequest,
    fetchAllCocktailsRequest,
    publishCocktailRequest
} from "../../store/actions/cocktailsActions";
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
        dispatch(clearCocktailsErrorsRequest());

    }, [dispatch, user, Navigate]);

    const deleteCocktailById = async id => {
        try {
            console.log(id);
            await dispatch(deleteCocktailRequest(id));
            Navigate('/');
        } catch (e){
            console.log(e);
        }
    };

    const publishCocktailById = async id => {
      try {
          await dispatch(publishCocktailRequest(id));
          Navigate('/');
      } catch (e){
          console.log(e);
      }
    };


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
                                    onDelete={() => deleteCocktailById(c._id)}
                                    onPublished={() => publishCocktailById(c._id)}
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
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchAllCocktailsRequest} from "../../store/actions/cocktailsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShortCocktailInfo from "../../components/shortCocktailInfo/shortCocktailInfo";

const MyCocktails = () => {
    const dispatch = useDispatch();
    const location = useLocation().search;
    const myCocktails = useSelector(state => state.cocktails.cocktails);
    const loading = useSelector(state => state.cocktails.fetchCocktailsLoading);

    useEffect(() => {
        if (location){
            dispatch(fetchAllCocktailsRequest(location));
        }
    }, [dispatch, location]);

    return myCocktails && (
        <>
            {loading ? <Spinner/> :
                <>
                    {myCocktails.length === 0 ? <h1>No cocktails yet</h1>
                        :
                        <>
                            {myCocktails.map(c => (
                                <ShortCocktailInfo
                                    key={c._id}
                                    id={c.id}
                                    title={c.title}
                                    image={c.image}
                                    published={c.published}
                                    userId={c.user._id}
                                />
                            ))}
                        </>
                    }
                </>
            }
        </>
    );
};

export default MyCocktails;
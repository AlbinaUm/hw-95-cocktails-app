import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {fetchAllCocktailsRequest} from "../../store/actions/cocktailsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import ShortCocktailInfo from "../../components/shortCocktailInfo/shortCocktailInfo";
import './MyCocktails.css';

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
                <div className="MyCocktails">
                    <h1>My cocktails list</h1>

                    {myCocktails.length === 0 ? <h1>No cocktails yet</h1>
                        :
                        <div className="MyCocktailsList">
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
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default MyCocktails;
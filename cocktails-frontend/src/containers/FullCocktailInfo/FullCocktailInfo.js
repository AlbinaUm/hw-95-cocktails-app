import React, {useEffect} from 'react';
import {useMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCocktailByIdRequest} from "../../store/actions/cocktailsActions";
import FullCocktailItem from "../../components/fullCocktailItem/fullCocktailItem";

const FullCocktailInfo = () => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.currentCocktail);
    let match = useMatch("cocktailFullInfo/:id");

    useEffect(() => {
        if (match.params.id){
            dispatch(getCocktailByIdRequest(match.params.id));
        }
    }, [dispatch, match.params.id]);

    return cocktail &&(
        <>
            <FullCocktailItem
                title={cocktail.title}
                image={cocktail.image}
                recipe={cocktail.recipe}
                ingredients={cocktail.ingredients}
            />
        </>
    );
};

export default FullCocktailInfo;
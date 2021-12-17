import React from 'react';
import imageNotAvailable from "../../assets/images/noimage.png";
import {apiURL} from "../../config";
import './fullCoktailItem.css';

const FullCocktailItem = ({title, ingredients, recipe, image, id}) => {
    let cardImage = imageNotAvailable;

    if (image){
        cardImage = apiURL + '/' + image;
    }

    return (
        <div className="FullCocktailItem">
            <div className="BaseInfoAboutCocktail">
                <div className="CocktailImage">
                    <img width="290px" src={cardImage} alt={id}/>
                </div>
                <div>
                    <h1>{title}</h1>
                    <h4>Ingredients:</h4>
                    {ingredients.length !== 0 ?
                        <>
                            {ingredients.map(i => (
                                <div className="IngredientItem" key={i._id}>
                                    - {i.title}: {i.amount}
                                </div>
                            ))}
                        </>
                        :
                        null
                    }
                </div>
            </div>
            <div className="MoreInfoAboutCocktails">
                <h4>Recipe:</h4>
                {recipe}
            </div>
        </div>
    );
};

export default FullCocktailItem;
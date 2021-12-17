import React from 'react';
import './shortCocktailInfo.css';
import imageNotAvailable from "../../assets/images/noimage.png";
import {apiURL} from "../../config";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const ShortCocktailInfo = ({image, title, published, id, onDelete, onPublished}) => {
    const user = useSelector(state => state.users.user);
    const navigate = useNavigate();
    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/' + image;
    }

    const onCocktailBlock = id => {
        navigate(`/cocktailFullInfo/${id.id}`);
    };

    return (
        <div
            className={`CocktailShortItem ${published ? 'published' : 'unpublished'}`}
            onClick={() => onCocktailBlock({id})}
        >
            <div>
                <img width="150px" src={cardImage} alt={id}/>
            </div>
            <div>
                <h4>{title}</h4>
            </div>

            <div className="addActions">
                {user.role === 'admin' ?
                    <div>
                        {published === false ?
                            <button className="PublishBtnForAdmin" onClick={() => onPublished({id})}>Published</button>
                            :
                            null
                        }
                        <button className="DeleteBtnForAdmin" onClick={() => onDelete({id})}>Delete</button>
                    </div>
                    :
                    <div style={{textAlign: "left", fontSize: "14px", margin: "10px 0 0 10px"}}>
                        {published === false ? <h4>*Wait for the administrator to approve your cocktail</h4> : null}
                    </div>
                }
            </div>

        </div>
    );
};

export default ShortCocktailInfo;
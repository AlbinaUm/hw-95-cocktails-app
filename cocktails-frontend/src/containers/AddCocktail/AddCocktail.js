import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import AddCocktailForm from "../../components/addCocktailForm/addCocktailForm";
import {clearCocktailsErrorsRequest, postNewCocktailRequest} from "../../store/actions/cocktailsActions";

const AddCocktail = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const postStatus = useSelector(state => state.cocktails.postCocktailStatus);
    const error = useSelector(state => state.cocktails.postCocktailError);
    const [ingredients, setIngredients] = useState([{
        title: '',
        amount: '',
    }]);
    const [cocktailData, setCocktailData] = useState({
        title: '',
        recipe: '',
        image: '',
    });

    useEffect(() => {
        if (!user){
            toast.warning('You must login to continue');
            Navigate('/login');
        }

        if (postStatus === true) {
            dispatch(clearCocktailsErrorsRequest());
            Navigate('/');
        }

    }, [user, postStatus, Navigate]);


    const onChangeIngredients = (i, name, value) => {
        setIngredients(prev => {
            const ingCopy = {
                ...prev[i],
                [name]: value,
            }
            return prev.map((ing, index) => {

                if (i === index) return ingCopy;

                return ing;
            });
        })
    };

    const addIngredients = () => {
        setIngredients(prev => [
            ...prev,
            {title: '', amount: ''}
        ]);
    };

    const deleteIngredients = (index) => {
        setIngredients(ingredients.filter((ing, i) => i !== index));
    };


    const onInputChange = e => {
        const {name, value} = e.target;
        setCocktailData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setCocktailData(prevState => {
            return {...prevState, [name]: file};
        });
    };

    const submitForm = e => {
        e.preventDefault();

        const formData = new FormData();

        cocktailData.ingredients = JSON.stringify(ingredients);

        Object.keys(cocktailData).forEach(key => {
            formData.append(key, cocktailData[key]);
        });

        dispatch(postNewCocktailRequest(formData));
    };

    return (
        <>
            <AddCocktailForm
                ingredients={ingredients}
                deleteIngredient={deleteIngredients}
                onIngredChange={onChangeIngredients}
                addIngredient={addIngredients}
                submitFormHandler={submitForm}
                cocktailData={cocktailData}
                error={error}
                onInputChange={onInputChange}
                fileChangeHandler={fileChangeHandler}
            />
        </>
    );
};

export default AddCocktail;
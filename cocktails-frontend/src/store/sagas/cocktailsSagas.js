import {takeEvery} from "redux-saga/effects";
import {
    clearCocktailsErrorsRequest,
    clearCocktailSErrorsSuccess,
    postNewCocktailFailure,
    postNewCocktailRequest,
    postNewCocktailSuccess
} from "../actions/cocktailsActions";
import axiosApi from "../../axiosApi";
import {put} from 'redux-saga/effects';
import {toast} from "react-toastify";
import store from "../configureStore";


export function* postNewCocktailSagas ({payload: data}) {
    const state = store.getState();

    const headers = {
        'Authorization': state.users.user.token
    };

    try{
        yield axiosApi.post('/cocktails', data, {headers});
        yield put(postNewCocktailSuccess());
        toast.success('Cocktail was successful added', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    } catch (error){
        yield put(postNewCocktailFailure(error));
        toast.error('Cocktail was not added', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }
}

export function* clearCocktailsErrorsSagas () {
    try {
        yield put(clearCocktailSErrorsSuccess());
    } catch (e){
        console.log(e);
    }
}

const cocktailsSaga = [
    takeEvery(postNewCocktailRequest, postNewCocktailSagas),
    takeEvery(clearCocktailsErrorsRequest, clearCocktailsErrorsSagas),
];

export default cocktailsSaga;
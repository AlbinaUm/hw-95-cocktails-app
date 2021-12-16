import {takeEvery} from "redux-saga/effects";
import {
    clearCocktailsErrorsRequest,
    clearCocktailSErrorsSuccess, deleteCocktailFailure, deleteCocktailRequest, deleteCocktailSuccess,
    fetchAllCocktailsFailure,
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess,
    getCocktailByIdFailure, getCocktailByIdRequest, getCocktailByIdSuccess,
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

export function* fetchCocktailsSagas ({payload: queryString}) {
    const state = store.getState();

    const headers = {
        'Authorization': state.users.user?.token
    };

    try{
        const response = yield axiosApi.get(queryString ? '/cocktails' + queryString  : '/cocktails', {headers});
        yield put(fetchAllCocktailsSuccess(response.data));
    } catch (error){
        yield put(fetchAllCocktailsFailure(error));
    }
}

export function* getCocktailByIdSagas ({payload: id}) {
    try {
        const response = yield axiosApi.get('/cocktails/' + id);
        yield put(getCocktailByIdSuccess(response.data));
    } catch (error){
        yield put(getCocktailByIdFailure(error));
    }
}

export function* deleteCocktailSagas ({payload: id}) {
    const state = store.getState();

    const headers = {
        'Authorization': state.users.user?.token
    };

    try {
        yield axiosApi.delete('/cocktails/' + id, {headers});
        yield put(deleteCocktailSuccess(id));
    } catch (error){
        yield put(deleteCocktailFailure(error));
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
    takeEvery(fetchAllCocktailsRequest, fetchCocktailsSagas),
    takeEvery(getCocktailByIdRequest, getCocktailByIdSagas),
    takeEvery(deleteCocktailRequest, deleteCocktailSagas),
    takeEvery(clearCocktailsErrorsRequest, clearCocktailsErrorsSagas),
];

export default cocktailsSaga;
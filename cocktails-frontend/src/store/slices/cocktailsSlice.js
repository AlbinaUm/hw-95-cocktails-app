import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    cocktails: [],
    postCocktailLoading: false,
    postCocktailError: null,
    postCocktailStatus: '',
    fetchCocktailsLoading: false,
    fetchCocktailsError: null,
    clearCocktailsErrorLoading: false,
};

const name = 'cocktails';

const cocktailsSlice = createSlice({
    name,
    initialState,
    reducers: {
        postNewCocktailRequest(state){
            state.postCocktailLoading = true;
            state.postCocktailStatus = '';
        },
        postNewCocktailSuccess(state){
            state.postCocktailLoading = false;
            state.postCocktailError = null;
            state.postCocktailStatus = true;
        },
        postNewCocktailFailure(state, action){
            state.postCocktailLoading = false;
            state.postCocktailError = action.payload;
            state.postCocktailStatus = false;
        },
        clearCocktailsErrorsRequest (state){
          state.clearCocktailsErrorLoading = true;
        },
        clearCocktailSErrorsSuccess (state){
            state.clearCocktailsErrorLoading = false;
            state.postCocktailStatus = '';
            state.postCocktailError = null;
        },
        fetchAllCocktailsRequest (state){
            state.fetchCocktailsLoading = true;
        },
        fetchAllCocktailsSuccess (state, {payload: cocktails}){
            state.fetchCocktailsLoading = false;
            state.fetchCocktailsError = null;
            state.cocktails = cocktails;
        },
        fetchAllCocktailsFailure (state, action){
            state.fetchCocktailsLoading = false;
            state.fetchCocktailsError = action.payload;
        },
    }
});

export default cocktailsSlice;
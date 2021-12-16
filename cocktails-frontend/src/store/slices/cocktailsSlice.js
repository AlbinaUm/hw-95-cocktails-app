import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    cocktails: null,
    postCocktailLoading: false,
    postCocktailError: null,
    postCocktailStatus: '',
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
    }
});

export default cocktailsSlice;
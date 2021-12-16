import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    cocktails: [],
    currentCocktail: null,
    postCocktailLoading: false,
    postCocktailError: null,
    postCocktailStatus: '',
    fetchCocktailsLoading: false,
    fetchCocktailsError: null,
    getCocktailByIdLoading: false,
    getCocktailByIdError: null,
    deleteCocktailLoading: false,
    deleteCocktailError: null,
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
        getCocktailByIdRequest (state) {
            state.getCocktailByIdLoading = true;
        },
        getCocktailByIdSuccess (state, {payload: cocktail}) {
            state.currentCocktail = cocktail;
            state.getCocktailByIdLoading = false;
            state.getCocktailByIdError = null;
        },
        getCocktailByIdFailure (state, action) {
            state.getCocktailByIdError = action.payload;
        },
        deleteCocktailRequest (state){
            state.deleteCocktailLoading = true;
        },
        deleteCocktailSuccess (state, action){
            state.cocktails = state.cocktails.filter(c => c._id !== action.payload);
            state.deleteCocktailLoading = false;
        },
        deleteCocktailFailure (state, action){
            state.deleteCocktailError = action.payload;
            state.deleteCocktailLoading = false;
        },
    }
});

export default cocktailsSlice;
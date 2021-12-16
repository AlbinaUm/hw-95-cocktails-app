import cocktailsSlice from "../slices/cocktailsSlice";

export const {
    postNewCocktailRequest,
    postNewCocktailSuccess,
    postNewCocktailFailure,
    clearCocktailsErrorsRequest,
    clearCocktailSErrorsSuccess,
    fetchAllCocktailsRequest,
    fetchAllCocktailsSuccess,
    fetchAllCocktailsFailure,
} = cocktailsSlice.actions;

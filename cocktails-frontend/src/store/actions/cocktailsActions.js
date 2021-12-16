import cocktailsSlice from "../slices/cocktailsSlice";

export const {
    postNewCocktailRequest,
    postNewCocktailSuccess,
    postNewCocktailFailure,
    clearCocktailsErrorsRequest,
    clearCocktailSErrorsSuccess,
} = cocktailsSlice.actions;

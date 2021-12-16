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
    getCocktailByIdRequest,
    getCocktailByIdSuccess,
    getCocktailByIdFailure,

} = cocktailsSlice.actions;

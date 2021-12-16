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
    deleteCocktailRequest,
    deleteCocktailSuccess,
    deleteCocktailFailure,
    publishCocktailRequest,
    publishCocktailSuccess,
    publishCocktailFailure,
} = cocktailsSlice.actions;

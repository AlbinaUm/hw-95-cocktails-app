import React from 'react';
import {Container, Grid, makeStyles, TextField} from "@material-ui/core";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import './addCocktailForm.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        fontWeight: "bold",
        margin: theme.spacing(3, 0, 2),
    },
    ingredient: {
        display: "flex",
        alignItems: "center",
        margin: "10px 0",
    },
    ingredients: {
        height: "140px",
        overflow: "auto",
        padding: '20px 10px',
        margin: "10px 0",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
    }
}));

const AddCocktailForm = props => {
    const classes = useStyles();
    const {
        ingredients,
        submitFormHandler,
        loading,
        onIngredChange,
        deleteIngredient,
        addIngredient,
        cocktailData,
        onInputChange,
        fileChangeHandler,
        error,
    } = props;

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };


    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <h1 style={{marginBottom: "5px"}}>Add new cocktail</h1>
                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    spacing={2}
                    noValidate
                >
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="title"
                            autoComplete="new-name"
                            label="Title"
                            name="title"
                            value={cocktailData.title}
                            onChange={onInputChange}
                            error={Boolean(getFieldError('title'))}
                            helperText={getFieldError('title')}
                        />
                    </Grid>

                    <Grid item xs={12} className={classes.ingredients}>
                        <span style={{margin: "30px 0 0 9px"}}>Ingredients:</span>
                        {ingredients.map((ing, i) => (
                            <Grid key={i} item xs={12} className={classes.ingredient}>

                                <TextField
                                    required
                                    type="title"
                                    autoComplete="new-title"
                                    label="Title"
                                    name="title"
                                    onChange={e => onIngredChange(i, 'title', e.target.value)}
                                    error={Boolean(getFieldError(`ingredients.${i}.title`))}
                                    helperText={getFieldError(`ingredients.${i}.title`)}
                                />

                                <TextField
                                    required
                                    type="title"
                                    autoComplete="new-amount"
                                    label="Amount"
                                    name="amount"
                                    onChange={e => onIngredChange(i, 'amount', e.target.value)}
                                    error={Boolean(getFieldError(`ingredients.${i}.amount`))}
                                    helperText={getFieldError(`ingredients.${i}.amount`)}
                                />

                                <>
                                    {ingredients.length <= 1 ? null :
                                        <Grid>
                                            <button
                                                className="deleteIngredient"
                                                type="button"
                                                onClick={() => deleteIngredient(i)}
                                            >X</button>
                                        </Grid>
                                    }
                                </>
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <button type="button" onClick={addIngredient}> + Add ingredient</button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            multiline
                            rows={2}
                            maxRows={3}
                            type="title"
                            autoComplete="new-recipe"
                            label="Recipe"
                            name="recipe"
                            value={cocktailData.recipe}
                            onChange={onInputChange}
                            error={Boolean(getFieldError('recipe'))}
                            helperText={getFieldError('recipe')}
                            style={{ width: "396px", height: "50px" ,resize: "none" }}
                        />
                    </Grid>

                    <span style={{margin: "40px 0 0 9px"}}>Image:</span>
                    <Grid item xs={12}>
                        <TextField
                            type="file"
                            name="image"
                            onChange={fileChangeHandler}
                            error={Boolean(getFieldError('image'))}
                            helperText={getFieldError('image')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Add
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default AddCocktailForm;
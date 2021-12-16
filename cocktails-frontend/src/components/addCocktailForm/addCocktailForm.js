import React from 'react';
import {Container, Grid, makeStyles, TextareaAutosize, TextField} from "@material-ui/core";
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
        height: "160px",
        overflow: "auto",
        padding: '10px',
        margin: "10px 0"
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

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <h1>Add new cocktail</h1>
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
                            label="Name"
                            name="title"
                            value={cocktailData.title}
                            onChange={onInputChange}
                            error={Boolean(error)}
                        />
                    </Grid>

                    <Grid item xs={12} className={classes.ingredients}>
                        {ingredients.map((ing, i) => (
                            <Grid key={i} item xs={12} className={classes.ingredient}>

                                <TextField
                                    required
                                    type="title"
                                    autoComplete="new-title"
                                    label="Title"
                                    name="title"
                                    onChange={e => onIngredChange(i, 'title', e.target.value)}
                                    error={Boolean(error)}
                                />

                                <TextField
                                    required
                                    type="title"
                                    autoComplete="new-amount"
                                    label="Amount"
                                    name="amount"
                                    onChange={e => onIngredChange(i, 'amount', e.target.value)}
                                    error={Boolean(error)}
                                />

                                <Grid>
                                    <button
                                        className="deleteIngredient"
                                        type="button"
                                        onClick={() => deleteIngredient(i)}
                                    >X</button>
                                </Grid>
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <button type="button" onClick={addIngredient}> + Add ingredient</button>
                        </Grid>
                    </Grid>

                    <span style={{marginLeft: "9px"}}>Recipe:</span>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            resize="none"
                            name="recipe"
                            value={cocktailData.recipe}
                            onChange={onInputChange}
                            minRows={3}
                            error={Boolean(error)}
                            style={{ width: "396px", height: "50px" ,resize: "none" }}
                        />
                    </Grid>

                    <span style={{marginLeft: "9px"}}>Image:</span>
                    <Grid item xs={12}>
                        <TextField
                            type="file"
                            name="image"
                            onChange={fileChangeHandler}
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
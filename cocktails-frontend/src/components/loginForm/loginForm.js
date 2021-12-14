import React from 'react';
import {Container, Grid, makeStyles, TextField} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import FacebookLogin from "../UI/FacebookLogin/FacebookLogin";

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
}));

const LoginForm = ({userData, submitFormHandler, loading, onInputChange, error}) => {
    const classes = useStyles();

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <h1>Sing In</h1>
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
                            type="email"
                            autoComplete="new-email"
                            label="Email"
                            name="email"
                            value={userData.email}
                            onChange={onInputChange}
                            error={Boolean(error)}
                            helperText={error?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            type="password"
                            autoComplete="new-password"
                            label="Password"
                            name="password"
                            value={userData.password}
                            onChange={onInputChange}
                            error={Boolean(error)}
                            helperText={error?.message}
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
                            Log In
                        </ButtonWithProgress>
                    </Grid>

                    <Grid item xs={12}>
                        <FacebookLogin/>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <NavLink to="/register">
                             or Sign up
                        </NavLink>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default LoginForm;
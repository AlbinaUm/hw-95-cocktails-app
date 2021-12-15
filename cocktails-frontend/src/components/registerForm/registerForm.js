import React from 'react';
import {Container, Grid, makeStyles} from "@material-ui/core";
import {NavLink} from "react-router-dom";
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
}));

const RegisterForm = () => {
    const classes = useStyles();

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <h1>Sing Up</h1>
                <Grid
                    container
                    className={classes.form}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <FacebookLogin action="Sing up"/>
                    </Grid>

                    <Grid item container justifyContent="flex-end">
                        <NavLink to="/login" style={{display: "inline-block",color: "black", margin:"20px 0"}}>
                            or Sign In
                        </NavLink>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
};

export default RegisterForm;
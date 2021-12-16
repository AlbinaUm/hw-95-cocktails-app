import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Box, Button, makeStyles, Menu, MenuItem} from "@material-ui/core";
import theme from "../../../../../theme";
import {logoutUserRequest} from "../../../../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import imageNotAvailable from "../../../../../assets/images/noimage.png";
import {apiURL} from "../../../../../config";

const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    containerBox: {
        padding: '8px',
        display: "flex",
        alignItems: "center"
    },
    childBox: {
        padding: '8px',
    },
    userButton: {
        fontSize: '16px',
        color: "inherit",
        fontWeight: 600
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    menu: {
      marginTop: '65px',
    },
    menuItem: {
        fontWeight: "bold",
        width: "250px",
        color: theme.palette.secondary.main,
        '&:hover': {
            background: theme.palette.secondary.main,
            color: 'white',
        },
    },
});

const UserMenu = ({user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const state = useSelector(state => state.users.user);
    const [anchorEl, setAnchorEl] = useState(null);

    const logOut = () => {
        dispatch(logoutUserRequest({...state}));
        Navigate('/login');
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let cardImage = imageNotAvailable;

    if (user.facebookId){
        cardImage = user.avatar;
    } else if (user.avatar) {
        cardImage = apiURL + '/' + user.avatar;
    }

    return (
      <>
          <Box className={classes.containerBox}>
              <Box className={classes.childBox}>
                  <Button
                      className={classes.userButton}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                  >
                      Hello, {user.displayName} !
                  </Button>
              </Box>
              <Box>
                  <Avatar className={classes.avatar}>
                      <img width="40px" height="40px" src={cardImage} alt={user.displayName} onClick={handleClick}/>
                  </Avatar>
              </Box>
          </Box>

          <Menu
              id="simple-menu"
              className={classes.menu}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
              <MenuItem
                  className={classes.menuItem}
                  component={Link}
                  to={`/myCocktails?user=${user._id}`}
              >
                  My cocktails
              </MenuItem>
              <MenuItem className={classes.menuItem} component={Link} to='/addNewCocktail'>Add new cocktail</MenuItem>
              <MenuItem className={classes.menuItem} onClick={logOut}>Logout</MenuItem>
          </Menu>
      </>
  );
};

export default UserMenu;
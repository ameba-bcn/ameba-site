import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import LoginForm from './login';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className="menuSuperior">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        AMEBA
          </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink className="menuOptions" to="/Activitats" style={{ textDecoration: 'none' }} >ACTIVITATS</NavLink>
                        <NavLink className="menuOptions" to="/Botiga" style={{ textDecoration: 'none' }}>BOTIGA</NavLink>
                        <NavLink className="menuOptions" to="/Article" style={{ textDecoration: 'none' }}>#SUPPORTYOURLOCALS</NavLink>                       
                    </Typography>
                    {/* <Button color="inherit">Login</Button> */}
                    <LoginForm />
                </Toolbar>
            </AppBar>
        </div>
    );
}
// <NavLink className="menuOptions" to="/Activitats" style={{ textDecoration: 'none' }} >ACTIVITATS</NavLink>
// <NavLink className="menuOptions" to="/Botiga" style={{ textDecoration: 'none' }}>BOTIGA</NavLink>
// <NavLink className="menuOptions" to="/Article" style={{ textDecoration: 'none' }}>#SUPPORTYOURLOCALS</NavLink>                       
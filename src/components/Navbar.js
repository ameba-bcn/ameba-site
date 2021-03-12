import React, { useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import LoginForm from './login';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch, connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import DropdownCart from './DropdownCart';
import './Navbar.scss';
import './DropdownCart.css';

const mapStateToProps = state => {
    return {
        cart: state.cart.cart_data
    };
};

function Navbar(props) {
    const [click, setClick] = useState(false)
    const [size, setSize] = useState(0);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickCart = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseCart = () => {
        setAnchorEl(null);
    };

    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        size > 1000 ? setClick(false) : setClick(click)
        return () => window.removeEventListener('resize', updateSize);
    }, [size, click]);


    const handleClick = () => {
        setClick(!click)
    }

    const closeMenu = () => {
        setClick(false)
    }

    const logoutMenu = () => {
        console.log("Logout, inicio del proceso")
        dispatch(logout())
    }

    return (
        <div className="menuContainer">
            <div className="menuSuperior">
                <div className="menuButton">
                    <NavLink to="/" data-item='AMEBA'>AMEBA</NavLink>
                </div>
                <div className="menuIcon" onClick={handleClick} >
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <div className="menuOptionsCollapsed">
                    <ul className={click ? "nav-ul.show" : "nav-ul"}>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/activitats" data-item='AGENDA'>AGENDA</NavLink></li>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/botiga" data-item='BOTIGA'>BOTIGA</NavLink></li>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/support" data-item='#SUPPORTYOURLOCALS'>#SUPPORTYOURLOCALS</NavLink></li>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            {!isLoggedIn ?
                                <NavLink className="menuOptions" id="MenuOptionsLogin" to="/login" data-item='LOGIN'>LOGIN</NavLink> :
                                <NavLink className="menuOptions" id="MenuOptionsLogin" to="/" data-item='LOGOUT' onClick={logoutMenu}>LOGOUT</NavLink>
                            }
                        </li>
                        {JSON.parse(localStorage.getItem("cart_items"))?.length > 0 ?
                            <li className="liMenuOptions" ><ShoppingCartIcon className="cartIconMenu" onClick={handleClickCart} />
                                {props.cart ? <div className="bubbleCart">{props.cart.count}</div> : null}
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    className="menuDropdownCart"
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseCart}>
                                    <div>
                                        <DropdownCart cartData={props} />
                                    </div>
                                </Menu>
                            </li>
                            : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Navbar);

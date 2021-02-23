import React, { useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import LoginForm from './login';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './Navbar.scss';
import './DropdownCart.css';

export default function Navbar() {
    const [click, setClick] = useState(false)
    const [size, setSize] = useState(0);
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector(state => state.auth);

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
        // console.log(size)
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
                        <li className="liMenuOptions" ><ShoppingCartIcon className="cartIconMenu" onClick={handleClickCart} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                className="menuDropdownCart"
                                open={Boolean(anchorEl)}
                                onClose={handleCloseCart}
                            >
                                <div className="totalCart">Total: <span>XXX€</span></div>
                                <hr className="separadorCartDrop"/>
                                <MenuItem onClick={handleCloseCart}  className="menuItemCart">
                                    <div className="rowCartProduct">
                                        <div className="colCartProduct1">
                                            <div className="addCart" onClick={()=> console.log("Adding to cart")}><AddIcon/></div>
                                            <div className="subsCart" onClick={()=> console.log("Subtracting from cart")}><RemoveIcon/></div>
                                        </div>
                                        <div className="colCartProduct2">
                                            <div className="titleCartProduct">Producte 1</div>
                                            <div className="rowDetailedCart">
                                                <div className="cartPriceProduct">XXX€</div>
                                                <div className="quantityPriceProduct">Qty: <span>XX</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </MenuItem>
                                <hr className="separadorCartDrop"/>
                                <MenuItem onClick={handleCloseCart}>Producte 2</MenuItem>
                                <div onClick={handleCloseCart} className="buttonCheckoutCart">Finalitzar compra</div>
                            </Menu>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
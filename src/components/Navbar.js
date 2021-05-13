import React, { useLayoutEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch, connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import DropdownCart from './../components/dropdowns/DropdownCart';
import './Navbar.scss';

const mapStateToProps = state => {
    return {
        cart: state.cart.cart_data
    };
};

function Navbar(props) {
    const [click, setClick] = useState(false)
    const [size, setSize] = useState(0);
    const dispatch = useDispatch();
    const { isLoggedIn, user_data } = useSelector(state => state.auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [redirect, setRedirect] = useState(false)
    const { cart = {} } = props;
    const { item_variants = [], count = 0 } = cart;
    
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        size > 1000 ? setClick(false) : setClick(click)
        return () => window.removeEventListener('resize', updateSize);
    }, [size, click]);
    
    const handleClickCart = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseCart = () => {
        setAnchorEl(null);
    };

    const handleClickSessio = (event) => {
        setAnchorEl1(event.currentTarget)
    }

    const handleCloseSessio = () => {
        setAnchorEl1(null);
    };


    const handleRedirect = () => {
        console.log("Entra")
        setAnchorEl(null);
        // setRedirect(true)
    }


    const handleClick = () => {
        setClick(!click)
    }

    const closeMenu = () => {
        setClick(false)
    }

    const logoutMenu = () => {
        dispatch(logout())
    }
    // if (redirect) return <Redirect to='/profile' />

    return (
        <div className="menuContainer">
            <div className="menuSuperior">
                <div className="menuButton">
                    <img src={process.env.PUBLIC_URL + '/NewLogo.png'} className="menuAmebalogo" alt="Ameba Logo" />
                    <NavLink to="/" data-item='AMEBA'>AMEBA</NavLink>
                </div>
                <div className="menuIcon" onClick={handleClick} >
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <div className="menuOptionsCollapsed">
                    <ul className={click ? "nav-ul.show" : "nav-ul"}>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/membership-registration" data-item='MEMBER'>MEMBER</NavLink></li>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/activitats" data-item='AGENDA'>AGENDA</NavLink></li>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/botiga" data-item='BOTIGA'>BOTIGA</NavLink></li>
                        <li className="liMenuOptions" onClick={closeMenu}>
                            <NavLink className="menuOptions" to="/support" data-item='#SUPPORTYOURLOCALS'>#SUPPORTYOURLOCALS</NavLink></li>
                        <div className="liMenuOptions logname-li" onClick={closeMenu}>
                            {!isLoggedIn ?
                                <NavLink className="menuOptions" id="MenuOptionsLogin" to="/login" data-item='LOGIN'>LOGIN</NavLink> :
                                <>
                                    <a className="sessio-menu-button" data-item={user_data.username === "" ? "SESSIÓ" : user_data.username}
                                        onClick={handleClickSessio} >{user_data.username === "" ? "SESSIÓ" : user_data.username}</a>
                                    {user_data.username === "" ? "SESSIÓ" : user_data.username}
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl1}
                                        keepMounted
                                        className="menuDropdownCart"
                                        disableAutoFocusItem
                                        open={Boolean(anchorEl1)}
                                        onClose={handleCloseSessio}>
                                        <div>
                                            <NavLink className="menuOptions" to="/profile">
                                                <div className="dropdown-profile" onClick={handleRedirect}>Perfil</div>
                                            </NavLink>
                                            <div className="dropdown-logout" onClick={logoutMenu}>Log out</div>
                                        </div>

                                    </Menu></>
                            }
                        </div>
                        {item_variants.length > 0 ?
                            <li className="liMenuOptions" ><ShoppingCartIcon className="cartIconMenu" onClick={handleClickCart} />
                                {cart ? <div className="bubbleCart">{count}</div> : null}
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    className="menuDropdownCart"
                                    disableAutoFocusItem
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseCart}>
                                    <div>
                                        <DropdownCart cartData={cart} closeDropDown={handleCloseCart} />
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
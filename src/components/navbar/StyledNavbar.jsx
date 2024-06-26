import styled from "styled-components";

export const StyledNavbar = styled.div`
  .menuSuperior {
    background-color: #1d1d1b !important;
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    justify-content: space-between;
    padding: 15px;
  }

  .menuButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .menuButton_mobile {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .menu-logo-box {
    justify-content: flex-start;
    align-items: center;
    display: flex;
  }

  .menuAmebalogo {
    width: 50px;
    height: 50px;
  }

  .cart-cistella {
    cursor: pointer;
    & a {
      color: #fae6c5 !important;
    }
  }

  .menu-logo-box a {
    font-family: "Bebas Neue";
    cursor: pointer;
    text-decoration: none;
    font-size: 2.5rem;
    font-weight: 400;
    display: inline-block;
    color: #fae6c5;
    position: relative;
    transition: all 0.5s ease-in-out;
  }

  .cartIconMenu,
  .sessio-menu-button {
    font-family: "Bebas Neue";
    cursor: pointer;
    text-decoration: none;
    font-size: 2.5rem;
    font-weight: 400;
    display: inline-block;
    color: #fae6c5;
    position: relative;
    transition: all 0.5s ease-in-out;
    &::before {
      content: attr(data-item);
      transition: 0.5s;
      color: #f2c571;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
    }
    &:hover {
      &::before {
        width: 100%;
        transition: all 0.5s ease-in-out;
      }
    }
  }

  .nav-ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    vertical-align: middle;
    margin: 0;
  }

  .nav-ul li {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
  }

  .logname-li {
    width: fit-content;
    display: flex;
    vertical-align: middle;
    padding-right: 0px;
    margin-right: 0px;
  }

  .logname-li-mobile {
    width: 100%;
    display: flex;
    vertical-align: middle;
    padding-right: 0px;
    margin-right: 0px;
    div {
      width: 100%;
    }
  }

  .menuButtons {
    justify-content: flex-end;
  }

  .nav-ul_box-mobile {
    flex: 1;
    flex-shrink: 0;
    width: 100%;
    animation: fade 0.3s 1;
    -webkit-animation: fade 0.3s 1;
  }

  .nav-ul_mobile {
    background-color: #1d1d1b;
    list-style-type: none;
    list-style: none;
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-bottom: 0;
    padding-bottom: 1em;
    padding-left: 2em;
    margin-block-start: 0px;
    div,
    li {
      justify-content: flex-start;
      a.active {
        color: #eb5e3e;
      }
      a {
        margin: 4px 0px;
        display: inline-block;
        font-family: "Bebas Neue";
        font-weight: lighter;
        font-size: 2.5rem;
        margin-right: 20px;
        font-weight: 400;
        text-decoration: none;
        color: #fae6c5;
        transition: all 0.5s ease-in-out;
        position: relative;
        text-transform: uppercase;
        &::before {
          content: attr(data-item);
          transition: 0.5s;
          color: #f2c571;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 10;
          width: 0;
          overflow: hidden;
        }
        &:hover {
          &::before {
            width: 100%;
            transition: all 0.5s ease-in-out;
          }
        }
      }
    }
  }

  .nav-ul {
    list-style: none;
    display: flex;
    div,
    li {
      a.active {
        color: #eb5e3e;
      }
      a {
        display: inline-block;
        font-family: "Bebas Neue";
        font-weight: lighter;
        font-size: 2.5rem;
        margin-right: 20px;
        font-weight: 400;
        text-decoration: none;
        color: #fae6c5;
        transition: all 0.5s ease-in-out;
        position: relative;
        text-transform: uppercase;
        &::before {
          content: attr(data-item);
          transition: 0.5s;
          color: #f2c571;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 10;
          width: 0;
          overflow: hidden;
        }
        &:hover {
          &::before {
            width: 100%;
            transition: all 0.5s ease-in-out;
          }
        }
      }
    }
  }

  .menu-lang {
    & li {
      cursor: pointer;
      & a {
        color: #fae6c5 !important;
      }
      & a:last-child {
        margin-left: -20px;
      }
    }
    & li > a.active {
      color: #ffed00 !important;
    }
  }

  .cartIconMenu {
    width: 2.2rem !important;
    height: auto !important;
    margin-left: 0px;
    margin-right: 5px;
    margin-bottom: 4px;
    cursor: pointer;
  }

  .cart-icon-bubble-box {
    margin-top: -18px;
  }

  .bubbleCart {
    color: #1d1d1b;
    position: relative;
    top: 5px;
    left: 25px;
    width: 18px;
    height: 18px;
    padding: 2px 1px 0px 1px;
    background-color: #f2c571;
    font-family: "Bebas Neue";
    font-weight: 600;
    font-size: 0.7em;
    border-radius: 50%;
  }

  .bubbleCartMember {
    color: #1d1d1b;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 18px;
    height: 18px;
    padding: 2px 5px 2px 6px;
    background-color: #f2c571;
    font-family: "Bebas Neue";
    font-weight: 600;
    font-size: 0.3em;
    border-radius: 50%;
    box-shadow: 1px 1px 1px gray;
  }

  .cart-mobile__box {
    background-color: #fae6c5;
    margin-left: -2em;
    animation: fade 0.5s 1;
    -webkit-animation: fade 0.5s 1;
  }

  .logBox {
    vertical-align: middle;
  }

  .menu-mobile-session-box {
    background-color: #fae6c5;
    width: 100vh;
    margin-left: -32px;
    padding-right: 32px;
    animation: fade 0.5s 1;
    -webkit-animation: fade 0.5s 1;
  }

  .menu-mobile-session {
    margin-left: 32px;
  }

  .dropdown-profile-mobile,
  .dropdown-logout-mobile {
    color: #1d1d1b;
    font-family: "Bebas Neue";
    font-size: 2.5rem;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
  }

  @media screen and (max-width: 350px) {
    .nav-ul_mobile {
      padding-left: 1.5em;
    }
  }
`;

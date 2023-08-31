import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  setGuestUser,
  setLoggedUser,
  setMember,
} from "./redux/actions/profile";
import {
  validateLocalToken,
  getUserData,
  getMemberProfile,
} from "./redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Activitats from "./pages/Activitats";
// import Botiga from "./pages/Botiga";
import Entrevista from "./components/supportyourlocals/Entrevista/Entrevista";
import SupportYourLocals from "./pages/SupportYourLocals";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "react-router-dom";
import Contacte from "./contacte/Contacte";
import Menu from "./components/navbar/Navbar";
import LogSession from "./pages/LogSession";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutFinished from "./pages/landing/CheckoutFinished";
import SubscriptionFinished from "./pages/landing/SubscriptionFinished";
import LogMailConfirmation from "./pages/LogMailConfirmation";
import PasswordRecovery from "./pages/PasswordRecovery";
import SendEmailPasswordRecovery from "./pages/SendEmailPasswordRecovery";
import ValidateEmail from "./pages/ValidateEmail";
import ScrollTop from "./components/layout/ScrollTop";
import { UserContext } from "./UserContext";
import {
  supportYourLocalsAll,
  agendaAll,
  botigaAll,
  getAbout,
  getCover,
  membershipAll
} from "./redux/actions/data";
import { getCart } from "./redux/actions/cart";
import Booking from "./pages/Booking";
import { deepComparision } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullscreenCheckout from "./fullscreenCheckout/FullscreenCheckout";
import ExternalEvents from "./pages/ExternalEvents";
import Memberships from "./pages/Memberships";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Projects";

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const auth = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.fullscreen);
  const { user_member_data = {} } = auth;

  const isNewMember = deepComparision(user_member_data, {});
  useEffect(() => {
    if (localStorage.getItem("refresh")) {
      const refresh = localStorage.getItem("refresh");
      dispatch(validateLocalToken(refresh))
        .then(() => {
          isNewMember ? dispatch(setLoggedUser()) : dispatch(setMember());
          dispatch(getUserData());
          dispatch(getMemberProfile());
        })
        .catch(dispatch(setGuestUser()));
    } else {
      dispatch(setGuestUser());
    }
    dispatch(supportYourLocalsAll());
    dispatch(agendaAll());
    dispatch(botigaAll());
    dispatch(membershipAll());
    dispatch(getAbout());
    dispatch(getCover());
    dispatch(getCart());
  }, [dispatch, isNewMember]);

  return (
    <div className="App">
      {isOpen && <FullscreenCheckout />}
      <Menu />
      <UserContext.Provider value={value}>
        <ScrollTop showBelow={250} />
        <Switch>
          <Route path="/activitats" component={Activitats} />
          {/* <Route path="/botiga" component={Botiga} /> */}
          <Route exact path="/support/:id" component={Entrevista} />
          <Route path="/support" component={SupportYourLocals} />
          <Route exact path="/booking/:id" component={Entrevista} />
          <Route path="/booking" component={Booking} />
          <Route path="/projects" component={Projects} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/login" component={LogSession} />
          <Route path="/recovery" component={PasswordRecovery} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/memberships" component={Memberships} />
          <Route path="/send-recovery" component={SendEmailPasswordRecovery} />
          <Route path="/validate-email" component={ValidateEmail} />
          <Route path="/activate" component={LogMailConfirmation} />
          <Route path="/product" component={ExternalEvents} />
          <Route path="/profile" component={Profile} />
          <Route path="/summary-checkout" component={CheckoutFinished} />
          <Route path="/subscribe" component={SubscriptionFinished} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
      <ToastContainer
        position="bottom-center"
        closeButton={false}
        closeOnClick
        draggable
        limit={1}
      />
      <Contacte />
    </div>
  );
}

export default App;

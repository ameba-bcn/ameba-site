import React, { useState, useMemo, useEffect, createContext } from "react";
import {
  setGuestUser,
  setLoggedUser,
  setMember,
} from "./store/actions/profile";
import {
  validateLocalToken,
  getUserData,
  getMemberProfile,
} from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
// import Botiga from "./pages/Botiga";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "react-router-dom";
import Contacte from "./contacte/Contacte";
import Menu from "./components/navbar/Navbar";
import LogSession from "./pages/LogSession";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutFinished from "./pages/landing/CheckoutFinished";
import SubscriptionFinished from "./pages/landing/SubscriptionFinished";
import LogMailConfirmation from "./pages/LogMailConfirmation";
import SendEmailPasswordRecovery from "./pages/SendEmailPasswordRecovery";
import ValidateEmail from "./pages/ValidateEmail";
import ScrollTop from "./components/layout/ScrollTop";
import {
  supportYourLocalsAll,
  agendaAll,
  botigaAll,
  getAbout,
  getCover,
  membershipAll,
  getCollaborators,
  getMemberProjects,
} from "./store/actions/data";
import { getCart } from "./store/actions/cart";
import { deepComparision } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullscreenCheckout from "./fullscreenCheckout/FullscreenCheckout";
import PasswordRecovery from "./pages/PasswordRecovery";
import QrClient from "./pages/QrClient";
import Agenda from "./pages/agenda/Agenda";
import { StyledApp } from "./App.style";
import LoadableHome from "./pages/home/LoadableHome";
import LoadableEntrevista from "./pages/support/components/Entrevista/LoadableEntrevista";
import LoadableSupportYourLocals from "./pages/support/LoadableSupportYourLocals";
import LoadableBooking from "./pages/booking/LoadableBooking";
import LoadableProjects from "./pages/projects/LoadableProjects";
import LoadableSociosDetailed from "./pages/socios/components/LoadableSociosDetailed";
import LoadableSocios from "./pages/socios/LoadableSocios";
import LoadableGallery from "./pages/gallery/LoadableGallery";
import LoadableMemberships from "./pages/memberships/LoadableMemberships";
import LoadableExternalEvents from "./pages/external-events/LoadableExternalEvents";
import LoadableProfile from "./pages/profile/LoadableProfile";

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const auth = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.fullscreen);
  const { user_member_data = {} } = auth;

  const isNewMember = deepComparision(user_member_data, {});
  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
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
    dispatch(getCollaborators());
    dispatch(getCart());
    dispatch(getMemberProjects());
  }, [dispatch, isNewMember]);

  return (
    <StyledApp>
      {isOpen && <FullscreenCheckout />}
      <Menu />
      <UserContext.Provider value={value}>
        <ScrollTop showBelow={250} />
        <Switch>
          <Route path="/activitats" component={Agenda} />
          {/* <Route path="/botiga" component={Botiga} /> */}
          <Route exact path="/support/:id" component={LoadableEntrevista} />
          <Route path="/support" component={LoadableSupportYourLocals} />
          <Route exact path="/booking/:id" component={LoadableEntrevista} />
          <Route path="/booking" component={LoadableBooking} />
          <Route path="/projects" component={LoadableProjects} />
          <Route exact path="/socis/:id" component={LoadableSociosDetailed} />
          <Route path="/socis" component={LoadableSocios} />
          <Route path="/gallery" component={LoadableGallery} />
          <Route path="/login" component={LogSession} />
          <Route path="/recovery" component={PasswordRecovery} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/memberships" component={LoadableMemberships} />
          <Route path="/send-recovery" component={SendEmailPasswordRecovery} />
          <Route path="/member-card" component={QrClient} />
          <Route path="/validate-email" component={ValidateEmail} />
          <Route path="/activate" component={LogMailConfirmation} />
          <Route path="/product" component={LoadableExternalEvents} />
          <Route path="/profile" component={LoadableProfile} />
          <Route path="/summary-checkout" component={CheckoutFinished} />
          <Route path="/subscribe" component={SubscriptionFinished} />
          <Route exact path="/" component={LoadableHome} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
      <ToastContainer position="bottom-center" />
      <Contacte />
    </StyledApp>
  );
}

export default App;

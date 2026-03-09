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
import Botiga from "./pages/Botiga";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
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
import "react-image-gallery/styles/image-gallery.css";
import FullscreenCheckout from "./fullscreenCheckout/FullscreenCheckout";
import PasswordRecovery from "./pages/PasswordRecovery";
import QrClient from "./pages/QrClient";
import Agenda from "./pages/agenda/Agenda";
import { StyledApp } from "./App.style";
import LoadableHome from "./pages/home/LoadableHome";
import LoadableEntrevista from "./pages/support/components/Entrevista/LoadableEntrevista";
import LoadableBooking from "./pages/booking/LoadableBooking";
import LoadableSociosDetailed from "./pages/socios/components/LoadableSociosDetailed";
import LoadableSocios from "./pages/socios/LoadableSocios";
import LoadableGallery from "./pages/gallery/LoadableGallery";
import LoadableMemberships from "./pages/memberships/LoadableMemberships";
import LoadableExternalEvents from "./pages/external-events/LoadableExternalEvents";
import LoadableProfile from "./pages/profile/LoadableProfile";
import LoadableLegal from "./pages/legal/LoadableLegal";
import QrLanding from "./pages/qr-landing/QrLanding";

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const { isOpen } = useSelector((state) => state.fullscreen);
  const { user_member_data = {} } = useSelector((state) => state.auth);

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
      <ToastContainer position="bottom-center" />
      {isOpen && <FullscreenCheckout />}
      <Menu />
      <UserContext.Provider value={value}>
        <ScrollTop showBelow={250} />
        <Routes>
          <Route path="/activitats" element={<Agenda />} />
          <Route path="/botiga" element={<Botiga />} />
          <Route path="/booking/:id" element={<LoadableEntrevista />} />
          <Route path="/booking" element={<LoadableBooking />} />
          <Route path="/socis/:id" element={<LoadableSociosDetailed />} />
          <Route path="/socis" element={<LoadableSocios />} />
          <Route path="/gallery" element={<LoadableGallery />} />
          <Route path="/login" element={<LogSession />} />
          <Route path="/recovery" element={<PasswordRecovery />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/memberships" element={<LoadableMemberships />} />
          <Route path="/send-recovery" element={<SendEmailPasswordRecovery />} />
          <Route path="/member-card" element={<QrClient />} />
          <Route path="/validate-email" element={<ValidateEmail />} />
          <Route path="/activate" element={<LogMailConfirmation />} />
          <Route path="/product" element={<LoadableExternalEvents />} />
          <Route path="/profile/:id" element={<LoadableProfile />} />
          <Route path="/profile" element={<LoadableProfile />} />
          <Route path="/summary-checkout" element={<CheckoutFinished />} />
          <Route path="/subscribe" element={<SubscriptionFinished />} />
          <Route path="/legal" element={<LoadableLegal />} />
          <Route path="/" element={<LoadableHome />} />
          <Route path="/qr-view" element={<QrLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
      <Contacte />
    </StyledApp>
  );
}

export default App;

import React, { useState, useMemo, useEffect, createContext } from "react";
import useUIStore from "./stores/useUIStore";
import useProfileStore from "./stores/useProfileStore";
import useAuthStore from "./stores/useAuthStore";
import useDataStore from "./stores/useDataStore";
import useCartStore from "./stores/useCartStore";
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
import { deepComparision } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/image-gallery.css";
import FullscreenCheckout from "./fullscreenCheckout/FullscreenCheckout";
import PasswordRecovery from "./pages/PasswordRecovery";
import QrClient from "./pages/QrClient";
import Agenda from "./pages/agenda/Agenda";
import "./App.css";
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
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const isFullscreenOpen = useUIStore((state) => state.isFullscreenOpen);
  const { user_member_data = {} } = useAuthStore();
  const validateLocalToken = useAuthStore((state) => state.validateLocalToken);
  const getUserData = useAuthStore((state) => state.getUserData);
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const setGuestUser = useProfileStore((state) => state.setGuestUser);
  const setLoggedUser = useProfileStore((state) => state.setLoggedUser);
  const setMember = useProfileStore((state) => state.setMember);
  const fetchSupport = useDataStore((state) => state.fetchSupport);
  const fetchAgenda = useDataStore((state) => state.fetchAgenda);
  const fetchBotiga = useDataStore((state) => state.fetchBotiga);
  const fetchMemberships = useDataStore((state) => state.fetchMemberships);
  const fetchAbout = useDataStore((state) => state.fetchAbout);
  const fetchCover = useDataStore((state) => state.fetchCover);
  const fetchCollaborators = useDataStore((state) => state.fetchCollaborators);
  const fetchMemberProjects = useDataStore((state) => state.fetchMemberProjects);
  const getCart = useCartStore((state) => state.getCart);

  const isNewMember = deepComparision(user_member_data, {});

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      validateLocalToken(refresh)
        .then(() => {
          isNewMember ? setLoggedUser() : setMember();
          getUserData();
          getMemberProfile();
        })
        .catch(setGuestUser());
    } else {
      setGuestUser();
    }
    fetchSupport();
    fetchAgenda();
    fetchBotiga();
    fetchMemberships();
    fetchAbout();
    fetchCover();
    fetchCollaborators();
    getCart();
    fetchMemberProjects();
  }, [isNewMember]);

  return (
    <div className="app">
      <ToastContainer position="bottom-center" />
      {isFullscreenOpen && <FullscreenCheckout />}
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
    </div>
  );
}

export default App;

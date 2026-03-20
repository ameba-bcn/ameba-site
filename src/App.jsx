import React, { useState, useMemo, useEffect, createContext } from "react";
import useUIStore from "./stores/useUIStore";
import useProfileStore from "./stores/useProfileStore";
import useAuthStore from "./stores/useAuthStore";
import useDataStore from "./stores/useDataStore";
import useCartStore from "./stores/useCartStore";
import { Routes, Route } from "react-router-dom";
import Contacte from "./contacte/Contacte";
import Menu from "./components/navbar/Navbar";
import ScrollTop from "./components/layout/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/image-gallery.css";
import FullscreenCheckout from "./fullscreenCheckout/FullscreenCheckout";
import "./App.css";
import HomeLoadable from "./pages/home/Home.loadable";
import AgendaLoadable from "./pages/agenda/Agenda.loadable";
import BotigaLoadable from "./pages/Botiga.loadable";
import SociosDetailedLoadable from "./pages/socios/components/SociosDetailed.loadable";
import SociosLoadable from "./pages/socios/Socios.loadable";
import GalleryLoadable from "./pages/gallery/Gallery.loadable";
import LogSessionLoadable from "./pages/LogSession.loadable";
import PasswordRecoveryLoadable from "./pages/PasswordRecovery.loadable";
import CheckoutPageLoadable from "./pages/CheckoutPage.loadable";
import MembershipsLoadable from "./pages/memberships/Memberships.loadable";
import SendEmailPasswordRecoveryLoadable from "./pages/SendEmailPasswordRecovery.loadable";
import QrClientLoadable from "./pages/QrClient.loadable";
import ValidateEmailLoadable from "./pages/ValidateEmail.loadable";
import LogMailConfirmationLoadable from "./pages/LogMailConfirmation.loadable";
import ExternalEventsLoadable from "./pages/external-events/ExternalEvents.loadable";
import ProfileLoadable from "./pages/profile/Profile.loadable";
import CheckoutFinishedLoadable from "./pages/landing/CheckoutFinished.loadable";
import SubscriptionFinishedLoadable from "./pages/landing/SubscriptionFinished.loadable";
import LegalLoadable from "./pages/legal/Legal.loadable";
import QrLandingLoadable from "./pages/qr-landing/QrLanding.loadable";
import NotFoundLoadable from "./pages/NotFound.loadable";

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const isFullscreenOpen = useUIStore((state) => state.isFullscreenOpen);
  const validateLocalToken = useAuthStore((state) => state.validateLocalToken);
  const getUserData = useAuthStore((state) => state.getUserData);
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const setGuestUser = useProfileStore((state) => state.setGuestUser);
  const setLoggedUser = useProfileStore((state) => state.setLoggedUser);
  const fetchSupport = useDataStore((state) => state.fetchSupport);
  const fetchAgenda = useDataStore((state) => state.fetchAgenda);
  const fetchBotiga = useDataStore((state) => state.fetchBotiga);
  const fetchMemberships = useDataStore((state) => state.fetchMemberships);
  const fetchAbout = useDataStore((state) => state.fetchAbout);
  const fetchCover = useDataStore((state) => state.fetchCover);
  const fetchCollaborators = useDataStore((state) => state.fetchCollaborators);
  const fetchMemberProjects = useDataStore(
    (state) => state.fetchMemberProjects,
  );
  const getCart = useCartStore((state) => state.getCart);

  useEffect(() => {
    const version = import.meta.env.VITE_VERSION || "dev";
    const commit = import.meta.env.VITE_COMMIT_SHA || "local";
    console.log(
      `%c Ameba v${version} | commit: ${commit} `,
      "background:#222;color:#bada55;font-weight:bold;",
    );

    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      validateLocalToken(refresh)
        .then(() => {
          setLoggedUser();
          getUserData().then((data) => {
            if (data?.member) {
              getMemberProfile();
            }
          });
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
  }, []);

  return (
    <div className="app">
      <ToastContainer position="bottom-center" />
      {isFullscreenOpen && <FullscreenCheckout />}
      <Menu />
      <UserContext.Provider value={value}>
        <div className="app-main-view">
          <ScrollTop showBelow={250} />
          <Routes>
            <Route path="/activitats" element={<AgendaLoadable />} />
            <Route path="/botiga" element={<BotigaLoadable />} />
            <Route path="/socis/:id" element={<SociosDetailedLoadable />} />
            <Route path="/socis" element={<SociosLoadable />} />
            <Route path="/gallery" element={<GalleryLoadable />} />
            <Route path="/login" element={<LogSessionLoadable />} />
            <Route path="/recovery" element={<PasswordRecoveryLoadable />} />
            <Route path="/checkout" element={<CheckoutPageLoadable />} />
            <Route path="/memberships" element={<MembershipsLoadable />} />
            <Route
              path="/send-recovery"
              element={<SendEmailPasswordRecoveryLoadable />}
            />
            <Route path="/member-card" element={<QrClientLoadable />} />
            <Route path="/validate-email" element={<ValidateEmailLoadable />} />
            <Route path="/activate" element={<LogMailConfirmationLoadable />} />
            <Route path="/product" element={<ExternalEventsLoadable />} />
            <Route path="/profile/:id" element={<ProfileLoadable />} />
            <Route path="/profile" element={<ProfileLoadable />} />
            <Route
              path="/summary-checkout"
              element={<CheckoutFinishedLoadable />}
            />
            <Route
              path="/subscribe"
              element={<SubscriptionFinishedLoadable />}
            />
            <Route path="/legal" element={<LegalLoadable />} />
            <Route path="/" element={<HomeLoadable />} />
            <Route path="/qr-view" element={<QrLandingLoadable />} />
            <Route path="*" element={<NotFoundLoadable />} />
          </Routes>
        </div>
      </UserContext.Provider>
      <Contacte />
    </div>
  );
}

export default App;

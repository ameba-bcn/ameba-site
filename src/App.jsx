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
import LoadableHome from "./pages/home/LoadableHome";
import LoadableAgenda from "./pages/agenda/LoadableAgenda";
import LoadableBotiga from "./pages/LoadableBotiga";
import LoadableSociosDetailed from "./pages/socios/components/LoadableSociosDetailed";
import LoadableSocios from "./pages/socios/LoadableSocios";
import LoadableGallery from "./pages/gallery/LoadableGallery";
import LoadableLogSession from "./pages/LoadableLogSession";
import LoadablePasswordRecovery from "./pages/LoadablePasswordRecovery";
import LoadableCheckoutPage from "./pages/LoadableCheckoutPage";
import LoadableMemberships from "./pages/memberships/LoadableMemberships";
import LoadableSendEmailPasswordRecovery from "./pages/LoadableSendEmailPasswordRecovery";
import LoadableQrClient from "./pages/LoadableQrClient";
import LoadableValidateEmail from "./pages/LoadableValidateEmail";
import LoadableLogMailConfirmation from "./pages/LoadableLogMailConfirmation";
import LoadableExternalEvents from "./pages/external-events/LoadableExternalEvents";
import LoadableProfile from "./pages/profile/LoadableProfile";
import LoadableCheckoutFinished from "./pages/landing/LoadableCheckoutFinished";
import LoadableSubscriptionFinished from "./pages/landing/LoadableSubscriptionFinished";
import LoadableLegal from "./pages/legal/LoadableLegal";
import LoadableQrLanding from "./pages/qr-landing/LoadableQrLanding";
import LoadableNotFound from "./pages/LoadableNotFound";

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
            <Route path="/activitats" element={<LoadableAgenda />} />
            <Route path="/botiga" element={<LoadableBotiga />} />
            <Route path="/socis/:id" element={<LoadableSociosDetailed />} />
            <Route path="/socis" element={<LoadableSocios />} />
            <Route path="/gallery" element={<LoadableGallery />} />
            <Route path="/login" element={<LoadableLogSession />} />
            <Route path="/recovery" element={<LoadablePasswordRecovery />} />
            <Route path="/checkout" element={<LoadableCheckoutPage />} />
            <Route path="/memberships" element={<LoadableMemberships />} />
            <Route
              path="/send-recovery"
              element={<LoadableSendEmailPasswordRecovery />}
            />
            <Route path="/member-card" element={<LoadableQrClient />} />
            <Route path="/validate-email" element={<LoadableValidateEmail />} />
            <Route path="/activate" element={<LoadableLogMailConfirmation />} />
            <Route path="/product" element={<LoadableExternalEvents />} />
            <Route path="/profile/:id" element={<LoadableProfile />} />
            <Route path="/profile" element={<LoadableProfile />} />
            <Route
              path="/summary-checkout"
              element={<LoadableCheckoutFinished />}
            />
            <Route
              path="/subscribe"
              element={<LoadableSubscriptionFinished />}
            />
            <Route path="/legal" element={<LoadableLegal />} />
            <Route path="/" element={<LoadableHome />} />
            <Route path="/qr-view" element={<LoadableQrLanding />} />
            <Route path="*" element={<LoadableNotFound />} />
          </Routes>
        </div>
      </UserContext.Provider>
      <Contacte />
    </div>
  );
}

export default App;

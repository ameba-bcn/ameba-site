import React, {
  Suspense,
  useState,
  useMemo,
  useEffect,
  createContext,
} from "react";
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

import FullscreenSpinner from "./components/spinner/FullscreenSpinner";
import NavigationProgress from "./components/spinner/NavigationProgress";
import lazyWithRetry from "./utils/lazyWithRetry";
import "./App.css";

const Home = lazyWithRetry(() => import("./pages/home/Home"));
const Agenda = lazyWithRetry(() => import("./pages/agenda/Agenda"));
const Botiga = lazyWithRetry(() => import("./pages/Botiga"));
const SociosDetailed = lazyWithRetry(
  () => import("./pages/socios/components/SociosDetailed"),
);
const Socios = lazyWithRetry(() => import("./pages/socios/Socios"));
const Gallery = lazyWithRetry(() => import("./pages/gallery/Gallery"));
const GalleryAlbum = lazyWithRetry(
  () => import("./pages/gallery/GalleryAlbum"),
);
const LogSession = lazyWithRetry(() => import("./pages/LogSession"));
const PasswordRecovery = lazyWithRetry(
  () => import("./pages/PasswordRecovery"),
);
const CheckoutPage = lazyWithRetry(() => import("./pages/CheckoutPage"));
const Memberships = lazyWithRetry(
  () => import("./pages/memberships/Memberships"),
);
const SendEmailPasswordRecovery = lazyWithRetry(
  () => import("./pages/SendEmailPasswordRecovery"),
);
const QrClient = lazyWithRetry(() => import("./pages/QrClient"));
const ValidateEmail = lazyWithRetry(() => import("./pages/ValidateEmail"));
const LogMailConfirmation = lazyWithRetry(
  () => import("./pages/LogMailConfirmation"),
);
const ActivitatPage = lazyWithRetry(
  () => import("./pages/activitat/ActivitatPage"),
);
const ProductePage = lazyWithRetry(() => import("./pages/botiga/ProductePage"));
const ProductRedirect = lazyWithRetry(() => import("./pages/ProductRedirect"));
const Profile = lazyWithRetry(() => import("./pages/profile/Profile"));
const CheckoutFinished = lazyWithRetry(
  () => import("./pages/landing/CheckoutFinished"),
);
const SubscriptionFinished = lazyWithRetry(
  () => import("./pages/landing/SubscriptionFinished"),
);
const Legal = lazyWithRetry(() => import("./pages/legal/Legal"));
const QrLanding = lazyWithRetry(() => import("./pages/qr-landing/QrLanding"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const isNavigating = useUIStore((state) => state.isNavigating);
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

      <Menu />
      <UserContext.Provider value={value}>
        <div className="app-main-view">
          <ScrollTop showBelow={250} />
          <NavigationProgress />
          {isNavigating && <FullscreenSpinner />}
          <Suspense fallback={<FullscreenSpinner />}>
            <Routes>
              <Route path="/activitats/:id" element={<ActivitatPage />} />
              <Route path="/activitats" element={<Agenda />} />
              <Route path="/botiga/:id" element={<ProductePage />} />
              <Route path="/botiga" element={<Botiga />} />
              <Route path="/socis/:id" element={<SociosDetailed />} />
              <Route path="/socis" element={<Socios />} />
              <Route path="/gallery/:slug/:year" element={<GalleryAlbum />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/login" element={<LogSession />} />
              <Route path="/recovery" element={<PasswordRecovery />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/memberships" element={<Memberships />} />
              <Route
                path="/send-recovery"
                element={<SendEmailPasswordRecovery />}
              />
              <Route path="/member-card" element={<QrClient />} />
              <Route path="/validate-email" element={<ValidateEmail />} />
              <Route path="/activate" element={<LogMailConfirmation />} />
              <Route path="/product" element={<ProductRedirect />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/summary-checkout" element={<CheckoutFinished />} />
              <Route path="/subscribe" element={<SubscriptionFinished />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/" element={<Home />} />
              <Route path="/qr-view" element={<QrLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </UserContext.Provider>
      <Contacte />
    </div>
  );
}

export default App;

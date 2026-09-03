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
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/navbar/Navbar";
import ScrollTop from "./components/layout/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FullscreenSpinner from "./components/spinner/FullscreenSpinner";
import RouteFallback from "./components/spinner/RouteFallback";
import NavigationProgress from "./components/spinner/NavigationProgress";
import lazyWithRetry from "./utils/lazyWithRetry";
import "./App.css";

// Home se importa estática: es la landing, pesa ~4KB y así el hero
// se pinta en el primer render sin pasar por el spinner de Suspense
import Home from "./pages/home/Home";

const Botiga = lazyWithRetry(() => import("./pages/Botiga"));
const SociDetail = lazyWithRetry(() => import("./pages/socios/SociDetail"));
const SocisDirectory = lazyWithRetry(
  () => import("./pages/socios/SocisDirectory"),
);
const LogSession = lazyWithRetry(() => import("./pages/LogSession"));
const RecoveryReset = lazyWithRetry(
  () => import("./pages/recovery/RecoveryReset"),
);
const CheckoutPage = lazyWithRetry(() => import("./pages/CheckoutPage"));
const NouSoci = lazyWithRetry(() => import("./pages/nou-soci/NouSoci"));
const RecoveryRequest = lazyWithRetry(
  () => import("./pages/recovery/RecoveryRequest"),
);
const QrClient = lazyWithRetry(() => import("./pages/QrClient"));
const ActivateAccount = lazyWithRetry(
  () => import("./pages/activate/ActivateAccount"),
);
const LabDetail = lazyWithRetry(() => import("./pages/lab/LabDetail"));
const ProductePage = lazyWithRetry(() => import("./pages/botiga/ProductePage"));
const ProductRedirect = lazyWithRetry(() => import("./pages/ProductRedirect"));
const Compte = lazyWithRetry(() => import("./pages/compte/Compte"));
const CheckoutFinished = lazyWithRetry(
  () => import("./pages/landing/CheckoutFinished"),
);
const SubscriptionFinished = lazyWithRetry(
  () => import("./pages/landing/SubscriptionFinished"),
);
const Legal = lazyWithRetry(() => import("./pages/legal/Legal"));
const Lab = lazyWithRetry(() => import("./pages/lab/Lab"));
const Festivals = lazyWithRetry(() => import("./pages/festivals/Festivals"));
const FestivalDetail = lazyWithRetry(
  () => import("./pages/festivals/FestivalDetail"),
);
const GalleryArxiu = lazyWithRetry(() => import("./pages/festivals/GalleryArxiu"));
const GalleryArxiuAlbum = lazyWithRetry(
  () => import("./pages/festivals/GalleryArxiuAlbum"),
);
const Associacio = lazyWithRetry(() => import("./pages/associacio/Associacio"));
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
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/botiga/:id" element={<ProductePage />} />
              <Route path="/botiga" element={<Botiga />} />
              <Route path="/associacio/socis/:id" element={<SociDetail />} />
              <Route path="/associacio/socis" element={<SocisDirectory />} />
              <Route path="/inicia-sessio" element={<LogSession />} />
              <Route path="/registre" element={<LogSession />} />
              <Route path="/recovery" element={<RecoveryReset />} />
              <Route path="/pagament" element={<CheckoutPage />} />
              <Route path="/associacio/nou-soci" element={<NouSoci />} />
              <Route path="/recupera-contrasenya" element={<RecoveryRequest />} />
              <Route path="/member-card" element={<QrClient />} />
              <Route path="/activate" element={<ActivateAccount />} />
              <Route path="/product" element={<ProductRedirect />} />
              <Route path="/compte/:id" element={<Compte />} />
              <Route path="/compte" element={<Compte />} />
              <Route path="/resum-comanda" element={<CheckoutFinished />} />
              <Route path="/subscribe" element={<SubscriptionFinished />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/lab/:id" element={<LabDetail />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/festivals/arxiu/:slug/:year" element={<GalleryArxiuAlbum />} />
              <Route path="/festivals/arxiu" element={<GalleryArxiu />} />
              <Route path="/festivals/:id" element={<FestivalDetail />} />
              <Route path="/festivals" element={<Festivals />} />
              <Route path="/associacio" element={<Associacio />} />
              <Route path="/" element={<Home />} />
              <Route path="/qr-view" element={<QrLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </UserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;

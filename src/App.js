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
import Botiga from "./pages/Botiga";
import Entrevista from "./components/supportyourlocals/Entrevista";
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
} from "./redux/actions/data";
import { getCart } from "./redux/actions/cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Booking from "./pages/Booking";
import { deepComparision } from "./utils/utils";

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const promise = loadStripe(
    "pk_test_51IGkXjHRg08Ncmk7fPlbb9DfTF5f7ckXBKiR4g01euLgXs04CqmgBPOQuqQfOhc6aj9mzsYE1oiQ3TFjHH9Hv3Mj00GNyG9sep"
  );
  const auth = useSelector((state) => state.auth);

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
    dispatch(getAbout());
    dispatch(getCover());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className="App">
      <Elements stripe={promise}>
        <Menu />
        <UserContext.Provider value={value}>
          <ScrollTop showBelow={250} />
          <Switch>
            <Route path="/activitats" component={Activitats} />
            <Route path="/botiga" component={Botiga} />
            <Route exact path="/support/:id" component={Entrevista} />
            <Route path="/support" component={SupportYourLocals} />
            <Route exact path="/booking/:id" component={Entrevista} />
            <Route path="/booking" component={Booking} />
            <Route path="/login" component={LogSession} />
            <Route path="/recovery" component={PasswordRecovery} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route
              path="/send-recovery"
              component={SendEmailPasswordRecovery}
            />
            <Route path="/validate-email" component={ValidateEmail} />
            <Route path="/activate" component={LogMailConfirmation} />
            <Route path="/profile" component={Profile} />
            <Route path="/summary-checkout" component={CheckoutFinished} />
            <Route path="/subscribe" component={SubscriptionFinished} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </UserContext.Provider>
        <Contacte />
      </Elements>
    </div>
  );
}

export default App;

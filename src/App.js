import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { setGuestUser, setLoggedUser } from './redux/actions/state';
import { useDispatch } from "react-redux";
// import { connect } from "react-redux";
import Home from './pages/Home';
import Activitats from './pages/Activitats';
import Botiga from './pages/Botiga';
import Entrevista from './components/supportyourlocals/Entrevista';
import SupportYourLocals from './pages/SupportYourLocals';
import Sessio from './sessio/SessioGeneral';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import Contacte from './contacte/Contacte';
import Menu from './components/Navbar'
import LogSession from './pages/LogSession';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import MemberRegistration from './pages/MemberRegistration';
import CheckoutFinished from './pages/landing/CheckoutFinished';
import SubscriptionFinished from './pages/landing/SubscriptionFinished';
import LogMailConfirmation from './pages/LogMailConfirmation';
import PasswordRecovery from './pages/PasswordRecovery';
import SendEmailPasswordRecovery from './pages/SendEmailPasswordRecovery';
import ValidateEmail from './pages/ValidateEmail';
import Register from './redux/components/Register';
import { UserContext } from './UserContext';
import {
  supportYourLocalsAll,
  agendaAll,
  botigaAll,
} from './redux/actions/data';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      dispatch(setLoggedUser())
      console.log("Has local user", JSON.parse(localStorage.getItem("user")))
    }
    else {
      dispatch(setGuestUser());
      console.log("Has local user", JSON.parse(localStorage.getItem("user")))

    }
    console.log("Collect data on main resources")
    dispatch(supportYourLocalsAll());
    dispatch(agendaAll());
    dispatch(botigaAll());
  }, [dispatch]);

  return (
    <div className="App">
      <Menu />
      {/* Switch evita que mas de un componente se renderice a la vez */}
      <UserContext.Provider value={value}>
        <Switch>
          <Route path='/activitats' component={Activitats} />
          <Route path='/botiga' component={Botiga} />
          <Route exact path='/support/:id' component={Entrevista} />
          <Route path='/support' component={SupportYourLocals} />
          <Route path='/sessio' component={Sessio} />
          <Route path='/login' component={LogSession} />
          <Route path='/membership-registration' component={MemberRegistration} />
          <Route path='/recovery' component={PasswordRecovery} />
          <Route path='/send-recovery' component={SendEmailPasswordRecovery} />
          <Route path='/validate-email' component={ValidateEmail} />
          <Route path='/registration' component={Register} />
          <Route path='/activate' component={LogMailConfirmation} />
          <Route path='/profile' component={Profile} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/summary-checkout' component={CheckoutFinished} />
          <Route path='/????' component={SubscriptionFinished} />
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
      <Contacte />
    </div>
  );
}

export default App;
import React, { useState, useMemo } from 'react';
import './App.css';
import Home from './pages/Home';
import Activitats from './pages/Activitats';
import Botiga from './pages/Botiga';
import Entrevista from './components/supportyourlocals/Entrevista';
// import Articles from './components/forms/Article';
import SupportYourLocals from './pages/SupportYourLocals';
import Sessio from './sessio/SessioGeneral';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';
import Contacte from './contacte/Contacte';
import Menu from './components/Navbar'
import LogSession from './pages/LogSession';
import Register from './pages/Register';
import PasswordRecovery from './pages/PasswordRecovery';
import LogMailConfirmation from './pages/LogMailConfirmation';
import { UserContext } from './UserContext';

// class App extends Component {
//   render() {

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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
          <Route path='/registration' component={Register} />
          <Route path='/recovery-account' component={PasswordRecovery} />
          <Route path='/logconf' component={LogMailConfirmation} />
          <Route exact path='/' component={Home} />

          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
      <Contacte />
    </div>
  );
}
// }

export default App;
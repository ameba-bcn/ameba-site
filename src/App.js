import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import Activitats from './pages/Activitats';
import Botiga from './pages/Botiga';
import Entrevista from './components/supportyourlocals/Entrevista';
// import Articles from './components/forms/Article';
import SupportYourLocals from './pages/SupportYourLocals';
import Sessio from './sessio/SessioGeneral';
import NotFound from './pages/NotFound';
import { Switch, Route} from 'react-router-dom';
import Contacte from './contacte/Contacte';
import Menu from './components/Navbar'
import Login from './pages/Login';
// import Logout from './pages/Logout';
import LogMailConfirmation from './pages/LogMailConfirmation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu/>
        {/* Switch evita que mas de un componente se renderice a la vez */}
          <Switch>  
            <Route path='/activitats' component={Activitats} />
            <Route path='/botiga' component={Botiga} />
            <Route exact path='/support/:id' component={ Entrevista } />
            <Route path='/support' component={ SupportYourLocals } />
            <Route path='/sessio' component={ Sessio } />
            <Route path='/login' component={ Login } />
            {/* <Route path='/logout' component={ Logout } /> */}
            <Route path='/logconf' component={ LogMailConfirmation } />
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
          <Contacte/>
      </div>
    );
  }
}

export default App;
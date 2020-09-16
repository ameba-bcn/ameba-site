import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import Activitats from './pages/Activitats';
import Botiga from './pages/Botiga';
import Entrevista from './components/supportyourlocals/entrevista';
// import Articles from './components/forms/Article';
import SupportYourLocals from './pages/SupportYourLocals';
import Sessio from './sessio/sessioGeneral';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch> 
            <Route path='/ameba-site/Activitats' component={Activitats} />
            <Route path='/ameba-site/Botiga' component={Botiga} />
            <Route exact path='/ameba-site/Support/Entrevista?=:id' component={ Entrevista } />
            <Route path='/ameba-site/Support' component={ SupportYourLocals } />
            <Route path='/ameba-site/Sessio' component={ Sessio } />
            <Route exact path='/ameba-site/' component={Home} />
            <Route component={NotFound} />
          </Switch>
      </div>
    );
  }
}

export default App;
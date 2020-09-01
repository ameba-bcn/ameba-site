import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import Activitats from './pages/Activitats';
import Botiga from './pages/Botiga';
import Articles from './components/forms/Article';
import Sessio from './sessio/sessioGeneral';
import NotFound from './pages/NotFound';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch> 
            <Route path='/Activitats' component={Activitats} />
            <Route path='/Botiga' component={Botiga} />
            <Route path='/Article' component={ Articles } />
            <Route path='/Sessio' component={ Sessio } />
            <Route path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
      </div>
    );
  }
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './scrollToTop';
import { Provider } from 'react-redux';
import store from './store';

WebFont.load({
  google: {
    families: ['Montserrat:300,400,700,900', 'sans-serif']
  }
});

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <ScrollToTop>
        {/* <React.StrictMode> */}

          <App />

        {/* </React.StrictMode> */}
      </ScrollToTop>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/navbar.css';
import './style/button.css';
import './style/card.css';
import './style/responsive.css';
import './style/table.css';
import './style/form.css';
import './style/image.css';
import './style/alert.css';
import './style/loading.css';
import './style/checkout.css';
import './style/list.css';
import './style/font.css';
import './style/container.css';
import './style/Filter.css';
import './style/scrollbar.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store.js'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode></Provider>
  ,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

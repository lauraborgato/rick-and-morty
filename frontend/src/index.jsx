import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { BrowserRouter} from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';


import { store } from './components/store/store';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();

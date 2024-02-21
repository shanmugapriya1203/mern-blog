// index.js or wherever you initialize your app

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store, persistor } from './redux/store.js'; // Import both store and persistor
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    
    </Provider>
  </PersistGate>
);

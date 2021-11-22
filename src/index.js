import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseApp from "./firebase";


console.log(FirebaseApp)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


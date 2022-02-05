import React from 'react';
import ReactDOM from 'react-dom';

import './styles/normalize.css'
import './styles/index.css';

import SimonGame from './components/SimonGame';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimonGame bgColor='#141622' />
  </React.StrictMode>
)
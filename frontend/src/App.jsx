import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './components/components.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import EventCard from './components/EventCard';

export default App;

// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import './App.css';
// import logo from './logo.svg';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/Draft" component={Draft} />
    </div>
  </Router>
);

export default App;
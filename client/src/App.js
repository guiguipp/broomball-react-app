
import React from 'react';
// React router
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import Player from "./pages/Player";
// Redux 
import { Provider } from 'react-redux'
import store from "./js/store"

import './App.css';


const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Draft" component={Draft} />
        <Route path="/Player" component={Player} />
      </div>
    </Router>
  </Provider>

);

export default App;
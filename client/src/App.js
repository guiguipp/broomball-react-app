
import React from 'react';
// React router
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import Player from "./pages/Player";
import Stats from "./pages/Stats";
import './App.css';

// Redux 
import { Provider } from 'react-redux'
import store from "./js/store"
// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faChevronUp, faChevronDown, faMinusCircle, faTimesCircle, faArrowCircleLeft, faAngleRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp, faChevronDown, faMinusCircle, faTimesCircle, faArrowAltCircleRight, faArrowCircleLeft, faAngleRight, faPlusCircle, faMinusCircle)



const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Draft" component={Draft} />
        <Route path="/Player" component={Player} />
        <Route path="/Stats" component={Stats} />
      </div>
    </Router>
  </Provider>

);

export default App;
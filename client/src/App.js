
import React from 'react';
// React router
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import Player from "./pages/Player";
import Stats from "./pages/Stats";
import Records from "./pages/Records";
import './App.css';

// Redux 
import { Provider } from 'react-redux'
import store from "./js/store"
// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { 
  faChevronUp, 
  faChevronDown, 
  faMinusCircle, 
  faTimesCircle, 
  faArrowCircleLeft, 
  faAngleRight, 
  faPlusCircle, 
  faTimes, 
  faPlus, 
  faCaretDown, 
  faCaretRight, 
  faLongArrowAltUp, 
  faLongArrowAltDown, 
  faCircle,
  faLock,
  faUnlockAlt
  } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp, faChevronDown, faMinusCircle, faTimesCircle, faArrowAltCircleRight, faArrowCircleLeft, faAngleRight, faPlusCircle, faMinusCircle, faTimes, faPlus, faCaretDown, faCaretRight, faLongArrowAltUp, faLongArrowAltDown, faCircle, faLock, faUnlockAlt)



const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Draft" component={Draft} />
          <Route path="/Player" component={Player} />
          <Route path="/Stats" component={Stats} />
          <Route path="/Records" component={Records} />
          <Route path="/*" component={Home} />
        </Switch>
      </div>
    </Router>
  </Provider>

);

export default App;

import React from 'react';
// React router
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// const Home = React.lazy(() => import("./pages/Home"));
import Home from "./pages/HomePage.js";
import Draft from "./pages/DraftPage.js";
import Player from "./pages/PlayerPage.js";
import Stats from "./pages/StatsPage.js";
import Records from "./pages/RecordsPage.js";
import Login from "./pages/LoginPage.js";
import './styles/css/App.css';

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
  faUnlockAlt,
  // faSquare,
  faCheckSquare
  } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp, faChevronDown, faMinusCircle, faTimesCircle, faArrowAltCircleRight, faArrowCircleLeft, faAngleRight, faPlusCircle, faMinusCircle, faTimes, faPlus, faCaretDown, faCaretRight, faLongArrowAltUp, faLongArrowAltDown, faCircle, faLock, faUnlockAlt, /* faSquare,*/ faCheckSquare)
// const Records = React.lazy(() => import('./pages/Records'));

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={Home} />
          <Route path="/Draft" component={Draft} />
          <Route path="/Player" component={Player} />
          <Route path="/Stats" component={Stats} />
          <Route path="/Records" component={Records} />
          {/* <Route path="/Records" render={() => (<Suspense fallback={<div>Loading...</div>}> <Records /></Suspense>)}/> */}
          <Route path="/Login" component={Login} />
          <Route path="*" component={Home} />
        </Switch>
      </div>
    </Router>
  </Provider>

);

export default App;
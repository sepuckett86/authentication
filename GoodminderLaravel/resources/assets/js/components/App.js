import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../../css/App.css';

import Navbar from './Navbar';
import About from './About';
import Intro from './Intro';
import Examples from './Examples';
import Settings from './Settings';
import LogIn from './auth/LogIn';
import SignUp from './auth/SignUp';
import LogOutCheck from './auth/LogOutCheck';
import Contact from './Contact';
import Faq from './Faq';
import Legal from './Legal';
import Reset from './auth/Reset';
import ResetBegin from './auth/ResetBegin';
import Home from './Home';

class App extends Component {
  render() {
    return(
      <div className='App'>
        <Navbar />
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/intro" component={Intro} />
          <Route path="/examples" component={Examples} />
          <Route path="/settings" component={Settings} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/reset" component={Reset} />
          <Route path="/resetbegin" component={ResetBegin} />
          <Route path="/logout" component={LogOutCheck} />
          <Route path="/contact" component={Contact} />
          <Route path="/legal" component={Legal} />
          <Route path="/faq" component={Faq} />
        </div>
      </div>
    );
  }
}
export default App;

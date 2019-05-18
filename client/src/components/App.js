import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import React from 'react';
import React, { useEffect } from 'react';
import VideoPage from '../components/pages/VideoPage';
import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Alert from '../components/layout/Alert';
// redux 
import { Provider } from 'react-redux';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect (() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>

   
      <Router>
      
          <Navbar />
          <Landing />
          <section className='ui container'>
            <Alert />
            <Switch>
               {/* pages go here */}
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/Video' component={VideoPage} />
            </Switch>
          </section>
       
      </Router>
    </Provider>
  ) 
}

export default App;
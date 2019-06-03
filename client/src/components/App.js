import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import React from 'react';
import React, { useEffect } from 'react';
import VideoPage from '../components/pages/VideoPage';
import Navbar from '../components/layout/Navbar';
import Landing from '../components/layout/Landing';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Alert from '../components/layout/Alert';
import Profile from "./pages/Profile";
import MyArt from "../components/pages/MyArt";
import ArtTips from "../components/pages/ArtTips";
import Footer from '../components/Footer';
//import Wrapper from "./components/Wrapper";
// redux 
import { Provider } from 'react-redux';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>


      <Router>
        <div className="container">
          <Navbar />
        </div>
        <section className='container'>

          <Alert />
          <Switch>
            {/* pages go here */}
            <Route exact path='/Video' component={VideoPage} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/myart" component={MyArt} />
            <Route exact path="/arttips" component={ArtTips} />
            <Route exact path="/landing" component={Landing} />

          </Switch>
        </section>
        <Footer />
      </Router>
      
    </Provider>
  )
}

export default App;
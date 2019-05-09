import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/Nav/NavTabs";
import Home from "./components/Nav/pages/Home";
import AboutUs from "./components/Nav/pages/AboutUs";
import MyArtwork from "./components/Nav/pages/MyArtwork";
import Shows from "./components/Nav/pages/Shows";

function App() {
  return (
    <Router>
      <div>
        <NavTabs />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/myartwork" component={MyArtwork} />
        <Route path="/shows" component={Shows} />
      </div>
    </Router>
  );
}

export default App;

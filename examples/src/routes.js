import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ComponentChunk from "react-chunkable";
import ComponentChunk from "./chunk";

const HomePage = props =>
  (<ComponentChunk
    componentProps={props}
    loadChunk={import(/*  webpackMode: "lazy",webpackChunkName: "home" */ "./pages/home")}
  />);

const ProfilePage = props =>
  (<ComponentChunk
    componentProps={props}
    loadChunk={import(/*  webpackMode: "lazy",webpackChunkName: "profile" */ "./pages/profile")}
  />);

class Routes extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={props => <HomePage {...props} />} />
          <Route path="/profile/:username" component={props => <ProfilePage {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;

import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";

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

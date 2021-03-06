import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ComponentChunk from "react-chunkable";

const getChunk = chunkName =>
  import(/*  webpackMode: "lazy", webpackChunkName: "[request]" */ `./pages/${chunkName}`);

const HomePage = props => <ComponentChunk componentProps={props} loadChunk={getChunk("home")} />;

const ProfilePage = props => (
  <ComponentChunk componentProps={props} loadChunk={getChunk("profile")} />
);

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

/* By Sean Larkinn */
// const getTheme = themeName => import(`./themes/${themeName}`);

// if (window.somethingTellsmeINeedThemeA) {
//   getTheme("a")
//     .then(module => module.default)
//     .then(() => {
//       doWhateverYouNeed;
//     });
// }

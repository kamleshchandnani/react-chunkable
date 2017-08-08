import React, { Component } from "react";
import Nav from "../components/common/nav";
import Profile from "../containers/Profile";
import RepoContainer from "../containers/Repositories";

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Profile {...this.props} />
        <RepoContainer {...this.props} />
      </div>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Repositories from "../../components/profile/repositories";
import { fetchRepos } from "./actions";
import "./sagas";

class RepositoriesContainer extends Component {
  /*
    Set initial state.
    Initilising with 5 placeholders
  */

  state = {
    repos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
  };
  componentDidMount() {
    this.props.fetchRepos(this.props.match.params.username);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reposData) {
      this.setState({ repos: nextProps.reposData });
    }
  }

  render() {
    /* Passes data to presentation component */
    return <Repositories {...this.state} />;
  }
}

RepositoriesContainer.propTypes = {
  reposData: PropTypes.array,
  fetchRepos: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};
RepositoriesContainer.defaultProps = {
  reposData: []
};
const mapStateToProps = ({ reposReducer }) => ({
  reposData: reposReducer.reposData
});
export default connect(mapStateToProps, { fetchRepos })(RepositoriesContainer);

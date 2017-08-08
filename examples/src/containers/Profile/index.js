import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "../../components/library/card";
import Link from "../../components/common/link";
import { fetchUser } from "./actions";
import "./sagas";
import Avatar from "../../components/profile/avatar";
import Description from "../../components/profile/description";

const Profile = styled(Card)`
  text-align: center;
  box-sizing: border-box;
  margin: 50px auto 0;
  width: 500px;
  min-height: 180px;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

class ProfileContainer extends Component {
  state = {
    userData: {
      photo: "",
      url: "",
      name: "",
      bio: ""
    }
  };
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.username);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.name) {
      this.setState({ userData: nextProps.userData });
    }
  }

  render() {
    const { photo, url, name, bio } = this.state.userData;
    return (
      <Profile>
        <Avatar url={photo} />
        <br />
        <Link url={url}>
          {name}
        </Link>
        <br />
        <Description content={bio || "NA"} />
      </Profile>
    );
  }
}
ProfileContainer.propTypes = {
  userData: PropTypes.object,
  fetchUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};
ProfileContainer.defaultProps = {
  userData: {
    photo: "",
    url: "",
    name: "",
    bio: ""
  }
};
const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer.userData
});
export default connect(mapStateToProps, { fetchUser })(ProfileContainer);

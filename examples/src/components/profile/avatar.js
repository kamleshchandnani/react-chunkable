import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Avatar = styled.span`
  display: inline-block;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 5px solid #eee;
  background-color: #eee;
  ${props => (props.src ? `background-image: url(${props.src})` : "")};
  background-size: cover;
`;

const AvatarComponent = props => <Avatar src={props.url} />;

AvatarComponent.propTypes = {
  url: PropTypes.string.isRequired
};
export default AvatarComponent;

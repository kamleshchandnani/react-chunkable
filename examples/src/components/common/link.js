import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import A from "../library/anchor";
import Blink from "../library/blink";

const Loading = styled(A)`
  background: #2CC1ED;
  width: 40%;
  height: 22px;
  margin-top: 10px;
  &::before {
    content: 'x';
  }
  animation: ${Blink} 2s linear infinite;
`;

const LinkComponent = (props) => {
  if (props.url) {
    return (
      <A href={props.url}>
        {props.children}
      </A>
    );
  }
  return <Loading />;
};

LinkComponent.propTypes = {
  url: PropTypes.string,
  children: PropTypes.string
};
LinkComponent.defaultProps = {
  url: "",
  children: ""
};
export default LinkComponent;

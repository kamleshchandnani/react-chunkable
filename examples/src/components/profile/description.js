import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Description = styled.div`
  color: #999;
  font-size: 12px;
`;

const DescriptionComponent = props =>
  (<Description>
    {props.content}
  </Description>);

DescriptionComponent.propTypes = {
  content: PropTypes.string.isRequired
};
export default DescriptionComponent;

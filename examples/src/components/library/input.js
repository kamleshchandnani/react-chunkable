import styled from "styled-components";

const Input = styled.input`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 10px;
  width: calc(100% - 20px);
  outline: none;
  font-size: 16px;

  &:hover,
  &:focus {
    border-color: #2cc1ed;
  }
`;

export default Input;

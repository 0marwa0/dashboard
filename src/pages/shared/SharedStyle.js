import React from "react";
import { Button, Input } from "antd";
import styled from "styled-components";
const { TextArea } = Input;
export const CustomInput = styled(Input)`
  border-radius: ${(props) => (props.search ? "7px 7px 0 0" : "7px")};
  border: 1px solid #e1e4e8;
  border-bottom: ${(props) => (props.search ? "none" : "1px solid #e1e4e8")};
  color: ${(props) => (props.gray ? " var(--darkGray)" : "black")};
  background-color: ${(props) => (props.gray ? "var(--lighterGray)" : "white")};
`;
export const CustomInputArea = styled(TextArea)`
  border-radius: 7px;
  border: 1px solid #e1e4e8;
  color: ${(props) => (props.gray ? " var(--darkGray)" : "black")};
  background-color: ${(props) => (props.gray ? "var(--lighterGray)" : "white")};
`;
export const ButtonStyled = styled(Button)`
  background-color: ${(props) =>
    props.main ? "var(--yellow)" : "var(--lightGray)"};
  border-radius: ${(props) => (props.extra ? "2px" : "7px")};
  border: ${(props) => (props.main ? "none" : "1px solid var(--lighterGray)")};
  display: flex;
  gap: 5px;

  width: ${(props) => (props.extra ? "80px" : "auto")};
  height: ${(props) => (props.extra ? "110px" : "auto")};
  padding: ${(props) =>
    props.main
      ? "0 20px"
      : props.extra
      ? "0 50px"
      : props.undo
      ? "0 4px 0 9px"
      : "0 8px"};
  align-items: center;
  text-align: center;
  justify-content: center;
  &:hover {
    background-color: ${(props) =>
      props.main ? "var(--yellow)" : "var(--lightGray)"};
    color: black;
  }
  &:focus {
    background-color: ${(props) =>
      props.main ? "var(--yellow)" : "var(--lightGray)"};
    color: black;
  }
  height: 30px;
`;
export const InputLable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 10px;
`;
export const ModleFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  padding: 10px 0;
`;
// export const NotificationIcon = styled.div`
//   width: 15px;
//   height: 15px;
//   border-radius: 50%;
//   backgorund-color: ${(props) =>
//     props.success
//       ? "var(--green)"
//       : (props) => (props.failed ? "var(--lightRed)" : "var(--lightOrange")};
// `;
export const Space = styled.div`
  height: 7px;
`;
export const ModleHeader = styled.div`
  display: flex;
  gap: 10px;
  height: 60px;
  justify-content: space-between;

  align-items: center;
  border-radius: 7px;
  font-size: 20px;
  padding: 50px 5px;
`;
export const ButtonStyledModle = styled(Button)`
  height: 40px;
  background-color: ${(props) =>
    props.main ? "var(--yellow)" : "var(--lightGray)"};
  border-radius: ${(props) => (props.extra ? "2px" : "7px")};
  border: ${(props) => (props.main ? "none" : "1px solid var(--lighterGray)")};
  display: flex;
  gap: 5px;

  width: 100px;

  padding: 0;
  align-items: center;
  text-align: center;
  justify-content: center;
  &:hover {
    background-color: ${(props) =>
      props.main ? "var(--yellow)" : "var(--lightGray)"};
    color: black;
  }
  &:focus {
    background-color: ${(props) =>
      props.main ? "var(--yellow)" : "var(--lightGray)"};
    color: black;
  }
`;
export const EmptyTextHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 140px;
  align-items: center;
  justify-content: center;
  margin: 3% 0;
`;
export const CreateText = styled.u`
  color: black;
  cursor: pointer;
  margintop: 10px;
`;

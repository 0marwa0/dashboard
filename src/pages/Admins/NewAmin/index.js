import React from "react";
import { InputLable } from "../../shared/SharedStyle";
import { CustomModleButton } from "../../shared/SharedComponents";
import { Menu, Dropdown, Button, Input } from "antd";
import { ReactComponent as DropIcon } from "../../../public/images/dropdown.svg";
import { ReactComponent as Close } from "../../../public/images/close.svg";

import styled from "styled-components";

import "../../../App.css";
import { CustomInput } from "../../shared/SharedStyle";
const option = (
  <Menu>
    <Menu.Item key="1">200</Menu.Item>
    <Menu.Item key="2">100</Menu.Item>
    <Menu.Item key="3">50</Menu.Item>
  </Menu>
);
const data = (
  <Menu>
    <Menu.Item key="1">200</Menu.Item>
    <Menu.Item key="2">100</Menu.Item>
    <Menu.Item key="3">50</Menu.Item>
  </Menu>
);
const SideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 999999999;

  background: rgba(0, 0, 0, 0.3);
`;
const ModalFooter = styled.div`
  height: 5%;
`;
const SideModal = styled.div`
  position: absolute;
  top: 0;
  animation: listFade 0.6s;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  height: 100%;
  width: 400px;
  backgorund-color: red;
  padding: 30px;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 40px;
  align-items: center;
`;
const Space = styled.div`
  height: 8px;
`;
function Index(props) {
  return (
    <SideOverlay>
      <SideModal>
        <div style={{ height: "95%" }}>
          <Title>
            <div>Add new Admin</div>
            <Close onClick={() => props.fun(false)} cursor="pointer" />
            {/* <AiOutlineClose /> */}
          </Title>
          <InputLable>
            {" "}
            <div style={{ fontSize: "17px" }}>Admin Info</div>
          </InputLable>{" "}
          <Space />
          <InputLable>
            Full Name
            <CustomInput placeholder="Write admin name" />
          </InputLable>
          <Space />
          <InputLable>
            Username
            <CustomInput placeholder="Write admin username" />
          </InputLable>
          <Space />
          <InputLable>
            Password
            <CustomInput placeholder="Write admin password" />
          </InputLable>
          <Space />
          <InputLable>
            Branch
            <Dropdown overlay={option}>
              <Button
                style={{
                  color: "var(--darkGray)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Choose admin branch loaction
                <DropIcon />
              </Button>
            </Dropdown>
          </InputLable>
          <Space />
          <InputLable>
            Role
            <Dropdown overlay={data}>
              <Button
                style={{
                  color: "var(--darkGray)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Choose admin role <DropIcon />
              </Button>
            </Dropdown>
          </InputLable>
        </div>

        <ModalFooter>
          <div style={{ float: "right" }}>
            {" "}
            <CustomModleButton Main extra>
              Create
            </CustomModleButton>
          </div>
        </ModalFooter>
      </SideModal>
    </SideOverlay>
  );
}

export default Index;

import React from "react";
import { Input, InputNumber } from "antd";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  InputLable,
  ModleFooter,
  ModleHeader,
  Space,
} from "../../shared/SharedStyle";
import styled from "styled-components";
import { ReactComponent as DropIcon } from "../../../public/images/dropdown.svg";
import { ReactComponent as Close } from "../../../public/images/close.svg";

import { GiNorthStarShuriken } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CustomModleButton } from "../../shared/SharedComponents";
import { CustomInput, CustomInputArea } from "../../shared/SharedStyle";

const { TextArea } = Input;

const optionData = (
  <Menu>
    <Menu.Item key="1">200</Menu.Item>
    <Menu.Item key="2">100</Menu.Item>
    <Menu.Item key="3">50</Menu.Item>
  </Menu>
);

const PageWrapper = styled.div`
  width: 400px;
  padding: 40px;
`;

function Index(props) {
  return (
    <div>
      {" "}
      <ModleHeader>
        Send notification
        <Close onClick={props.Close} cursor="pointer" />
        {/* <AiOutlineClose /> */}
      </ModleHeader>
      <PageWrapper>
        <InputLable>
          <span>
            Title <GiNorthStarShuriken color="red" size={8} />
          </span>
          <CustomInput placeholder="Write notification title" />
        </InputLable>
        <Space />
        <InputLable>
          <span>
            {" "}
            Message <GiNorthStarShuriken color="red" size={8} />
          </span>

          <CustomInputArea
            rows={4}
            placeholder="Write notification message ..."
          />
        </InputLable>{" "}
        <Space />
        <InputLable>
          User filter
          <Dropdown overlay={optionData}>
            <Button
              style={{
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ color: "var(--darkGray)" }}>All users</div>
              <DropIcon />
            </Button>
          </Dropdown>
        </InputLable>
      </PageWrapper>{" "}
      <ModleFooter>
        <CustomModleButton>Cancel</CustomModleButton>
        <CustomModleButton Main>Send</CustomModleButton>
      </ModleFooter>
    </div>
  );
}

export default Index;

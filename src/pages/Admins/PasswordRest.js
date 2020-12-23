import React, { useState, useEffect } from "react";
import { Input, InputNumber } from "antd";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";

import {
  InputLable,
  ModleFooter,
  ModleHeader,
  Space,
} from "../shared/SharedStyle";
import styled from "styled-components";
import { ReactComponent as Close } from "../../public/images/close.svg";
import { addData } from "../../API";

import { GiNorthStarShuriken } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CustomModleButton } from "../shared/SharedComponents";
import { CustomInput, CustomInputArea } from "../shared/SharedStyle";

const { TextArea } = Input;

const optionData = (
  <Menu>
    <Menu.Item key="1" isSelected={true}>
      all
    </Menu.Item>
    {/* <Menu.Item key="2">100</Menu.Item>
    <Menu.Item key="3">50</Menu.Item> */}
  </Menu>
);

const PageWrapper = styled.div`
  width: 400px;
  padding: 40px;
`;
const Divider = styled.div`
  height: 40px;
`;
function Index(props) {
  const [newpass, setnewpass] = useState("");
  const [oldpass, setoldpass] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleInput = (e, key) => {
    let value = e.target.value;
    if (key === "new") {
      setnewpass(value);
    }
    if (key === "old") {
      setoldpass(value);
    }
  };
  const handleSubmit = () => {
    let data = {
      id: props.id,
      // oldPassword: oldpass,
      newPassword: newpass,
    };
    // let password = props.data.map((item) => {
    //   item.password === oldpass;
    // });
    console.log(props.data);

    if (newpass != "" && oldpass != "") {
      setLoading(true);
      addData(
        "admin/reset/password",
        data,
        (mesg, Data) => {
          if (mesg) {
            Mesg(mesg);
          } else {
            SuccessMesg("Password Changed done !");
            props.onClose();
          }
        },
        (err) => {
          props.onClose();

          FailedMesg(err);
        }
      );
    } else {
      FailedMesg("empty Password");

      // props.Close();
    }
  };

  return (
    <div>
      {" "}
      <ModleHeader>
        Send notification
        <Close onClick={props.onClose} cursor="pointer" />
      </ModleHeader>
      <PageWrapper>
        <InputLable>
          <span>
            Old Password <GiNorthStarShuriken color="red" size={8} />
          </span>
          <CustomInput
            onChange={(e) => handleInput(e, "old")}
            placeholder="Write old password"
          />
        </InputLable>{" "}
        <Divider />
        <InputLable>
          <span>
            New Password
            <GiNorthStarShuriken color="red" size={8} />
          </span>
          <CustomInput
            onChange={(e) => handleInput(e, "new")}
            placeholder="Write nw password"
          />
        </InputLable>
      </PageWrapper>{" "}
      <ModleFooter>
        <CustomModleButton fun={props.Close}>Cancel</CustomModleButton>
        <CustomModleButton main fun={handleSubmit}>
          Send
        </CustomModleButton>
      </ModleFooter>
    </div>
  );
}

export default Index;

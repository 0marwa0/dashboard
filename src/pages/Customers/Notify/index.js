import React, { useState } from "react";
import { Input, InputNumber } from "antd";
import { Menu, Dropdown, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Mesg, FailedMesg, SuccessMesg } from "../../../API/APIMessage";

import {
  InputLable,
  ModleFooter,
  ModleHeader,
  Space,
} from "../../shared/SharedStyle";
import styled from "styled-components";
import { ReactComponent as DropIcon } from "../../../public/images/dropdown.svg";
import { ReactComponent as Close } from "../../../public/images/close.svg";
import { addData } from "../../../API";

import { GiNorthStarShuriken } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CustomModleButton } from "../../shared/SharedComponents";
import { CustomInput, CustomInputArea } from "../../shared/SharedStyle";
const { Option } = Select;

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
  width: 470px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  height: 100%;

  justify-content: space-between;
`;

function Index(props) {
  const [title, setTitle] = useState("");
  const [mesg, setMesg] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleInput = (e, key) => {
    let value = e.target.value;
    if (key === "title") {
      setTitle(value);
    }
    if (key === "mesg") {
      setMesg(value);
    }
  };

  const clear = () => {
    setTitle("");
    setMesg("");
  };
  const handleSubmit = () => {
    let receiver = props.all ? "all" : props.recevierId.toString();
    let data = {
      title: title,
      to: receiver,
      contents: mesg,
      lang: "ar",
      userId: props.id,
    };
    setLoading(true);
    if (title != "" && mesg != "") {
      addData(
        "send/notification",
        data,
        (mesg, Data) => {
          // if (!Data.status) {
          //   Mesg(mesg);
          // }
          console.log(data, Data, mesg, "send notifi");

          SuccessMesg("Notification done !");
          clear();
          setLoading(false);
          props.Close();
        },
        (err) => {
          props.Close();
          setLoading(false);
          clear();
          FailedMesg(err);
        }
      );
    } else {
      FailedMesg("Cant send an empty notification");

      // props.Close();
    }
  };
  const handleClose = (e) => {
    if (node.contains(e.target)) {
      return;
    }
    props.Close(false);
  };
  let node;
  return (
    <div className="Overlay" onClick={(e) => handleClose(e)}>
      <div
        className="Modal"
        ref={(nods) => {
          node = nods;
        }}>
        <PageWrapper>
          <div>
            <ModleHeader>
              Send notification
              <Close
                onClick={() => {
                  props.Close();
                  clear();
                }}
                cursor="pointer"
              />
            </ModleHeader>
            <InputLable>
              <span>
                Title <GiNorthStarShuriken color="red" size={8} />
              </span>
              <CustomInput
                onChange={(e) => handleInput(e, "title")}
                placeholder="Write notification title"
              />
            </InputLable>
            <Space />
            <InputLable>
              <span>
                {" "}
                Message <GiNorthStarShuriken color="red" size={8} />
              </span>

              <CustomInputArea
                rows={4}
                onChange={(e) => handleInput(e, "mesg")}
                placeholder="Write notification message ..."
              />
            </InputLable>{" "}
            <Space />
            {!props.all ? (
              ""
            ) : (
              <InputLable>
                User filter
                <Select suffixIcon={<DropIcon />} placeholder="all">
                  <Option key="all">All users</Option>
                </Select>
              </InputLable>
            )}{" "}
          </div>
          <ModleFooter>
            <CustomModleButton main fun={handleSubmit} loading={props.loading}>
              Send
            </CustomModleButton>
          </ModleFooter>
        </PageWrapper>{" "}
        {/* </> */}
      </div>
    </div>
  );
}

export default Index;

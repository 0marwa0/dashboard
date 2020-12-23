import React, { useState, useEffect } from "react";
import { Input, InputNumber, DatePicker } from "antd";
import { Mesg, FailedMesg } from "../../../../API/APIMessage";
import { BookItemLoading } from "../../../shared/Loading";
import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "antd";
import { Values } from "../../index";

import {
  CardItem,
  CardWrapper,
  PageWrapper,
  SlidHolder,
  Divider,
  Size,
  GrayBoldText,
  GrayText,
  SecondPageInput,
  BookedItem,
  Page1Item,
} from "./index";
import { LoadData } from "../../../../API";
import { ReactComponent as DropIcon } from "../../../../public/images/dropdown.svg";
import Slider from "react-slick";
import { FaTrashAlt } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CustomInput, CustomInputArea } from "../../../shared/SharedStyle";
import { InputLable } from "../../../shared/SharedStyle";
const { TextArea } = Input;
const { Option } = Select;
export default function ForthPage(props) {
  const [Loading, setLoading] = useState(false);
  const [Types, setTypes] = useState([]);
  const getTypes = () => {
    LoadData(
      "book/types",
      (err, data) => {
        setLoading(false);
        setTypes(data.data);
        // console.log(data.data, "type of api");
        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
      }
    );
  };
  useEffect(() => {
    getTypes();
  }, []);
  // const Option = () =>
  //   Types.map((item) => <Menu.Item key="1">{item.name}</Menu.Item>);

  const TypeData = (
    <Menu>
      {Types.map((item) => (
        <Menu.Item key="1">{item.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Values.Consumer>
      {({ typeId, price, received }) => (
        <div className="modleWrapper">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}>
            <InputLable>
              Total Price
              <Input
                defaultValue={price}
                addonAfter="IQD"
                onChange={(e) => props.handleInput(e, "price")}
                placeholder="0.0"
              />
            </InputLable>
            <InputLable>
              Received
              <Input
                defaultValue={received}
                onChange={(e) => props.handleInput(e, "received")}
                addonAfter="IQD"
                placeholder="0.0"
              />
            </InputLable>
          </div>
          <Divider />
          <Divider />
          <InputLable>
            <Select
              suffixIcon={<DropIcon />}
              defaultValue={typeId}
              onChange={(e) => props.handleselect(e, "typeId")}
              placeholder="Book Type">
              {Types.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
            {/* <Dropdown overlay={TypeData}>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "var(--textGray)",
              justifyContent: "space-between",
            }}
          >
            companies
            <DropIcon />
          </Button>
        </Dropdown> */}
          </InputLable>
        </div>
      )}
    </Values.Consumer>
  );
}

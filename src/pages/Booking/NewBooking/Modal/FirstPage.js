import React, { useState, useEffect } from "react";
import { Input, InputNumber, DatePicker } from "antd";
import { Mesg, FailedMesg } from "../../../../API/APIMessage";
import { BookItemLoading } from "../../../shared/Loading";
import { Values } from "../../index";
import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { Divider, Size, Page1Item } from "./index";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { LoadData } from "../../../../API";
import { ReactComponent as DropIcon } from "../../../../public/images/dropdown.svg";

import { CustomInput, CustomInputArea } from "../../../shared/SharedStyle";
import { InputLable } from "../../../shared/SharedStyle";
import { Select } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

export default function FirstPage(props) {
  const [Loading, setLoading] = useState(false);
  const [spaces, setspaces] = useState([]);

  const getSpace = () => {
    LoadData(
      "spaces",
      (err, data) => {
        setspaces(data.data);

        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        FailedMesg(err, "Something worng happend !");
      }
    );
  };
  useEffect(() => {
    getSpace();
  }, []);
  let Space = spaces ? spaces : [];
  const optionData = (
    <Menu>
      {Space.map((item, i) => (
        <Menu.Item key={item.id}>{item.title}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Values.Consumer>
      {({ title, organizer, people, comment, spaceId, data }) => (
        <div className="modleWrapper">
          <Page1Item>
            <InputLable>
              Booking Title
              <CustomInput
                defaultValue={title}
                onChange={(e) => props.handleInput(e, "title")}
                placeholder="write booking title"
              />
            </InputLable>
            <InputLable>
              Space
              <Select
                defaultValue={spaceId}
                suffixIcon={<DropIcon />}
                onChange={(e) => props.handleselect(e, "spaceId")}
                placeholder="Choose space"
                // optionFilterProp="children"
              >
                {spaces
                  ? spaces.map((item, i) => (
                      <Option value={item.id}>{item.title}</Option>
                    ))
                  : []}
              </Select>
            </InputLable>
          </Page1Item>
          <Page1Item>
            <InputLable>
              <Divider />
              Organizer Name
              <CustomInput
                defaultValue={organizer}
                onChange={(e) => props.handleInput(e, "organizer")}
                placeholder="write organizer name"
              />
            </InputLable>{" "}
            <InputLable>
              <Divider />

              <Size>
                No. of People
                <span style={{ color: "var(--textGray)" }}>Max: 30</span>{" "}
              </Size>
              <InputNumber
                placeholder="00"
                defaultValue={people}
                onChange={(e) => props.handleselect(e, "people")}
                // onChange={(e) => console.log(e, "date check")}
                style={{ borderRadius: "7px", width: "100%" }}
              />
            </InputLable>
          </Page1Item>
          <InputLable>
            <Divider />
            Comment
            <CustomInputArea
              rows={4}
              defaultValue={comment}
              onChange={(e) => props.handleInput(e, "comment")}
              placeholder="write something about this booking ..."
            />
          </InputLable>
        </div>
      )}
    </Values.Consumer>
  );
}

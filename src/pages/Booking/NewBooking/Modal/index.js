import React, { useState, useEffect } from "react";
import { Input, InputNumber, DatePicker, Skeleton } from "antd";
import { Mesg, FailedMesg } from "../../../../API/APIMessage";
// import { BookItemLoading } from "../../../shared/Loading";
import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { LoadData } from "../../../../API";
// import DatePicker from "react-datepicker";
import { ReactComponent as DropIcon } from "../../../../public/images/dropdown.svg";
import Slider from "react-slick";
import { FaTrashAlt } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CustomInput, CustomInputArea } from "../../../shared/SharedStyle";
import { InputLable } from "../../../shared/SharedStyle";
const { TextArea } = Input;

export const CardItem = styled.div`
  height: 120px;
  min-width: 200px;
  padding: 11px;
  display: flex;

  flex-direction: column;
  border-radius: 5px;

  border: ${(props) =>
    props.border ? "2px solid var(--yellow)" : "2px solid var(--lighterGray)"};
  &:hover {
    border: 2px solid var(--yellow);
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  width: 600px;
  height: auto;
  gap: 10px;
  cursor: grab;
`;

export const SlidHolder = styled.div`
  display: flex;
  overflow: hidden;
  height: 200px;

  flex-direction: column;
`;
export const PageWrapper = styled.div`
  width: 580px;
  margin-bottom: 18px;
  overflow: hidden;

  padding: 0px 40px;
`;

export const Page1Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.7fr;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 14px;
`;
export const BookedItem = styled.div`
  display: grid;
  padding: 5px 0;
  grid-template-columns: 0.5fr 0.3fr 0.3fr 0.2fr;
  border-bottom: ${(props) =>
    props.head ? "1px solid var(--lighterGray)" : "none"};
  grid-template-columns: 0.6fr 0.3fr 0.3fr 0.1fr;
`;

export const SecondPageInput = styled.div`
  display: grid;

  align-itmes: center;

  gap: 15px;
  grid-template-columns: 1.2fr 0.1fr 0.1fr auto;
`;
export const GrayText = styled.div`
  color: var(--textGray);
`;
export const Size = styled.span`
  display: flex;
  justify-content: space-between;
`;
export const GrayBoldText = styled.div`
  color: var(--textGray);
`;
export const Divider = styled.div`
  height: 5px;
`;
const SlideLoadHolder = styled.div`
  display: flex;
  gap: 2px;
`;

export const BookItemLoading = (props) => {
  return (
    <SlideLoadHolder>
      {[1, 2, 3].map((item, i) => {
        return (
          <CardWrapper>
            <div
              className="cardItem"
              key={i}
              style={{
                border: "2px solid var(--lighterGray)",
              }}>
              <Skeleton.Input
                style={{
                  width: 60,
                  height: 5,
                }}
                active="active"
              />
              <GrayText>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}>
                  {" "}
                  <Skeleton.Input
                    style={{
                      width: 160,
                      height: 5,
                    }}
                    active="active"
                  />{" "}
                  <Skeleton.Input
                    style={{
                      width: 50,
                      height: 5,
                    }}
                    active="active"
                  />
                </div>
              </GrayText>
            </div>
          </CardWrapper>
        );
      })}
    </SlideLoadHolder>
  );
};

// export default Index;

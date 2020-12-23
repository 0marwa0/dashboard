import React, { useState, useEffect, useContext } from "react";
import { Input, InputNumber, DatePicker } from "antd";
import { Mesg, FailedMesg } from "../../../../API/APIMessage";
import { BookItemLoading } from "./index";
// import Carousel from "re-carousel";

import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import {
  DownOutlined,
  PropertySafetyFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Values } from "../../index";

import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { LoadData } from "../../../../API";
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
import { ReactComponent as DropIcon } from "../../../../public/images/dropdown.svg";
import Slider from "react-slick";
import { FaTrashAlt } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CustomInput, CustomInputArea } from "../../../shared/SharedStyle";
import { InputLable } from "../../../shared/SharedStyle";
const { TextArea } = Input;
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  arrows: false,
  // responsive: [
  //   {
  //     breakpoint: 320,
  //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
  //   },
  //   {
  //     breakpoint: 768,
  //     settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false },
  //   },
  //   {
  //     breakpoint: 1024,
  //     settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false },
  //   },
  // ],
};
const Lable = styled.span`
  font-size: 19px;
`;
export default function ThirdPage(props) {
  const IdValues = useContext(Values);

  const [activeCoffeId, setactiveCoffeId] = useState(IdValues.activeCoffeId);

  const [activeLunchesId, setactiveLunchesId] = useState(IdValues.lunchId);

  const [activedesignId, setactivedesignId] = useState(IdValues.designId);
  useEffect(() => {
    setactiveCoffeId(IdValues.coffeebreakId);
    setactiveLunchesId(IdValues.lunchId);
    setactivedesignId(IdValues.designId);

    console.log(IdValues.coffeebreakId, IdValues.lunchId, IdValues.designId);
  }, []);

  const [borderColor, setborderColor] = useState("2px solid var(--yellow)");

  const selectCoffe = (id) => {
    setborderColor("2px solid var(--yellow)");
    setactiveCoffeId(id);
    props.handleselect(id, "coffeebreakId");
  };
  const selectLunches = (id) => {
    setactiveLunchesId(id);
    props.handleselect(id, "lunchId");
  };
  const selectdesign = (id) => {
    setactivedesignId(id);
    props.handleselect(id, "designId");
  };
  let lunches = props.lunches ? props.lunches : [];
  let designs = props.Designs ? props.Designs : [];
  let coffees = props.coffees ? props.coffees : [];
  return (
    <Values.Consumer>
      {({ coffeebreakId, lunchId, designId }) => (
        <div className="modleWrapper">
          <SlidHolder>
            <InputLable>
              <Lable> Coffe Brake Pack</Lable>

              {props.Loading ? (
                <BookItemLoading />
              ) : (
                <Slider {...settings}>
                  {coffees.map((item, i) => {
                    return (
                      <CardWrapper>
                        <div
                          key={i}
                          className="cardItem"
                          onClick={() => selectCoffe(item.id)}
                          style={{
                            border:
                              activeCoffeId === item.id
                                ? "2px solid var(--yellow)"
                                : "2px solid var(--lighterGray)",
                          }}>
                          {item.price + " IQD"}

                          <GrayText>
                            <div>{item.description}</div>
                          </GrayText>
                        </div>
                      </CardWrapper>
                    );
                  })}
                </Slider>
              )}
            </InputLable>
          </SlidHolder>
          <SlidHolder>
            <InputLable>
              <Lable> Lunches</Lable>
              {props.Loading ? (
                <BookItemLoading />
              ) : (
                <Slider {...settings}>
                  {lunches.map((item, i) => {
                    return (
                      <CardWrapper>
                        <div
                          className="cardItem"
                          key={i}
                          onClick={() => selectLunches(item.id)}
                          style={{
                            border:
                              activeLunchesId === item.id
                                ? "2px solid var(--yellow)"
                                : "2px solid var(--lighterGray)",
                          }}>
                          <div>{item.price} IQD</div>
                          <GrayText>
                            <div>{item.description}</div>
                          </GrayText>
                        </div>{" "}
                      </CardWrapper>
                    );
                  })}
                </Slider>
              )}
            </InputLable>
          </SlidHolder>
          <SlidHolder>
            <InputLable>
              <Lable> Hall Design</Lable>
              {props.Loading ? (
                <BookItemLoading />
              ) : (
                <Slider {...settings} className="slide">
                  {designs.map((item, i) => {
                    return (
                      <CardWrapper>
                        <div
                          className="cardItem"
                          key={i}
                          onClick={() => selectdesign(item.id)}
                          style={{
                            border:
                              activedesignId === item.id
                                ? "2px solid var(--yellow)"
                                : "2px solid var(--lighterGray)",
                          }}>
                          <div>{item.name} </div>
                          <GrayText>
                            <div>{item.description}</div>
                          </GrayText>
                        </div>
                      </CardWrapper>
                    );
                  })}
                </Slider>
              )}
            </InputLable>
          </SlidHolder>{" "}
        </div>
      )}
    </Values.Consumer>
  );
}

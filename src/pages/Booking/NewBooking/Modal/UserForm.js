import React, { useState } from "react";
import styled from "styled-components";
import { CustomInput, InputLable } from "../../../shared/SharedStyle";
import { InputGroup } from "./Step1";
import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import { DatePicker } from "antd";

function Index(props) {
  const handleInput = (e, key) => {
    switch (key) {
      case "name":
        props.handleInput(e, "name");
        break;
      case "phone":
        props.handleInput(e, "phone");
        break;
      case "email":
        props.handleInput(e, "email");
        break;
      case "gender":
        props.handleInput(e, "gender");
        break;
      case "birthday":
        props.handleInput(e.val, "birthday");
        break;
      default:
        break;
    }
  };
  const handleDate = (e) => {
    console.log(e, "dataeeeeeee");
  };
  const d = (e) => {
    console.log(e.format("YY-MM-DD"));
  };
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <InputGroup row1={true}>
          <InputLable>
            Fist Name
            <CustomInput
              //onChange={(e) => setname(e.target.value)}

              //value={values}
              placeholder="Andrew"
              onChange={(e) => handleInput(e, "name")}
              //   value={values}
            />
          </InputLable>
          <InputLable>
            Last Name
            <CustomInput
              placeholder="Morton"
              // onChange={(e) => handleInput(e, "")}
              // value={values}
            />
          </InputLable>
          <InputLable>
            Phone Number
            <CustomInput
              placeholder="(123)456-7890"
              // onChange={(e) => setphone(e, "phone")}
              onChange={(e) => handleInput(e, "phone")}
              // defaultValue={phone}
            />
          </InputLable>
        </InputGroup>
        <InputGroup row2={true}>
          <InputLable>
            Email
            <CustomInput
              onChange={(e) => handleInput(e, "email")}
              // defaultValue={email}
              //onChange={(e) => setemail(e)}
              placeholder="Customer e-mail"
            />
          </InputLable>
          <InputLable>
            Brith Date
            <div style={{ display: "flex", position: "relative" }}>
              <DatePicker
                placeholder="DD / MM / YYYY"
                style={{ width: "100%" }}
                // format="dd/mm/yy"
                onChange={(e) => handleDate(e, "birthday")}
              />
              <span className="datePickerIcon">
                <DatePickerIcon />
              </span>
            </div>
          </InputLable>
        </InputGroup>
        <InputGroup row3={true}>
          <InputLable>
            Address
            <CustomInput
              placeholder="Customer address"
              // onChange={(e) => setemail(e)}
              onChange={(e) => handleInput(e, "address")}
              //   value={address}
            />
          </InputLable>
          <InputLable>
            Gender
            <CustomInput
              placeholder="Male"
              // onChange={(e) => setgender(e.target.value)}
              onChange={(e) => handleInput(e, "gender")}
              //   value={gender}
            />
          </InputLable>
        </InputGroup>
      </div>
    </div>
  );
}

export default Index;

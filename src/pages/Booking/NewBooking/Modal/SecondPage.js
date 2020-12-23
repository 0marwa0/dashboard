import React, { useState, useEffect, useContext } from "react";
import { DatePicker, Button } from "antd";

import { Values } from "../../index";
import Moment from "react-moment";
import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "antd";
import { ReactComponent as DropIcon } from "../../../../public/images/dropdown.svg";
import { FaTrashAlt } from "react-icons/fa";
import { DateName, getTime } from "../../../Dashboard";

import { Divider, GrayBoldText, SecondPageInput, BookedItem } from "./index";
import { InputLable } from "../../../shared/SharedStyle";
import { Day } from "@syncfusion/ej2-react-schedule";
const { Option } = Select;
export default function SecondPage(props) {
  const [Days, setsDays] = useState([]);
  const dayValues = useContext(Values);

  const [Privew, setPrivew] = useState(dayValues.DateValues);
  const [Dayshow, setsDayshow] = useState([]);
  const [date, setdate] = useState([]);
  const [Editeddate, setEditeddate] = useState("");
  const [Datevalue, setdatevalue] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [count, setcount] = useState(0);
  const [EmptySTime, setEmptySTime] = useState(true);
  const [EmptyDate, setEmptyDate] = useState(true);
  const [EmptyETime, setEmptyETime] = useState(true);

  const add = () => {
    if (Editeddate != "" && start != "" && end != "") {
      setcount(count + 1);

      Dayshow.push({ id: count, data: Editeddate, StTime: start, EnTime: end });
      setsDayshow(Dayshow);
      let Days = [];

      for (let i = 0; i < Dayshow.length; i++) {
        Days.push({
          start: {
            dateTime: Dayshow[i].data + "T" + Dayshow[i].StTime + ":00+03:00",
          },
          end: {
            dateTime: Dayshow[i].data + "T" + Dayshow[i].EnTime + ":00+03:00",
          },
        });
      }

      setsDays(Days);
      let temp = [];
      temp = Days;
      let privew = [];
      for (let i = 0; i < Days.length; i++) {
        privew.push({
          start: Days[i].start.dateTime,
          end: Days[i].end.dateTime,
        });
      }
      setPrivew(privew);
      props.handleselect(Days, "days", privew);
    } else {
    }
  };
  const onDelete = (id) => {
    let data = Privew.filter((item, i) => i != id);
    let Day = Days.filter((item, i) => i != id);
    let datashow = Dayshow.filter((item, i) => i != id);
    props.handleselect(Day, "days", data);
    setPrivew(data);
    setsDayshow(datashow);
  };
  const handleselect = (e, key) => {
    if (key === "start") {
      setEmptySTime(false);
      setstart(e);
    } else if (key === "end") {
      setEmptyETime(false);
      setend(e);
    }
  };
  const handleDate = (e) => {
    let date = e.format("YYYY-MM-DD");
    setEmptyDate(false);
    // let edited = e.format("D-MMM-yyyy");
    setEditeddate(date);
    setdatevalue(e);
    setdate(date);
  };
  useEffect(() => {
    if (
      dayValues.DateValues.map((item) => {
        if (typeof item.start === "object") {
          Dayshow.push({
            id: count,
            data:
              item.start.dateTime.split("-")[0] +
              "-" +
              item.start.dateTime.split("-")[1] +
              "-" +
              item.start.dateTime.substring(0, 2),
            StTime: item.start.dateTime.split("T")[1].substring(0, 5),
            EnTime: item.end.dateTime.split("T")[1].substring(0, 5),
          });
          let privew = [];
          for (let i = 0; i < dayValues.DateValues.length; i++) {
            privew.push({
              start: dayValues.DateValues[i].start.dateTime,
              end: dayValues.DateValues[i].end.dateTime,
            });
          }
          setPrivew(privew);
        } else {
          if (dayValues.DateValues.length != 0) {
            // dayValues.DateValues.map((item) => {
            Dayshow.push({
              id: count,
              data:
                item.start.split("-")[0] +
                "-" +
                item.start.split("-")[1] +
                "-" +
                item.start.substring(0, 2),
              StTime: item.start.split("T")[1].substring(0, 5),
              EnTime: item.end.split("T")[1].substring(0, 5),
            });
            //setsDayshow(Dayshow);
            //});
          }
        }
      })
    ) {
      // if (typeof item.start === "object") {console.log("its object")};
      // else {
      // }
    }
  }, []);
  return (
    <div className="modleWrapper">
      {/* {console.log(days, "context days")} */}
      <SecondPageInput>
        <InputLable>
          Choose Date
          <div style={{ display: "flex", position: "relative" }}>
            <DatePicker
              value={Datevalue}
              placeholder="DD / MM / YYYY"
              style={{ width: "100%" }}
              onChange={(e) => handleDate(e)}
            />
            <span className="datePickerIcon">
              <DatePickerIcon />
            </span>
          </div>
        </InputLable>
        <InputLable>
          Start
          <Select
            suffixIcon={<DropIcon />}
            onChange={(e) => handleselect(e, "start")}
            placeholder="00:00Am">
            <Option key="10:00">10:00Am</Option>
            <Option key="12:00">12:00Am</Option>
            <Option key="03:00">03:00Am</Option>
          </Select>
        </InputLable>
        <InputLable>
          End
          <Select
            suffixIcon={<DropIcon />}
            onChange={(e) => handleselect(e, "end")}
            placeholder="00:00Am">
            <Option key="10:00">10:00Am</Option>
            <Option key="12:00">12:00Am</Option>
            <Option key="03:00">03:00Am</Option>
          </Select>
        </InputLable>
        <InputLable>
          <div style={{ color: "transparent" }}>*</div>
          <Button
            onClick={add}
            disabled={
              !EmptyDate
                ? !EmptyETime
                  ? !EmptySTime
                    ? false
                    : true
                  : true
                : true
            }
            style={{
              borderRadius: "7px",
              backgroundColor: "var(--lightGray)",
            }}>
            <GrayBoldText> +</GrayBoldText>
          </Button>
        </InputLable>
      </SecondPageInput>
      <div style={{ marginTop: "30px", marginBottom: "70px" }}>
        <BookedItem head>
          <div>Dates</div>
          <div>Start</div>
          <div>End</div>
        </BookedItem>
        <Divider />
        <div style={{ width: "100%", height: "90px" }}>
          {Privew.map((item, i) => {
            return (
              <BookedItem key={i}>
                <div>
                  <Moment format="DD-MMM-yyy">{item.start}</Moment>
                </div>
                <GrayBoldText>
                  <Moment format="HH-mm">{item.start}</Moment>
                </GrayBoldText>
                <GrayBoldText>
                  <Moment format="HH-mm">{item.end}</Moment>
                </GrayBoldText>
                <div>
                  <FaTrashAlt
                    color="var(--lighterGray)"
                    style={{ float: "right", cursor: "pointer" }}
                    onClick={() => onDelete(i)}
                  />
                </div>
              </BookedItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}

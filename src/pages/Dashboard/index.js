import React, { useRef, useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { BiExport, BiDollar } from "react-icons/bi";
import Reservation from "./Reservation";
import moment from "moment";
import Statistic from "./Statistic";
import LoadingBar from "react-top-loading-bar";
import { AiOutlinePlus } from "react-icons/ai";
import { Col, Row, Input, Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CustomButton } from "../shared/SharedComponents";
import "../../App.css";
import { ReactComponent as PlusIcon } from "../../public/images/plus.svg";
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import { Modal } from "react-responsive-modal";
import { ReactComponent as PrintIcon } from "../../public/images/print.svg";
import { Data } from "../../fakeData/DashFakeData";
import dayGridPlugin from "@fullcalendar/daygrid";
import { RiArrowDropDownLine } from "react-icons/ri";
import Tooltip from "react-tooltip";
import BookingModal from "./BookingModal";
import { LoadBooking, LoadData } from "../../API";
import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
import { SmileOutlined } from "@ant-design/icons";
import {
  CustomPageWrapper,
  PageContent,
  PageTitle,
  PageContentFix,
  PageBtn,
  ButtonGroup,
} from "../shared/CustomPage";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
body{
  background-color:var(--lightGray)
}
`;
const colors = {
  color1: "var(--darkGreen)",
  color2: "var(--orange)",
  color3: "var(--blue)",
  color4: "var(--red)",
  color5: "var(--purple)",
};

export const Widget = styled.div`
  background-color: white;
  border-radius: 7px;
  border: 1px solid var(--lighterGray);
  display: flex;

  overflow: hidden;
  transition: 2s ease;
  padding: 17px 17px 8px 17px;
  width: 100%;
  flex-direction: column;
`;

const Clander = styled.div`
  background-color: white;
  border-radius: 7px;
  padding: 15px 25px;
  height: 100%;
  margin-bottom: 10%;
  border: 1px solid var(--lighterGray);
`;
const List = styled.div`
  color: #3b86ff;
  display: flex;
  align-items: cneter;
  margin-top: 4px;
`;
const SearchInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid var(--lighterGray);
  height: 30px;
  color: var(--lighterGray);
  width: 300px;
`;
const PageHeader = styled(Row)`
  align-items: center;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const DateName = (date) => {
  let result = moment(date, "YYYY-MM-DD HH:mm:ss")
    .format("D-MMMM-yyy")
    .replace("-", " ")
    .replace("-", " ");
  return result;
};
export const getTime = (date) => {
  let result = moment(date, "YYYY-MM-DD HH:mm:ss")
    .format("h-mm")
    .replace("-", ":");
  return result;
};
function Index(props) {
  const ref = useRef(null);
  const [ID, setID] = useState(localStorage.getItem("Station_id"));
  const [Reservations, setReservations] = useState([]);
  const onEnter = (item) => {
    let data;
    let color = item.event._def.ui.backgroundColor.replace(/^"(.*)"$/, "$1");
    //console.log(item.event._def.ui.backgroundColor, "our color");
    item.event._def.extendedProps.data.map((item) => (data = item));

    let node = document.createElement("div");
    let DayWrap = document.createElement("div");
    let TimeWrap = document.createElement("div");
    let TitleWrap = document.createElement("div");
    DayWrap.setAttribute("id", "flex-col");
    TimeWrap.setAttribute("id", "flex-col");
    TitleWrap.setAttribute("id", "flex-col");
    let day = document.createElement("div");
    let date = document.createElement("div");
    let titleLable = document.createElement("div");
    let title = document.createElement("div");
    let timeLable = document.createElement("div");
    let time = document.createElement("div");
    title.style.color = `${color}`;
    node.setAttribute("id", "pupup");
    item.el.setAttribute("id", "holder");

    if (item.el.id === "holder") {
      node.style.border = `1px solid ${color}`;

      day.innerHTML = `${data.day}`;
      date.innerHTML = `${data.date}`;
      title.innerHTML = `${data.title}`;
      titleLable.innerHTML = `Event Title`;
      time.innerHTML = `${data.time}`;
      time.style.color = "black";
      timeLable.innerHTML = `Time`;
      DayWrap.appendChild(day);
      DayWrap.appendChild(date);
      TitleWrap.appendChild(titleLable);
      TitleWrap.appendChild(title);
      TimeWrap.appendChild(timeLable);
      TimeWrap.appendChild(time);
      node.appendChild(DayWrap);
      node.appendChild(TitleWrap);
      node.appendChild(TimeWrap);

      item.el.appendChild(node);

      // console.log(item.el);
    }
  };
  const onLeave = (item) => {
    if (document.getElementById("pupup")) {
      item.el.removeChild(document.getElementById("pupup"));
    } else {
    }
    return item;
  };
  const [open, setOpen] = useState(false);
  const onOpenModal = (open) => {
    setOpen(open);
    //callback()
  };
  const [Loading, setLoading] = useState(false);
  const [BookDates, setBookDates] = useState(false);
  const [statistics, setstatistics] = useState({});
  const getDate = (date) => {
    let result = moment(date, "YYYY-MM-DD HH:mm:ss").format("yyyy-MM-DD");
    return result;
  };
  const getDay = (date) => {
    let result = moment(date, "YYYY-MM-DD HH:mm:ss").format("dddd");
    return result;
  };

  const loadApiData = () => {
    setLoading(true);
    ref.current.staticStart();
    LoadData(
      "books",
      (mesg, res) => {
        setLoading(false);
        ref.current.complete();

        if (mesg) {
          Mesg(mesg);
        }
        let PendingBooks = res.data.rows.filter((i) => i.status === "pending");
        setReservations(PendingBooks);

        let Dates = [];
        let el = {};
        let date = res.data.rows
          .filter((i) => i.approve === true)
          .map((i) => i.bookDates);

        for (let i = 0; i < date.length; i++) {
          date[i].map((item) => {
            Dates.push(item);
          });
        }
        // set title
        Dates.map(
          (obj) =>
            (obj.title = res.data.rows
              .filter((i) => i.id === obj.bookId)
              .map((i) => i.title)
              .toString())
        );

        // set event color
        Dates.map(
          (obj) =>
            (obj.color =
              colors[`color${Math.floor(Math.random() * (5 - 1 + 1)) + 1}`])
        );

        Dates.map((obj) => (obj.end = getDate(obj.end)));
        Dates.map((obj) => (obj.start = getDate(obj.start)));

        Dates.map(
          (obj) =>
            (obj.data = [
              {
                title: res.data.rows
                  .filter((i) => i.id === obj.bookId)
                  .map((i) => i.title)
                  .toString(),
                day:
                  obj.start === obj.end
                    ? getDay(obj.start)
                    : getDay(obj.start) + " - " + getDay(obj.end),
                date:
                  obj.start === obj.end
                    ? DateName(obj.start)
                    : DateName(obj.start) + " - " + DateName(obj.end),
                time: getTime(obj.start) + " - " + getTime(obj.end),
              },
            ])
        );

        setBookDates(Dates);
      },
      (err) => {
        setLoading(false);
        ref.current.complete();

        FailedMesg(err, "Something worng happend !");
      }
    );
  };

  const getStatistic = () => {
    LoadData(
      "statistics",
      (err, data) => {
        setLoading(false);

        setstatistics(data);

        //   console.log(data, "statices");
        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
        console.log(err, "failed");
      }
    );
  };
  useEffect(() => {
    loadApiData();
    getStatistic();
    // if (localStorage.getItem("station_token")) {
    //   loadApiData();
    //   getStatistic();
    // } else {
    //   props.history.push("/login");
    // }
  }, []);
  let id = localStorage.getItem("Station_id");
  let NowDate = new Date();
  let month = NowDate.getMonth();
  if (month === 12) {
    month = 1;
  } else {
    month = month + 1;
  }
  let year = NowDate.getFullYear();
  const setNextMonth = () => {
    setchange(true);
    // if (month === 12) {
    //   setCurrentMonth("01");
    // } else {
    //   setCurrentMonth(month + 1);
    // }
  };
  const setPrevMonth = () => {
    setCurrentMonth(month - 1);
  };
  // year + "-" + CurrentMonth.toString() + "-01T00:00:00.000Z"
  const [change, setchange] = useState(false);
  const [CurrentMonth, setCurrentMonth] = useState("2020-11-01T00:00:00.000Z");
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={setNextMonth}>Next month</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={setPrevMonth}>Previous month</a>
      </Menu.Item>
    </Menu>
  );

  // let d = "2020-11-05T00:00:00.000Z";
  return (
    <CustomPageWrapper>
      <GlobalStyle />
      <LoadingBar color="var(--yellow)" ref={ref} shadow={true} />

      <SideBar />
      <PageContentFix>
        <PageHeader>
          <PageTitle> Dashboard</PageTitle>
          <span style={{ marginTop: "20px", color: "var(--darkGray)" }}>
            Welcome Back ,{" "}
            <span style={{ color: "black" }}>
              {props.admins
                ? props.admins
                    .filter((i) => i.id === Number(id))
                    .map((i) => i.username)
                    .toString()
                : ""}
            </span>
          </span>
        </PageHeader>
        <Row>
          <PageBtn>
            <div></div>
            {/* <ButtonGroup space>
              <Dropdown overlay={menu}>
                <List>
                  <span>This Month</span>

                  <RiArrowDropDownLine size="25px" />
                </List>
              </Dropdown>
             
            </ButtonGroup> */}
            <ButtonGroup>
              {/* <CustomButton lable="Print">
                <PrintIcon />
              </CustomButton> */}
              <CustomButton main onOpen={onOpenModal} lable="New Booking">
                <PlusIcon />
              </CustomButton>
            </ButtonGroup>
          </PageBtn>
        </Row>

        <Row
          style={{
            display: "grid",
            gap: "25px",
            gridTemplateColumns: "auto 23vw",
          }}>
          <Col
            style={{
              height: "auto",
            }}>
            <Clander>
              <FullCalendar
                customButtons={{
                  myCustomButton: {
                    text: "custom!",
                    click: function () {
                      alert("clicked the custom button!");
                    },
                  },
                }}
                header={{
                  left: "prev,next today myCustomButton",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="700px"
                eventClick={(e) =>
                  props.history.push(
                    `/bookingdetalis/${e.event._def.extendedProps.bookId}`
                  )
                }
                eventMouseEnter={(item) => onEnter(item)}
                eventMouseLeave={(item) => onLeave(item)}
                // initialDate={change ? "2020-12-01T00:00:00.000Z" : CurrentMonth}
                events={BookDates}
              />
            </Clander>
          </Col>
          <Col style={{ height: "100%" }}>
            <Reservation Reservations={Reservations} Loading={Loading} />

            <div style={{ height: "3%" }}></div>
            <Statistic Loading={Loading} statistics={statistics} />
          </Col>
        </Row>
      </PageContentFix>
      <BookingModal
        open={open}
        onOpenModal={onOpenModal}
        getData={loadApiData}
      />
    </CustomPageWrapper>
  );
}

export default Index;

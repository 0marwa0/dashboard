import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdEventNote } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { BiLineChart } from "react-icons/bi";
import { BsSearch, BsFileRichtext } from "react-icons/bs";
import { VscSourceControl } from "react-icons/vsc";
import { CloudUploadOutlined } from "@ant-design/icons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { RiNewspaperLine } from "react-icons/ri";
import { Tooltip, Button, Popover } from "antd";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as Booking } from "../public/images/Book.svg";
import { BiCalendarWeek } from "react-icons/bi";
import Notification from "./Notification";
import { render } from "@testing-library/react";

const NavItem = ({ slug, children, index, title }) => {
  const history = useHistory();
  const location = useLocation();
  let url = `/` + slug;
  let type;
  let isSelected = false;
  if (index) {
    type = true;
  } else {
    type = false;
  }

  useEffect(() => {
    // console.log(type, "type");
  }, []);
  if (slug === location.pathname.substr(1)) {
    isSelected = true;
  }

  if (
    location.pathname.substr(1).slice(0, 14) === "bookingDetalis" &&
    slug === "booking"
  ) {
    isSelected = true;
  }
  if (location.pathname.substr(1) === "createEvent" && slug === "events") {
    isSelected = true;
  }

  // slug === "home" ? (
  //   <a href="#/">
  //     <SideItem type={type} isSelected={isSelected}>
  //       {children}
  //     </SideItem>
  //   </a>

  // ) : (
  let dash = false;
  if (slug === "") {
    slug = "Dashboard";
    dash = true;
  }

  let text = slug.charAt(0).toUpperCase() + slug.slice(1);
  return slug === "Notifications" ? (
    <SideItem type={type} isSelected={isSelected} move={true}>
      {children}
    </SideItem>
  ) : (
    <Tooltip title={dash ? "Dashboard" : text} placement="right">
      <Link to={url}>
        <SideItem type={type} isSelected={isSelected}>
          {children}
        </SideItem>
      </Link>
    </Tooltip>
  );
};
export const SideWrapper = styled.div`
  width: 87px;
  height: 100%;
  display: flex;
  position: fixed;

  padding-right: 4px;
  z-index: 100;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--black);
`;
const NotifiHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;

  font-size: 20px;
  font-weight: 400;
  align-items: center;
  cursor: unset;
`;
export const SideList = styled.ul`
   {
  }
`;
// move
export const SideItem = styled.li`
  position: relative;
  padding: 1.5vh 25px;

  margin-bottom: 0.5rem;
  border-left: ${(props) =>
    props.type
      ? "2px solid var(--black);"
      : props.isSelected
      ? "2px solid var(--yellow);"
      : "2px solid var(--black);"};
  font-size: 35px;
  display: flex;
  color: ${(props) => (props.isSelected ? "var(--yellow);" : "var(--gray);")};
  justify-content: center;
  align-items: center;
  &:hover {
    border-left: 2px solid var(--yellow);

    color: var(--yellow);
  }
`;

export const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Active = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  position: absolute;
  bottom: 14px;
  right: 30%;
  border: 2px solid var(--black);
  background-color: var(--RayGreen);
`;
const Logo = styled.img`
  width: auto;
  height: 30px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 0 20px;
`;
function SideBar(props) {
  let node;

  const [showNotification, setShow] = useState(false);
  const showPopup = (showNotification) => {
    setShow(showNotification);
  };

  // const handleClose = (e) => {
  //   if (node.contains(e.target)) {
  //     return;
  //   }

  //   showPopup(false);
  // };
  const location = useLocation();
  let { id } = useParams();
  let title = props.title;
  let page = location.pathname.substr(1);
  // console.log(page === "booking", "should be flase");
  // let idid = localStorage.getItem("Station_id");
  // console.log(idid, "idddddddd");
  return (
    <div
    //  onClick={(e) => handleClose(e)}
    >
      <SideWrapper>
        <SideList>
          <Logo src={require("../public/images/Logo.png")} />
          <NavItem slug="" title={title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="22.273"
              viewBox="0 0 23.833 22.273">
              <g
                id="Group_631"
                data-name="Group 631"
                transform="translate(1.25)">
                <path
                  id="Path_690"
                  data-name="Path 690"
                  d="M2651.886-154.763v21.023h22.524"
                  transform="translate(-2651.886 154.763)"
                  fill="none"
                  stroke={"" != page ? "#8a8a8a" : "var(--yellow)"}
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
                <path
                  id="Path_691"
                  data-name="Path 691"
                  d="M2682.514-120.889l6.642-6.642,4.22,4.22,6.669-6.669"
                  transform="translate(-2678.347 134.018)"
                  fill="none"
                  stroke={"" != page ? "#8a8a8a" : "var(--yellow)"}
                  strokeWidth="2.5"
                />
              </g>
              {title}
            </svg>
          </NavItem>
          <NavItem slug="booking" title={title}>
            {/* <BiBookAdd /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="22.002"
              viewBox="0 0 32 22.002">
              <g
                id="Group_37532"
                data-name="Group 37532"
                transform="translate(-26.667 -197.79)">
                <path
                  id="Subtraction_1"
                  data-name="Subtraction 1"
                  d="M12306.418,13778.543h-29.5v-4.757a5,5,0,0,0,0-9.988v-4.757h29.5v4.757a5,5,0,0,0,0,9.988v4.756Z"
                  transform="translate(-12249.001 -13560.001)"
                  fill="none"
                  stroke={
                    page.slice(0, 14) === page && page != "booking"
                      ? "#8a8a8a"
                      : "var(--yellow)"
                  }
                  strokeWidth="2.5"
                />
                ;
                <g
                  id="Group_37531"
                  data-name="Group 37531"
                  transform="translate(-1)">
                  <line
                    id="Line_286"
                    data-name="Line 286"
                    y1="8"
                    transform="translate(44.167 205.292)"
                    fill="none"
                    stroke={
                      page.slice(0, 14) === page && page != "booking"
                        ? "#8a8a8a"
                        : "var(--yellow)"
                    }
                    strokeWidth="2.5"
                  />
                  <line
                    id="Line_287"
                    data-name="Line 287"
                    y1="8"
                    transform="translate(48.167 209.292) rotate(90)"
                    fill="none"
                    stroke={
                      page.slice(0, 14) === page && page != "booking"
                        ? "#8a8a8a"
                        : "var(--yellow)"
                    }
                    strokeWidth="2.5"
                  />
                </g>
              </g>
            </svg>
          </NavItem>
          <NavItem slug="articles" title={title}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="21.917"
              viewBox="0 0 23.822 21.917">
              <g
                id="Group_6688"
                data-name="Group 6688"
                transform="translate(-99.733 -250.828)">
                <path
                  id="Path_2025"
                  data-name="Path 2025"
                  d="M119.857,271.451c-2.367.067-2.008-2.443-2.008-2.443v-13.06a4.3,4.3,0,0,1,3.138,0,2.734,2.734,0,0,1,1.313,2.443v10.617c0,2.949-2.443,2.443-2.443,2.443H103.434c-2.219,0-2.443-1.384-2.443-2.443,0-.01,0-.226,0-.226V255.306s-.2-3.261,2.645-3.224l11.428,0s.276,0,.275,0c1.034,0,2.511.352,2.511,2.791v1.079"
                  transform="translate(0 0)"
                  fill="none"
                  stroke={"articles" != page ? "#8a8a8a" : "var(--yellow)"}
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
                <rect
                  id="Rectangle_6270"
                  data-name="Rectangle 6270"
                  width="10.345"
                  height="5.747"
                  transform="translate(104.049 257.763)"
                  fill="none"
                  stroke={"articles" != page ? "#8a8a8a" : "var(--yellow)"}
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
                <path
                  id="Path_2026"
                  data-name="Path 2026"
                  d="M110.441,285.889H117.9"
                  transform="translate(-4.786 -19.176)"
                  fill="none"
                  stroke={"articles" != page ? "#8a8a8a" : "var(--yellow)"}
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </g>
            </svg>
          </NavItem>
          {/* <NavItem slug="events" title={title}>
            <BiCalendarWeek />
          </NavItem>{" "} */}
          <NavItem slug="fileUploader" title={title}>
            <CloudUploadOutlined />
          </NavItem>
          {/* <NavItem slug="customers" title={title}>
            <HiOutlineUsers />
          </NavItem> */}
          <NavItem slug="admins" title={title}>
            <HiOutlineUsers />
          </NavItem>

          {/* <NavItem slug="resources" title={title}>
            <VscSourceControl />
          </NavItem> */}
        </SideList>
        <SideList>
          <SideItem>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24.941"
              viewBox="0 0 25 24.941">
              <path
                id="Path_695"
                data-name="Path 695"
                d="M22.791,24.809a10.467,10.467,0,1,1,2.017-2.017L31,29.019l-2.178,1.922-6.03-6.132Zm-6.324-.729a7.613,7.613,0,1,0-7.613-7.613A7.613,7.613,0,0,0,16.467,24.08Z"
                transform="translate(-6 -6)"
                fill="#8a8a8a"
              />
            </svg>
          </SideItem>

          <NavItem slug="Notifications" title={title}>
            {" "}
            <Popover
              content={<Notification />}
              title={
                <NotifiHeader>
                  Notifications{" "}
                  <u style={{ fontSize: "14px", color: "var(--darkGray)" }}>
                    Mark all as read
                  </u>
                </NotifiHeader>
              }
              trigger="click"
              placement="rightBottom"
              visible={showNotification}
              onVisibleChange={showPopup}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25">
                  <path
                    id="Path_688"
                    data-name="Path 688"
                    d="M8.04,25.607a3.125,3.125,0,0,0,4.42,0l-4.422-4.42a3.125,3.125,0,0,0,0,4.42Zm7.5-19.3a7.892,7.892,0,0,1,9.934-1,1.436,1.436,0,0,1,.1-.116A1.578,1.578,0,1,1,27.689,7.53a7.887,7.887,0,0,1-1,9.931l-1.133,1.133A23.053,23.053,0,0,0,21.944,23.6l-2.358,4.712a1.072,1.072,0,0,1-1.83.292L4.389,15.242a1.076,1.076,0,0,1,.292-1.831L9.4,11.054A22.988,22.988,0,0,0,14.4,7.442l1.133-1.133Zm4.279,15.046a24.922,24.922,0,0,1,3.678-4.972l1.133-1.134a4.762,4.762,0,0,0,.6-5.992A7.564,7.564,0,0,0,23.89,7.914a4.771,4.771,0,0,0-6,.6L16.407,10a23.018,23.018,0,0,1-5,3.611L8.687,14.974l9.484,9.482,1.645-3.1Z"
                    transform="translate(-4 -4)"
                    fill="#8a8a8a"
                    fillRule="evenodd"
                  />
                </svg>
              </div>{" "}
            </Popover>
          </NavItem>
          {/* <Button type="primary"></Button> */}

          <NavItem slug="profile" index={true}>
            <UserImage src={require("../public/images/b.jpg")} />
            <Active />
          </NavItem>
        </SideList>
      </SideWrapper>
      {page === "" || page === "profile" ? null : (
        <div className="NavBar_ctrl">
          {page.includes("booking") ||
          page.includes("bookingdetalis") ||
          page.includes("createEvent") ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <Booking color="white" fill="white" />
                </div>
                Bookings
              </li>
              <li
                className={
                  page.includes("booking") || page.includes("bookingdetalis")
                    ? "active"
                    : ""
                }>
                <Link to="/booking">Books</Link>
              </li>
              <li
                className={
                  page === "events" || page.includes("createEvent")
                    ? "active"
                    : ""
                }>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          ) : (
            ""
          )}

          {
            // page.slice(0, 14) === page &&
            page.includes("events") || page.includes("event") ? (
              <ul>
                <li className="listTitle">
                  <div className="titleIcon">
                    <Booking color="white" fill="white" />
                  </div>
                  Bookings
                </li>
                <li className={page === "booking" ? "active" : ""}>
                  <Link to="/booking">Books</Link>
                </li>
                <li
                  className={
                    page.includes("events") || page.includes("event")
                      ? "active"
                      : ""
                  }>
                  <Link to="/events">Events</Link>
                </li>
              </ul>
            ) : (
              ""
            )
          }
          {page === "fileUploader" ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <CloudUploadOutlined
                    style={{ color: "white", fontSize: "25px" }}
                  />{" "}
                </div>
                files
              </li>
              <li className={page === "fileUploader" ? "active" : ""}>
                <Link to="/fileUploader">File upload</Link>
              </li>
              <li className={page === "resources" ? "active" : ""}>
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          ) : null}
          {page.includes("articles") || page.includes("createarticle") ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <BiCalendarWeek
                    style={{ color: "white", fontSize: "25px" }}
                  />{" "}
                </div>
                Media
              </li>
              <li
                className={
                  page.includes("articles") || page.includes("createarticle")
                    ? "active"
                    : ""
                }>
                <Link to="/articles">Articles</Link>
              </li>
            </ul>
          ) : null}
          {/* {`${"/"}` + page === location.pathname ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <BiCalendarWeek
                    style={{ color: "white", fontSize: "25px" }}
                  />{" "}
                </div>
                Media
              </li>
              <li className={page === "articles" ? "active" : ""}>
                <Link to="/articles">Articles</Link>
              </li>
            </ul>
          ) : null} */}
          {page === "resources" ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <CloudUploadOutlined
                    style={{ color: "white", fontSize: "25px" }}
                  />
                </div>
                files
              </li>
              <li className={page === "fileUploader" ? "active" : ""}>
                <Link to="/fileUploader">File upload</Link>
              </li>
              <li className={page === "resources" ? "active" : ""}>
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          ) : null}
          {page === "admins" ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <HiOutlineUsers color="white" size={26} />
                </div>
                People
              </li>
              <li className={page === "admins" ? "active" : ""}>
                <Link to="/admins">Admins</Link>
              </li>
              <li className={page === "customers" ? "active" : ""}>
                <Link to="/customers">Customers</Link>
              </li>
            </ul>
          ) : null}
          {page === "customers" ? (
            <ul>
              <li className="listTitle">
                <div className="titleIcon">
                  <HiOutlineUsers color="white" size={26} />
                </div>
                People
              </li>
              <li className={page === "admins" ? "active" : ""}>
                <Link to="/admins">Admins</Link>
              </li>
              <li className={page === "customers" ? "active" : ""}>
                <Link to="/customers">Customers</Link>
              </li>
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SideBar;

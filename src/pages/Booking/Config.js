// Booinkg page config
import { BiDotsVerticalRounded } from "react-icons/bi";
import React from "react";
import { Link } from "react-router-dom";
import { LoadDataByID } from "../../API";
import {
  Checkbox,
  Popover,
  Table,
  Tooltip,
  Tag,
  Space,
  Button,
  Input,
} from "antd";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const BookingColumns = [
  {
    title: "",
    dataIndex: "",
    render: () => <Checkbox />,
  },
  {
    title: "",
    dataIndex: "num",
  },
  {
    title: "Title",
    dataIndex: "Title",
    render: (item) => (
      <Link to={`/bookingdetalis/${item.id}`}>{item.title}</Link>
    ),
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Status",
    dataIndex: "Status",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    render: (Status) => (
      <>
        {Status.map((status) => {
          let color = "gold";

          if (status === "approved") {
            color = "green";
          } else if (status === "rejected") {
            color = "red";
          }

          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: "Starting Data",
    dataIndex: "StartingDate",
    render: (item) =>
      item.map((i) => {
        return (
          <div>
            {i}
            <br />
          </div>
        );
      }),
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "Ending Data",
    dataIndex: "EndingDate",
    render: (item) =>
      item.map((i) => {
        return (
          <div>
            {i}
            <br />
          </div>
        );
      }),
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "Space",
    dataIndex: "Space",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    render: (Space) => (
      <>
        {Space.map((space) => {
          let color;
          if (space === "Event Hall") {
            color = "green";
          } else {
            color = "blue";
          }
          return (
            <Tag color={color} key={space}>
              {space.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Creation Date",
    dataIndex: "CreationDate",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },

  {
    title: "Booked by",
    dataIndex: "BookedBy",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    key: 8,
    title: "",
    dataIndex: "edit",
    render: (item) => (
      <Popover
        content={() => (
          <div>
            <div className="listItem">Edit</div>
          </div>
        )}
        placement="left"
        title={false}>
        <BiDotsVerticalRounded
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "var(--lighterGray)",
          }}
        />
      </Popover>
    ),
  },
];
const getItem = (id, callback) => {
  LoadDataByID(
    `book/${id}`,
    (err, data) => {
      callback(data.data);
      // console.log(item);
    },
    (err) => {
      console.log();
    }
  );
};
export const BookingData = (data, callback) => {
  let Booking = [];
  console.log("consle", Booking);
  // data.map((item) => {
  //   Booking.push({
  //     Title: item.title,
  //     Status: [`${item.status}`],
  //     StartingDate: item.bookDates.map(
  //       (i) =>
  //         i.start.slice(0, 2) +
  //         " " +
  //         monthNames[
  //           i.start.split("-")[1] === 0
  //             ? i.start.split("-")[1].slice(1) - 1
  //             : i.start.split("-")[1] - 1
  //         ] +
  //         " " +
  //         i.start.split("-")[0]
  //     ),
  //     EndingDate: item.bookDates.map(
  //       (i) =>
  //         i.end.slice(0, 2) +
  //         " " +
  //         monthNames[
  //           i.end.split("-")[1] === 0
  //             ? i.end.split("-")[1].slice(1) - 1
  //             : i.end.split("-")[1] - 1
  //         ] +
  //         " " +
  //         i.end.split("-")[0]
  //     ),
  //     Space: [`${item.space.title}`],
  //     CreationDate:
  //       item.createdAt.slice(0, 2) +
  //       " " +
  //       monthNames[
  //         item.createdAt.split("-")[1] === 0
  //           ? item.createdAt.split("-")[1].slice(1) - 1
  //           : item.createdAt.split("-")[1] - 1
  //       ] +
  //       " " +
  //       item.createdAt.split("-")[0],
  //     BookedBy: item.user.name,
  //     // CreatedDate:
  //     //   item.createdAt.slice(0, 2) +
  //     //   " " +
  //     //   monthNames[
  //     //     item.createdAt.split("-")[1] === 0
  //     //       ? item.createdAt.split("-")[1].slice(1) - 1
  //     //       : item.createdAt.split("-")[1] - 1
  //     //   ] +
  //     //   " " +
  //     //   item.createdAt.split("-")[0],
  //     // Createdby: "images/user2.png",
  //   });
  // });
  callback(Booking);
};

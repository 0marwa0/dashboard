// Customer page config
import { BiDotsVerticalRounded } from "react-icons/bi";
import React from "react";
import { Checkbox, Tag, Popover } from "antd";
import { Popconfirm } from "antd";
import { ReactComponent as Notifiy } from "../../public/images/solid bell.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
export const CustomersColumns = [
  { key: 1, title: "", dataIndex: "", render: () => <Checkbox /> },
  {
    key: 2,
    title: "Full Name",
    dataIndex: "FullName",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  // {
  //   key: 3,
  //   title: "",
  //   dataIndex: "notify",

  //   render: (item) => (
  //     <div style={{ cursor: "pointer" }} onClick={() => item.onOpen()}>
  //       <IoMdNotificationsOutline color="var(--darkGray)" />
  //     </div>
  //   ),
  // },
  {
    key: 4,
    title: "Email",
    dataIndex: "Email",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: 5,
    title: "Phone Number",
    dataIndex: "PhoneNumber",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },

  {
    key: 6,
    title: "Date",
    dataIndex: "Date",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    key: 7,
    title: "Status",
    dataIndex: "Status",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
    render: (Status) => (
      <>
        {Status.map((status) => {
          let color;
          if (status === "Enabled") {
            color = "green";
          } else {
            color = "gold";
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
    title: "",
    dataIndex: "id",
    render: (user) => (
      <Popover
        content={() => (
          <div>
            <div className="listItem" onClick={() => user.edit(user.id)}>
              Edit
            </div>
            <div className="listItem" onClick={() => user.deactive(user.id)}>
              Disable
            </div>
            <div className="listItem" onClick={() => user.onOpen()}>
              Notify
            </div>
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
export const UsersData = (data, callback) => {
  let Users = [];

  // data.map((user) => {
  //   Users.push({
  //     FullName: user.name,
  //     Email: user.email,
  //     PhoneNumber: user.phone,
  //     Date:
  //       user.createdAt.slice(0, 2) +
  //       " " +
  //       monthNames[
  //         user.createdAt.split("-")[1] === 0
  //           ? user.createdAt.split("-")[1].slice(1) - 1
  //           : user.createdAt.split("-")[1] - 1
  //       ] +
  //       " " +
  //       user.createdAt.split("-")[0],

  //     Status: true ? ["Enabled"] : ["Disabled"],
  //   });
  // });

  callback(Users);
};

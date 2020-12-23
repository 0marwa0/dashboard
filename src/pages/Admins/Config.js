// Admins page config
import { BiDotsVerticalRounded } from "react-icons/bi";
import React from "react";
import { Checkbox, Tag } from "antd";
import { HiLockClosed } from "react-icons/hi";
import { Popconfirm } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { Popover, Button } from "antd";

export const AdminsColumns = [
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
  //   dataIndex: "pass",

  //   render: (item) => (
  //     <div onClick={() => item.onOpen(item.id, true)}>
  //       <HiLockClosed
  //         color="var(--lighterGray)"
  //         style={{ cursor: "pointer" }}
  //       />
  //     </div>
  //   ),
  // },
  {
    key: 4,
    title: "User name",
    dataIndex: "Username",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: 5,
    title: "Type",
    dataIndex: "Type",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
    render: (Type) => (
      <>
        {Type.map((type) => {
          let color;
          if (type === "Book Admin") {
            color = "gold";
          } else if (type === "Admin") {
            color = "blue";
          }
          return (
            <Tag color={color} key={type}>
              {type.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    key: 6,
    title: "Branch",
    dataIndex: "Branch",
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
          let color = "green";
          if (status != "Enabled") {
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
  // {
  //   key: 9,
  //   title: "",
  //   dataIndex: "edit",

  //   render: (item) => (
  //     <div onClick={() => item.onOpen(item.id, true)}>
  //       <FaRegEdit color="var(--lighterGray)" style={{ cursor: "pointer" }} />
  //     </div>
  //   ),
  // },
  {
    key: 8,
    title: "",
    dataIndex: "id",
    render: (user) => (
      // <Popconfirm
      //   title="Deactivate admin？"
      //   okText="Yes"
      //   onConfirm={

      //     // user.deactive(user.id)
      //   }
      //   cancelText="No">
      <Popover
        content={() => (
          <div>
            <div className="listItem" onClick={() => user.deactive(user.id)}>
              Disable
            </div>
            <div
              className="listItem"
              onClick={() => user.onedit(user.id, user)}>
              Edit
            </div>
            {/* <div
              className="listItem"
              // onClick={() =>

              // user.onOpen(user.id, true)}
            >
              Re set password
            </div> */}
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
      // </Popconfirm>
    ),
  },
];

export const AdminsData = (data, callback) => {
  let Admins = [];
  data.map((admin) => {
    Admins.push({
      FullName: admin.name,
      Username: admin.username,
      Type: admin.type === 1 ? ["Book Admin"] : ["Book Admin"],
      Branch: "Baghdad",
      Status: true ? ["Enabled"] : ["Disabled"],
    });
  });
  callback(Admins);
};

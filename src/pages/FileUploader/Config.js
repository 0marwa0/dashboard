import { BiDotsVerticalRounded } from "react-icons/bi";
import { UserImage } from "../Sidebar";
import { BsTrashFill, BsTrash } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { Popconfirm } from "antd";

import { FiEdit } from "react-icons/fi";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Checkbox, Tag, Tooltip, Popover } from "antd";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";

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
export const FilUploadedColumns = [
  { key: "1", title: "", dataIndex: "", render: () => <Checkbox /> },
  {
    key: "2",
    title: "File Title",
    dataIndex: "FileTitle",
    render: (item) => item,
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },

  {
    key: "3",
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
          if (type === "pdf" || type == "PDF") {
            color = "orange";
          } else if (type === "jpg" || type == "JPG") {
            color = "blue";
          } else {
            color = "green";
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
    key: "4",
    title: "Size",
    dataIndex: "Size",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    key: "5",
    title: "Uploaded Date",
    dataIndex: "UploadedDate",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: "6",
    title: "Uploaded by",
    dataIndex: "image",
    render: (theImageURL) => (
      <div style={{ width: "50px" }}>
        <UserImage
          alt={theImageURL}
          src={require("../../public/images/user2.png")}
        />
      </div>
    ),
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  // {
  //   key: "7",
  //   title: "",
  //   dataIndex: "id",
  //   render: (item) => (
  //     <div className="ResourcesIcon">
  //       <div className="icon">
  //         <Popover
  //           content={<div>Copied !</div>}
  //           // title={}
  //           onVisibleChange={(e) => item.copy(e, null)}
  //           trigger="click"
  //           visible={item.url === item.copiedUlr && item.copied ? true : false}
  //           placement="top">
  //           {item.copiedUlr + "m" + item.copied}
  //           <CopyToClipboard text={item.url} onCopy={(e) => item.copy(e)}>
  //             <FaCopy fontSize="16" style={{ cursor: "pointer" }} />
  //           </CopyToClipboard>{" "}
  //         </Popover>
  //       </div>
  //       <div className="icon">
  //         <a href={item.url} target="_blank">
  //           <FiEdit fontSize="16" />
  //         </a>
  //       </div>
  //       <div className="icon">
  //         <Popconfirm
  //           title="Are you sure？"
  //           okText="Yes"
  //           onConfirm={() => item.delete()}
  //           cancelText="No">
  //           <BsTrashFill fontSize="16" style={{ cursor: "pointer" }} />
  //         </Popconfirm>
  //       </div>
  //     </div>
  //   ),
  // },
  {
    key: 8,
    title: "",
    dataIndex: "id",
    render: (item) => (
      <Popover
        content={() => (
          <div>
            <CopyToClipboard text={item.url}>
              <div className="listItem" onClick={(e) => item.copy(e, null)}>
                Copy
              </div>
            </CopyToClipboard>
            <div className="listItem" onClick={() => item.delete()}>
              Delete
            </div>
            <div className="listItem">
              <a href={item.url} target="_blank">
                {" "}
                Preview
              </a>
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
const onDelete = (id) => {
  console.log(id, "id to deleted");
};
const onCopy = (id) => {
  console.log(id, "id to copy");
};

export const FilesData = (data, callback) => {
  let Files = [];

  data.map((file) => {
    Files.push({
      id: { url: file.link, id: file.id },
      FileTitle: file.name,
      Type: [`${/[.]/.exec(file.name) ? /[^.]+$/.exec(file.name) : undefined}`],
      Size: "",
      UploadedDate:
        file.createdAt.slice(0, 2) +
        " " +
        monthNames[
          file.createdAt.split("-")[1] === 0
            ? file.createdAt.split("-")[1].slice(1) - 1
            : file.createdAt.split("-")[1] - 1
        ] +
        " " +
        file.createdAt.split("-")[0],
      image: "",
      // Status: true ? ["Enabled"] : ["Disabled"],
    });
  });

  callback(Files);
};

// Resource Config
import { CopyToClipboard } from "react-copy-to-clipboard";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { UserImage } from "../Sidebar";
import { BsTrashFill, BsTrash } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Popconfirm } from "antd";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";
import { removeItem } from "../../API";
import React from "react";
import {
  Checkbox,
  Popover,
  Progress,
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
export const ResourcesColumns = [
  {
    key: "1",
    title: "",
    dataIndex: "",
    render: () => <Checkbox />,
  },
  {
    key: "2",
    title: "Title",
    dataIndex: "Title",
    render: (item) => item,
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: "3",
    title: "Descriptions",
    dataIndex: "Descriptions",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },

  {
    key: "4",
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
          if (type === "PDF") {
            color = "orange";
          } else if (type === "JPG") {
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
    key: "5",
    title: "Size",
    dataIndex: "Size",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    key: "6",
    title: "UploadedDate",
    dataIndex: "UploadedDate",
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: "7",
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
  //   key: "8",
  //   title: "",
  //   dataIndex: "id",
  //   render: (item) => (
  //     <div className="ResourcesIcon">
  //       <div className="icon">
  //         <FaCopy fontSize="16" />
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
  //           placement="left"
  //           onConfirm={() => item.delete()}
  //           cancelText="No"
  //         >
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
            {" "}
            <CopyToClipboard text={item.url}>
              <div className="listItem">Copy</div>
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

const onCopy = (id) => {
  console.log(id, "id to copy");
};
// export const ResourcesData = (data, callback) => {
//   let Resources = [];

//   data.map((item) => {
//     Resources.push({
//       id: {
//         url: item.url,
//         id: item.id,
//       },
//       Title: item.name,

//       Descriptions: item.descriptionAr,
//       Type: ["PDF"],
//       Size: "12.2mb",

//       UploadedDate:
//         item.createdAt.slice(0, 2) +
//         " " +
//         monthNames[
//           item.createdAt.split("-")[1] === 0
//             ? item.createdAt.split("-")[1].slice(1) - 1
//             : item.createdAt.split("-")[1] - 1
//         ] +
//         " " +
//         item.createdAt.split("-")[0],
//       image: "",
//     });
//   });

//   callback(Resources);
// };

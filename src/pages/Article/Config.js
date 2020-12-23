// Article Config //

import { BiDotsVerticalRounded } from "react-icons/bi";
import { UserImage } from "../Sidebar";
import { Checkbox, Popover } from "antd";
import { Mesg, FailedMesg } from "../../API/APIMessage";
import { Link } from "react-router-dom";

import { LoadData } from "../../API";
import styled from "styled-components";
import React from "react";

const ArticleImage = styled.img`
  width: 55px;
  height: 50px;
  border-radius: 4px;
`;
const ArticlesColumns = [
  {
    key: "1",
    title: "",
    dataIndex: "",
    render: () => <Checkbox />,
  },
  {
    key: "2",
    title: "",
    dataIndex: "image",

    render: (theImageURL) => (
      <div style={{ width: "50px" }}>
        <ArticleImage
          alt="Article image"
          src={theImageURL}
          onError={(e) =>
            (e.target.src = require("../../public/images/defaultImg.jpg"))
          }
        />
      </div>
    ),
  },
  {
    key: "3",
    title: "Title",
    dataIndex: "Title",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    key: "4",
    title: "Created Date",
    dataIndex: "CreatedDate",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },

  {
    key: "5",
    title: "Created by",
    dataIndex: "Createdby",
    // render: (theImageURL) => (
    //   <div style={{ width: "50px" }}>
    //     <UserImage
    //       alt={theImageURL}
    //       src={theImageURL}
    //       onError={(e) =>
    //         (e.target.src = require("../../public/images/defaultImg.jpg"))
    //       }
    //     />
    //   </div>
    // )
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: 6,
    title: "",
    dataIndex: "id",
    render: (id) => (
      <Popover
        content={() => (
          <div className="listItem">
            <Link to={`/articles/${id}`}>Edit</Link>
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

export const ArticlesData = (data, callback) => {
  // let Articles = [];
  // data.map((item) => {
  //   Articles.push({
  //     image: item.image,
  //     Title: item.title,
  //     CreatedDate:
  //       item.createdAt.slice(0, 2) +
  //       " " +
  //       monthNames[
  //         item.createdAt.split("-")[1] === 0
  //           ? item.createdAt.split("-")[1].slice(1) - 1
  //           : item.createdAt.split("-")[1] - 1
  //       ] +
  //       " " +
  //       item.createdAt.split("-")[0],
  //     Createdby: "Admins.map((i) => i.id === item.createdby).username",
  //   });
  // });
  // callback(Articles);
};
export default ArticlesColumns;

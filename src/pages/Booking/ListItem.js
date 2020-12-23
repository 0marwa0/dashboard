// List item Page //

import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styled, { keyframes } from "styled-components";
import { ArticlesData } from "../../fakeData";
import { BsTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { Popconfirm } from "antd";

import { useHistory, Link } from "react-router-dom";
import { ReactComponent as EditICon } from "../../public/images/solid edit.svg";
import { ReactComponent as ItemIcon } from "../../public/images/itemIcon.svg";
import { PageText, PageNmber, IconCss, Pagination } from "../shared/CustomPage";
import { ReactComponent as TrashICon } from "../../public/images/solid trash-alt.svg";
import { LoadData, addData, addFile } from "../../API";
import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";

const ListItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 15px;
`;

const ItemActions = styled.span`
  display: flex;
  padding: 5px 0;
  padding-left: 13px;
  justify-content: space-between;
  flex-direction: row;
  font-size: 13px;
  visibility: hidden;
`;
const Item = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 7px;
`;

const ItemOverlay = styled.div`
  border-radius: 7px;
  width: 100%;
  height: auto;
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.8)
  );

  -webkit-transition: background 1s ease-out;
  -moz-transition: background 1s ease-out;
  -o-transition: background 1s ease-out;
  transition: background 1s ease-out;

  background-size: 1px 500px;
  border-radius: 10px;

  width: 100%;
  height: 100%;
`;

const ItemHolder = styled.div`
  width: 100%;
  height: 280px;
  position: relative;

  &:hover ${ItemActions} {
    visibility: visible;
  }

  &:hover ${ItemOverlay} {
    background-position: 100% 100%;
  }
`;

const ListImg = styled.img`
  with: 20px;
  height: 20px;
  border-radius: 50%;
`;
const Title = styled.div`
  color: white;
  font-size: 0.9vw;
  font-weight: bold;
  width: 80%;
  height: 33px;
  overflow: hidden;
  margin-bottom: 7px;
  line-height: 1.3em;
`;
const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: white;
  font-size: 9px;
`;
const ListIcon = styled.div`
  border: 1px solid white;
  gap: 5px;
  display: flex;
  height: 26px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  margin-right: 13px;
  cursor: pointer;
  margin-top: 9px;
  padding: 1px 10px;
  color: white;
`;

const ListBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  margin-top: 140px;
`;

const BottomText = styled.div`
  display: flex;
  opacity: 1;

  justify-content: space-between;
`;
const ListItem = (props) => {
  console.log(props.data, "article list");
  const [currentPage, setcurrentPage] = useState(1);
  const [pagePerOnce, setpagePerOnce] = useState(6);

  const prevPage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };
  const totalPge = Math.ceil(props.data.length / pagePerOnce);

  const nextPage = () => {
    if (currentPage != totalPge) {
      setcurrentPage(currentPage + 1);
    }
  };
  const indexOfLastPage = currentPage * pagePerOnce;
  const indexOfFirstPage = indexOfLastPage - pagePerOnce;
  const Data = props.data.slice(indexOfFirstPage, indexOfLastPage);
  const [Loading, setLoading] = useState(false);

  const onEdit = (id) => {
    setLoading(true);

    let data = {
      title: "test",
      description: "test",
      platform: "web",
      publish: true,
      image: "file",
      lang: "ar",
      gov: "baghdad",
    };
    addData(
      `article/edit/${id}`,
      data,
      (mesg, Data) => {
        SuccessMesg("Edit Article Done!");
        setLoading(false);
      },
      (err) => {
        setLoading(false);

        FailedMesg(err);
      }
    );
  };

  const onDelete = (id) => {
    setLoading(true);
    let data = {
      publish: false,
    };

    addData(
      `article/edit/${id}`,
      data,
      (mesg, Data) => {
        SuccessMesg("unpublish Article Done!");
        setLoading(false);
      },
      (err) => {
        setLoading(false);

        FailedMesg(err);
      }
    );
  };
  return (
    <div>
      <ListItemWrapper>
        {Data.map((item, i) => {
          return (
            <ItemHolder>
              <Item
                src={item.image}
                onError={(e) =>
                  (e.target.src = require("../../public/images/defaultImg.jpg"))
                }
              />
              <ItemOverlay>
                <ItemActions>
                  <div style={{ marginTop: "9px" }}>
                    <ItemIcon />
                  </div>
                  <span style={{ display: "flex" }}>
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      onConfirm={() => onDelete(item.id)}
                      cancelText="No">
                      <ListIcon>
                        <TrashICon />
                        <div>Delete</div>
                      </ListIcon>
                    </Popconfirm>
                    <Link to={`/articles/${item.id}`}>
                      <ListIcon
                      // onClick={() => props.history.push(`/article/${item.id}`)}
                      >
                        <EditICon />
                        <div> Edit</div>
                      </ListIcon>
                    </Link>
                  </span>
                </ItemActions>
                <ListBottom>
                  <Title>{item.Title}</Title>
                  <BottomText>
                    <Date>
                      <FaCalendarAlt color="var(--yellow)" size={8} />
                      {item.CreatedDate}
                    </Date>
                    <ListImg
                      src={require(`../../public/images/user2.png`)}
                      onError={(e) =>
                        (e.target.src = require("../../public/images/defaultImg.jpg"))
                      }
                    />
                  </BottomText>
                </ListBottom>
              </ItemOverlay>
            </ItemHolder>
          );
        })}
      </ListItemWrapper>
      <Pagination noborder>
        <PageText>
          View search of {Data.length} from {props.data.length} search we got .
        </PageText>
        <PageNmber>
          <IconCss active={currentPage > 1 ? true : false}>
            <LeftOutlined
              onClick={prevPage}
              style={{
                cursor: currentPage > 1 ? "pointer" : "not-allowed",
              }}
            />
          </IconCss>
          <p style={{ marginTop: "12px" }}>
            {currentPage}/ {totalPge}
          </p>
          <IconCss active={currentPage != totalPge ? true : false}>
            <RightOutlined
              onClick={nextPage}
              style={{
                cursor: currentPage != totalPge ? "pointer" : "not-allowed",
              }}
            />
          </IconCss>
        </PageNmber>
      </Pagination>
    </div>
  );
};

export default ListItem;

import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillGridFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { Col, Row, Table, Input } from "antd";
import React, { useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { TableLoading } from "../shared/Loading";
import { ButtonStyled } from "../shared/SharedStyle";
import { BiImport, BiExport } from "react-icons/bi";
import { ReactComponent as ExportIcon } from "../../public/images/export.svg";
import { ReactComponent as ImportIcon } from "../../public/images/import.svg";
import { ReactComponent as PlusIcon } from "../../public/images/plus.svg";

import Progress from "react-progress-2";

import { FiFilter } from "react-icons/fi";
import {
  CustomButton,
  EmptyText,
  LoadingText,
} from "../shared/SharedComponents";
import { AiOutlinePlus } from "react-icons/ai";
import SideBar from "../Sidebar";
import styled from "styled-components";
import { ReactComponent as Upload } from "../../public/images/solid cloud-upload-alt.svg";
import { ReactComponent as Notifiy } from "../../public/images/solid bell.svg";
import { ReactComponent as TableIcon } from "../../public/images/Table.svg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ListItem from "../Booking/ListItem";
export const CustomPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 25px;
  margin-left: 423px;

  margin-right: 35px;
`;
export const PageContentFix = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 25px;
  margin-left: 123px;

  margin-right: 35px;
`;
export const PageBtn = styled.div`
  display: flex;
  flex-cirection: row;
  justify-content: space-between;
  margin-bottom: 17px;
  width: 100%;
`;
export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  algin-items: cneter;
  justify-content: flex-end;
  margin-right: ${(props) => (props.space ? "10px" : "0")};
`;
export const PageTitle = styled.div`
  color: var(--black);
  font-size: 30px;
  font-weight: bold;
  padding: 10px 0;
`;
export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  color: var(--darkGray);
  border: ${(props) =>
    props.noborder ? "none" : " 1px solid var(--lighterGray)"};
  border-radius: 0 0 10px 10px;
  border-top: none;
`;
export const PageText = styled.div`
  color: var(--darkGray);
  margin-top: 12px;
`;
export const PageNmber = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const IconCss = styled.span`
  color: ${(props) => (props.active ? "var(--yellow)" : "var(--textGray)")};
`;
function CustomPage(props) {
  const ref = useRef(null);

  let pageTitle = props.pageTitle;
  const columns = props.columns;
  const data = props.data;
  // const [next, setNext] = useState(true);
  // const [prev, setprev] = useState(false);

  const [showList, setShowList] = useState(false);
  const showListItem = () => {
    setShowList(true);
    hideTableItem();
  };
  const hideListItem = () => {
    setShowList(false);
  };
  const [showTable, setShowTable] = useState(true);
  const showTableItem = () => {
    setShowTable(true);
    hideListItem();
  };
  const hideTableItem = () => {
    setShowTable(false);
  };
  const [currentPage, setcurrentPage] = useState(1);
  const [pagePerOnce, setpagePerOnce] = useState(20);
  const [pageNumber, setpageNumber] = useState(0);
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
  let Data = props.data.slice(indexOfFirstPage, indexOfLastPage);
  let pageTitleName;
  if (pageTitle === "booking") {
    pageTitleName = props.pageTitle;
  } else {
    pageTitleName = props.pageTitle.substring(0, props.pageTitle.length - 1);
  }

  useEffect(() => {
    if (props.Loading) {
      ref.current.staticStart();
    } else {
      ref.current.complete();
    }
  }, []);

  return (
    <CustomPageWrapper>
      <LoadingBar color="var(--yellow)" ref={ref} shadow={true} />

      <SideBar title={props.pageTitle} />
      <PageContent>
        <Row>
          <Col>
            <PageTitle>
              {props.pageTitle.charAt(0).toUpperCase() +
                props.pageTitle.slice(1)}
            </PageTitle>
          </Col>
        </Row>
        <Row>
          <PageBtn>
            <ButtonGroup space>
              {props.pageTitle === "articles" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}>
                  <svg
                    cursor="pointer"
                    onClick={showTableItem}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.5"
                    height="22.5"
                    viewBox="0 0 22.5 22.5">
                    <g
                      id="Group_8468"
                      data-name="Group 8468"
                      transform="translate(0.431 1.074)">
                      <rect
                        id="Rectangle_6614"
                        data-name="Rectangle 6614"
                        width="21"
                        height="8"
                        rx="2"
                        transform="translate(0.319 -0.324)"
                        fill={showTable ? "var(--yellow)" : "white"}
                        stroke={
                          showTable ? "var(--yellow)" : "var(--lighterGray)"
                        }
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                      <rect
                        id="Rectangle_6615"
                        data-name="Rectangle 6615"
                        width="21"
                        height="8"
                        rx="2"
                        transform="translate(0.319 12.676)"
                        fill={showTable ? "var(--yellow)" : "white"}
                        stroke={
                          showTable ? "var(--yellow)" : "var(--lighterGray)"
                        }
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>

                  <svg
                    onClick={showListItem}
                    cursor="pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32.011"
                    height="32.011"
                    viewBox="0 0 32.011 32.011">
                    <g
                      id="Group_8458"
                      data-name="Group 8458"
                      transform="translate(32.011 32.011) rotate(180)">
                      <path
                        id="Path_2839"
                        data-name="Path 2839"
                        d="M0,0H32.011V32.011H0Z"
                        fill="none"
                      />
                      <g
                        id="Group_8459"
                        data-name="Group 8459"
                        transform="translate(5.335 5.335)">
                        <rect
                          id="Rectangle_6614"
                          data-name="Rectangle 6614"
                          width="8"
                          height="8"
                          rx="2"
                          transform="translate(0.665 -0.324)"
                          fill={showList ? "var(--yellow)" : "white"}
                          stroke={
                            showList ? "var(--yellow)" : "var(--lighterGray)"
                          }
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                        <rect
                          id="Rectangle_6618"
                          data-name="Rectangle 6618"
                          width="8"
                          height="8"
                          rx="2"
                          transform="translate(0.665 12.676)"
                          fill={showList ? "var(--yellow)" : "white"}
                          stroke={
                            showList ? "var(--yellow)" : "var(--lighterGray)"
                          }
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                        <rect
                          id="Rectangle_6616"
                          data-name="Rectangle 6616"
                          width="8"
                          height="8"
                          rx="2"
                          transform="translate(13.665 -0.324)"
                          fill={showList ? "var(--yellow)" : "white"}
                          stroke={
                            showList ? "var(--yellow)" : "var(--lighterGray)"
                          }
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                        <rect
                          id="Rectangle_6617"
                          data-name="Rectangle 6617"
                          width="8"
                          height="8"
                          rx="2"
                          transform="translate(13.665 12.676)"
                          fill={showList ? "var(--yellow)" : "white"}
                          stroke={
                            showList ? "var(--yellow)" : "var(--lighterGray)"
                          }
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              ) : (
                ""
              )}
              <Input
                loading={props.Loading}
                onChange={(e) => props.HandleSearch(e)}
                style={{
                  borderRadius: "6px",
                  border: "1px solid var(--lighterGray)",
                  height: "30px",

                  width: "220px",
                }}
                placeholder="Search"
              />
              {props.pageTitle === "resources" ? (
                ""
              ) : props.pageTitle === "file Uploader" ? (
                ""
              ) : (
                <CustomButton
                  lable="Filter"
                  filter
                  loading={props.Loading}
                  fun={props.filter}>
                  <FiFilter />
                </CustomButton>
              )}
            </ButtonGroup>
            <ButtonGroup>
              {props.pageTitle === "resources" ? (
                ""
              ) : props.pageTitle === "file Uploader" ? (
                ""
              ) : props.pageTitle === "customers" ? (
                ""
              ) : props.pageTitle === "admins" ? (
                ""
              ) : props.pageTitle === "articles" ? (
                ""
              ) : (
                <CustomButton lable="Import" loading={props.Loading}>
                  <ImportIcon />
                </CustomButton>
              )}

              <CustomButton
                lable="Export"
                loading={props.Loading}
                fun={props.export}>
                <ExportIcon />
              </CustomButton>

              {pageTitleName == "customer" ? (
                <CustomButton
                  main
                  lable={`Notify Users`}
                  loading={props.Loading}
                  pageTitle={pageTitle}
                  onOpen={() => props.onOpenModal(true)}>
                  <Notifiy />
                </CustomButton>
              ) : pageTitleName === "resource" ||
                pageTitleName === "file Uploade" ? (
                <CustomButton
                  main
                  lable={`Upload`}
                  pageTitle={pageTitle}
                  loading={props.Loading}
                  onOpen={() => props.onOpenModal(true)}>
                  <Upload />
                </CustomButton>
              ) : pageTitleName === "event" ? (
                <CustomButton
                  main
                  lable={
                    `New Booking `
                    // ${
                    //   pageTitleName.charAt(0).toUpperCase() +
                    //   pageTitleName.slice(1)
                    // }
                  }
                  pageTitle={pageTitle}
                  loading={props.Loading}
                  onOpen={() => props.onOpenModal(true)}>
                  <PlusIcon />
                </CustomButton>
              ) : pageTitleName === "articles" ? null : (
                <ButtonStyled
                  main
                  pageTitle={pageTitle}
                  loading={props.Loading}
                  onClick={props.onOpenModal}>
                  <PlusIcon />
                  {`New ${
                    pageTitleName.charAt(0).toUpperCase() +
                    pageTitleName.slice(1)
                  }`}
                </ButtonStyled>
              )}
              {/* {pageTitleName === "articles" ? null : (
                <CustomButton
                  main
                  lable={`New ${
                    pageTitleName.charAt(0).toUpperCase() +
                    pageTitleName.slice(1)
                  }`}
                  pageTitle={pageTitle}
                  loading={props.Loading}
                  onOpen={() => props.onOpenModal(true)}>
                  <PlusIcon />
                </CustomButton>
              )} */}
            </ButtonGroup>
          </PageBtn>
        </Row>

        <Row>
          <Col style={{ width: "100%" }}>
            {showTable ? (
              <div>
                <Table
                  columns={columns}
                  rowClassName="tableRow"
                  pagination={false}
                  dataSource={Data}
                  locale={{
                    emptyText: TableLoading(props.Loading, props.Item),

                    //EmptyText(props.Loading, props.Item),
                  }}
                />
                <Pagination>
                  <PageText>
                    View search of {Data.length} from {props.data.length} search
                    we got .
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
                          cursor:
                            currentPage != totalPge ? "pointer" : "not-allowed",
                        }}
                      />
                    </IconCss>
                  </PageNmber>
                </Pagination>
              </div>
            ) : showList ? (
              <ListItem data={props.data} />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </PageContent>
    </CustomPageWrapper>
  );
}

export default CustomPage;

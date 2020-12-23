import React, { useEffect, useState, useRef } from "react";

import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
import { LoadData, addData } from "../../API";
import EditBooking from "./EditBooking";
import { monthNames } from "../shared/assets";
import { Skeleton, Input } from "antd";
import "../../App.css";
import TimeAgo from "react-simple-timeago";
import { DateName, getTime } from "../Dashboard";
import Moment from "react-moment";
import LoadingBar from "react-top-loading-bar";
import BookingModal from "../Dashboard/BookingModal";
import { Col, Row, Menu, Dropdown } from "antd";
import { ReactComponent as Edit } from "../../public/images/edit.svg";
import { CustomPageWrapper, PageContent } from "../shared/CustomPage";
import { TextLoadS } from "../shared/SharedComponents";
import { DownOutlined } from "@ant-design/icons";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SideBar from "../Sidebar";
import { PageBack } from "../Profile";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonStyled } from "../shared/SharedStyle";
import { GlobalStyle } from "../Dashboard";
import { UserImage } from "../Sidebar";
import { BsThreeDotsVertical } from "react-icons/bs";
const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 20px 0;
  align-items: center;
`;
const Wrapper = styled(Row)`
  background-color: white;
  width: 95%;
  borderradius: 5px;

  padding: 0 20px;
`;
const GrayText = styled.div`
  font-size: 13px;
  color: #b5b5b5;
  width: 100%;
`;
const EventDetails = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 16px;
  width: 100%;

  padding-top: 20px;
  padding-right: 25px;
  padding-bottom: 20px;
`;
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 17px;
  width: 100%;
`;
const Activity = styled.div`
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 40px;
  border-bottom: 1px solid var(--lighterGray);
`;
const ActivityItem = styled.div`
  display: flex;

  gap:30px
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;

  align-items: center;
`;
const BoldText = styled.div`
  font-weight: bold;
  font-size: 18px;
`;
const Date = styled.div`
  display: grid;
  width: 100%;
  height: auto;
  padding: 12px;
  font-size: 17px;
  background-color: ${(props) => (props.odd ? "var(--lightGray)" : "none")};
  border-bottom: ${(props) =>
    props.item ? "1px solid var(--lighterGray)" : "none"};
  grid-template-columns: 1fr 1fr 1fr auto;
`;
const DateInfo = styled.div`
  border: 1px solid var(--lighterGray);
  border-radius: 6px;
  border-bottom: none;
  margin-bottom: 15px;
`;
const UserHolder = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;

  justify-content: center;
`;
const BookingActions = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  padding-bottom: 10px;
`;
const Reject = styled.div`
  background-color: var(--lightRed);
  color: var(--red);
  padding: 3px 13px;
  height: 30px;
  border-radius: 6px;
  font-size: 17px;
  cursor: pointer;
`;
const Accept = styled.div`
  background-color: var(--LightGreen);
  color: var(--darkGreen);
  padding: 3px 13px;
  height: 30px;
  border-radius: 6px;
  font-size: 17px;
  cursor: pointer;
`;
const Pending = styled.div`
  color: var(--orange);
  font-size: 16px;
`;
function Index(props) {
  let history = useHistory();
  let location = useLocation();
  const [Id, setId] = useState("");
  const [data, setdata] = useState({});
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Designs, setDesigns] = useState([]);
  const [BookingStatus, setBookingStatus] = useState(false);
  const setBooking = (status) => {
    setBookingStatus(status);
  };
  let { id } = useParams();
  const onOpenModal = (open) => {
    setOpen(open);
    //callback()
  };
  useEffect(() => {
    // if (localStorage.getItem("station_token")) {
    //   if (Loading) {
    //     ref.current.staticStart();
    //   } else {
    setId(id);

    loadDesigns();
    getDetalis();
    //ref.current.complete();
    //}
    // } else {
    //   props.history.push("/login");
    // }
  }, []);
  const getDetalis = () => {
    setLoading(true);

    LoadData(
      `book/${id}`,
      (err, data) => {
        setLoading(false);

        setdata(data.data);
        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
      }
    );
  };

  const Recject = () => {
    let data = {
      id: Id,
    };
    setLoading(true);
    addData(
      "book/reject",
      data,
      (mesg, Data) => {
        SuccessMesg("Reservation Rejected !");
        setLoading(false);
        setId("");
        props.history.push("/");
      },
      (err) => {
        setLoading(false);
        setId("");

        FailedMesg(err);
      }
    );
  };
  const Approve = () => {
    let data = {
      id: Id,
    };

    setLoading(true);
    addData(
      "book/approve",
      data,
      (mesg, Data) => {
        SuccessMesg("Reservation Approved!");
        setLoading(false);
        setId("");
        setBooking(true);
      },
      (err) => {
        setLoading(false);
        setId("");

        FailedMesg(err);
      }
    );
  };

  const loadDesigns = () => {
    setLoading(true);
    LoadData(
      "space/designs",
      (err, data) => {
        setLoading(false);
        setDesigns(data.data);

        if (err) {
          Mesg(err);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
      }
    );
  };
  const Empty = styled.div`
    width: 45px;
    text-align: right;
  `;
  const PageTitle = styled.div`
    display: flex;
    color: var(--black);
    font-size: 30px;
    font-weight: bold;
  `;
  const Divider = styled.div`
    width: 10px;
    height: 25px;
  `;
  const Title = styled.div`
    display: flex;
    gap: 10px;
    height: auto;

    flex-direction: column;
  `;
  let Data = data ? data : {};
  let design = Designs.filter((item) => item.id != data.designId);
  return (
    <CustomPageWrapper>
      {/* <LoadingBar color="var(--yellow)" ref={ref} shadow={true} /> */}

      {/* <GlobalStyle /> */}
      <SideBar />

      <PageContent>
        <div style={{ marginTop: "40px" }}>
          <Wrapper>
            <PageActions>
              <Title>
                <Link to="/booking">
                  <PageBack>
                    <BsArrowLeft />
                    <div>Booking</div>
                  </PageBack>
                </Link>
                <PageTitle>
                  {Loading ? <TextLoadS /> : Data.title}
                  <Empty>
                    <Edit onClick={onOpenModal} style={{ cursor: "pointer" }} />
                  </Empty>
                </PageTitle>
              </Title>
              {props.event ? (
                <div
                  style={{
                    marginTop: "50px",
                  }}>
                  <ButtonStyled main>View Event</ButtonStyled>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",

                    marginTop: "50px",
                  }}>
                  <div
                    style={{ fontSize: "20px" }}
                    className={
                      Data.status === "approved"
                        ? "approve"
                        : Data.status === "rejected"
                        ? "reject"
                        : Data.status === "pending"
                        ? "pending"
                        : ""
                    }>
                    {" "}
                    <spna>
                      {Data.status
                        ? Data.status.charAt(0).toUpperCase() +
                          Data.status.slice(1)
                        : ""}
                      <DownOutlined
                        style={{ fontSize: "10px", margin: " 0 5px" }}
                      />
                    </spna>
                  </div>
                  {!props.event ? (
                    Data.status === "pending" ? (
                      <Reject onClick={Recject}>Reject</Reject>
                    ) : null
                  ) : null}

                  {!props.event ? (
                    Data.status === "pending" ? (
                      <Accept onClick={Approve}>Accept</Accept>
                    ) : null
                  ) : null}
                  {!Data.isEvent || Data.status === "rejected" ? (
                    <ButtonStyled
                      Loading={Loading}
                      onClick={() => history.push(`/createEvent/${id}`)}
                      main>
                      Create Event
                    </ButtonStyled>
                  ) : (
                    <ButtonStyled main>View Event</ButtonStyled>
                  )}
                </div>
              )}
            </PageActions>

            <BookingActions>
              {/* {BookingStatus ? (
                <div>Published</div>
              ) : ( )} */}
              {/* <Dropdown> */}

              {/* </Dropdown> */}
            </BookingActions>
            <Row
              style={{
                borderTop: "1px solid var(--lighterGray)",
                display: "flex",
                width: "100%",
              }}>
              <Col
                style={{
                  width: "70%",
                  paddingTop: "40px",
                  paddingBottom: "30px",
                  paddingRight: "50px",
                  borderRight: "1px solid var(--lighterGray)",
                }}>
                <BoldText>Event Details</BoldText>
                <EventDetails>
                  <DetailItem>
                    <GrayText> Space</GrayText>

                    <div>
                      {Loading ? (
                        <TextLoadS />
                      ) : data.space ? (
                        data.space.title
                      ) : (
                        ""
                      )}
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText> Cooffee Break</GrayText>

                    <div>
                      {Loading ? (
                        <TextLoadS />
                      ) : data.coffeebreak ? (
                        data.coffeebreak.title
                      ) : (
                        ""
                      )}
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText> Hall Design</GrayText>

                    {Loading ? <TextLoadS /> : design[0] ? design[0].name : ""}
                  </DetailItem>

                  <DetailItem>
                    <GrayText> Date</GrayText>

                    <div>Event Hall</div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText> No. of People</GrayText>

                    <div>{Loading ? <TextLoadS /> : Data.people}</div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText> Entity Type</GrayText>

                    <div>
                      {Loading ? (
                        <TextLoadS />
                      ) : data.booktype ? (
                        data.booktype.name
                      ) : (
                        ""
                      )}
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText> Total Price</GrayText>

                    <div>
                      {" "}
                      {Loading ? <TextLoadS /> : "$" + Data ? Data.price : ""}
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText>Received</GrayText>

                    <div>
                      {Loading ? (
                        <TextLoadS />
                      ) : "$" + Data ? (
                        Data.received
                      ) : (
                        ""
                      )}
                    </div>
                  </DetailItem>
                  <DetailItem>
                    <GrayText>Lunches</GrayText>

                    <div>
                      {Loading ? (
                        <TextLoadS />
                      ) : data.lunch ? (
                        data.lunch.title
                      ) : (
                        ""
                      )}
                    </div>
                  </DetailItem>
                </EventDetails>
                <Divider />
                <Col>
                  <Date>
                    <div style={{ paddingLeft: "10px" }}>Data</div>
                    <div>Starting Time</div>
                    <div>Ending Time</div>
                  </Date>
                  <DateInfo>
                    {data.bookDates
                      ? data.bookDates.map((i, index) => (
                          <Date item odd={index % 2 != 0 ? true : false}>
                            <GrayText>{DateName(i.start)}</GrayText>
                            <GrayText>{getTime(i.start)}</GrayText>
                            <GrayText>{getTime(i.end)}</GrayText>
                            <GrayText>
                              <BsThreeDotsVertical />
                            </GrayText>
                          </Date>
                        ))
                      : ""}
                  </DateInfo>
                  <DetailItem>
                    <div style={{ fontSize: "13px" }}> Commnets</div>

                    {Loading ? (
                      <TextLoadS />
                    ) : (
                      <GrayText>{Data.comment} </GrayText>
                    )}
                  </DetailItem>
                </Col>
              </Col>
              <Col style={{ width: "30%" }}>
                <Activity>
                  <DetailItem>
                    <BoldText>Activity</BoldText>
                    <Divider />
                    <GrayText>Created by</GrayText>

                    <ActivityItem>
                      <div>
                        <UserHolder>
                          <UserImage
                            src={require("../../public/images/user2.png")}
                          />
                          <span>
                            {Loading ? (
                              <TextLoadS />
                            ) : data.admin ? (
                              data.admin.name
                            ) : (
                              ""
                            )}
                          </span>
                        </UserHolder>
                      </div>
                      <div>
                        <GrayText>
                          <div
                            style={{
                              width: "max-content",
                            }}>
                            <TimeAgo date={data.createdAt} />
                          </div>
                        </GrayText>
                      </div>
                    </ActivityItem>
                  </DetailItem>
                  <DetailItem>
                    {data.approve ? (
                      <div>
                        <GrayText>Approved by</GrayText>
                        <ActivityItem>
                          <UserHolder>
                            <UserImage
                              src={require("../../public/images/user2.png")}
                            />
                            <span>
                              {/* {data.approvedBy
                                ? props.admins
                                    .filter((i) => i.id === data.approvedBy)
                                    .map((i) => i.username)
                                    .toString()
                                : ""} */}
                            </span>
                          </UserHolder>
                          <GrayText></GrayText>
                        </ActivityItem>
                      </div>
                    ) : null}
                  </DetailItem>
                </Activity>
                <DetailItem>
                  <Col style={{ margin: "40px" }}>
                    <BoldText>Solod Tickets</BoldText>
                  </Col>
                </DetailItem>
              </Col>
            </Row>
          </Wrapper>
        </div>
      </PageContent>
      <EditBooking
        open={open}
        id={id}
        onOpenModal={onOpenModal}
        Edit={true}
        Designs={Designs}
        getData={getDetalis}
        data={Data}
      />
    </CustomPageWrapper>
  );
}

export default Index;

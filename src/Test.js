// import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
// import { LoadData, addData } from "../../API";
// import EditBooking from "../../pages/Booking/EditBooking";
// import { monthNames } from "../shared/assets";
// import { Skeleton, Input } from "antd";
// import "../../App.css";
// import TimeAgo from "react-simple-timeago";
// import { DateName, getTime } from "../Dashboard";
// import Moment from "react-moment";
// import LoadingBar from "react-top-loading-bar";
// import BookingModal from "../Dashboard/BookingModal";
// import { Col, Row, Menu, Dropdown } from "antd";
// import {
//   CustomPageWrapper,
//   PageContent,
//   PageTitle,
// } from "../shared/CustomPage";
// // import { TextLoadS } from "../shared/SharedComponents";
// // import { DownOutlined } from "@ant-design/icons";
// // import { useHistory, useLocation, useParams } from "react-router-dom";
// import SideBar from "../Sidebar";
// // import { PageBack } from "../Profile";
// // import { BsArrowLeft } from "react-icons/bs";
// // import { Link } from "react-router-dom";
// import styled from "styled-components";
// // import { ButtonStyled } from "../shared/SharedStyle";
// import { GlobalStyle } from "../Dashboard";
// // import { UserImage } from "../Sidebar";
// // import { BsThreeDotsVertical } from "react-icons/bs";
// const PageActions = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   align-items: center;
// `;
// const Wrapper = styled(Row)`
//   background-color: white;
//   width: 100%;
//   border: 1px solid var(--lighterGray);
//   borderradius: 5px;
//   margin-left: 20px;
//   padding: 20px 40px;
// `;
// const GrayText = styled.div`
//   font-size: 13px;
//   color: var(--darkGray);
//   width: 100%;
// `;
// const EventDetails = styled.div`
//   display: grid;
//   grid-template-columns: auto auto auto auto;
//   gap: 16px;
//   width: 100%;

//   padding-top: 20px;
//   padding-right: 25px;
//   padding-bottom: 20px;
// `;
// const DetailItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   padding: 0 10px;
//   font-size: 17px;
//   width: 100%;
// `;
// const Activity = styled.div`
//   padding: 25px 0;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   padding-left: 25px;
//   border-bottom: 1px solid var(--lighterGray);
// `;
// const ActivityItem = styled.div`
//   display: grid;
//   grid-template-columns: 100px 120px;
//   gap: 5px;
//   width: 100%;
//   justify-content: space-between;
//   margin: 10px 0;

//   align-items: center;
// `;
// const BoldText = styled.div`
//   font-weight: bold;
//   font-size: 18px;
// `;
// const Date = styled.div`
//   display: grid;
//   width: 100%;
//   height: auto;
//   padding: 7px;
//   background-color: ${(props) => (props.odd ? "var(--lightGray)" : "none")};
//   border-bottom: ${(props) =>
//     props.item ? "1px solid var(--lighterGray)" : "none"};
//   grid-template-columns: 1fr 1fr 1fr auto;
// `;
// const DateInfo = styled.div`
//   border: 1px solid var(--lighterGray);
//   border-radius: 6px;
//   border-bottom: none;
//   margin-bottom: 15px;
// `;
// const UserHolder = styled.div`
//   display: flex;
//   gap: 7px;
//   align-items: center;

//   justify-content: center;
// `;
// const BookingActions = styled.div`
//   display: flex;
//   gap: 6px;
//   align-items: center;
//   padding-bottom: 10px;
// `;
// const Reject = styled.div`
//   background-color: var(--lightRed);
//   color: var(--red);
//   padding: 2px 8px;
//   height: 22px;
//   border-radius: 6px;
//   font-size: 12px;
//   cursor: pointer;
// `;
// const Accept = styled.div`
//   background-color: var(--LightGreen);
//   color: var(--darkGreen);
//   padding: 2px 8px;
//   height: 22px;
//   border-radius: 6px;
//   font-size: 12px;
//   cursor: pointer;
// `;
// const Pending = styled.div`
//   color: var(--orange);
//   font-size: 16px;
// `;

const Index = (props) => {
  // let history = useHistory();
  // let location = useLocation();
  // const [Id, setId] = useState("");
  // const [data, setdata] = useState({});
  // const ref = useRef(null);
  // const [open, setOpen] = useState(false);
  // const [Loading, setLoading] = useState(false);
  // const [Designs, setDesigns] = useState([]);
  // const [BookingStatus, setBookingStatus] = useState(false);
  // const setBooking = (status) => {
  //   setBookingStatus(status);
  // };
  // let { id } = useParams();
  // const onOpenModal = (open) => {
  //   setOpen(open);
  //   //callback()
  // };
  // useEffect(() => {
  //   if (localStorage.getItem("station_token")) {
  //     if (Loading) {
  //       ref.current.staticStart();
  //     } else {
  //       ref.current.complete();
  //     }
  //     setId(id);

  //     loadDesigns();
  //     getDetalis();
  //   } else {
  //     props.history.push("/login");
  //   }
  // }, []);
  // const getDetalis = () => {
  //   setLoading(true);

  //   LoadData(
  //     `book/${id}`,
  //     (err, data) => {
  //       setLoading(false);

  //       setdata(data.data);
  //       if (err) {
  //         Mesg(err);
  //       }
  //     },
  //     (err) => {
  //       setLoading(false);
  //       FailedMesg(err, "Something worng happend !");
  //     }
  //   );
  // };

  // const Recject = () => {
  //   let data = {
  //     id: Id,
  //   };
  //   setLoading(true);
  //   addData(
  //     "book/reject",
  //     data,
  //     (mesg, Data) => {
  //       SuccessMesg("Reservation Rejected !");
  //       setLoading(false);
  //       setId("");
  //       props.history.push("/");
  //     },
  //     (err) => {
  //       setLoading(false);
  //       setId("");

  //       FailedMesg(err);
  //     }
  //   );
  // };
  // const Approve = () => {
  //   let data = {
  //     id: Id,
  //   };

  //   setLoading(true);
  //   addData(
  //     "book/approve",
  //     data,
  //     (mesg, Data) => {
  //       SuccessMesg("Reservation Approved!");
  //       setLoading(false);
  //       setId("");
  //       setBooking(true);
  //     },
  //     (err) => {
  //       setLoading(false);
  //       setId("");

  //       FailedMesg(err);
  //     }
  //   );
  // };

  // const loadDesigns = () => {
  //   setLoading(true);
  //   LoadData(
  //     "space/designs",
  //     (err, data) => {
  //       setLoading(false);
  //       setDesigns(data.data);

  //       if (err) {
  //         Mesg(err);
  //       }
  //     },
  //     (err) => {
  //       setLoading(false);
  //       FailedMesg(err, "Something worng happend !");
  //     }
  //   );
  // };
  // let Data = data ? data : {};
  // let design = Designs.filter((item) => item.id != data.designId);
  return (
    <div>test</div>
    // <CustomPageWrapper>
    //   {/* <LoadingBar color="var(--yellow)" ref={ref} shadow={true} /> */}

    //   <GlobalStyle />
    //   <SideBar />

    /* <PageContent>
        <div style={{ marginTop: "40px" }}>
          <Wrapper>
            <Link to="/booking">
              <PageBack>
                <BsArrowLeft />
                <div>Booking</div>
              </PageBack>
            </Link>
            <PageActions>
              <PageTitle>{Loading ? <TextLoadS /> : Data.title}</PageTitle>

              <div style={{ display: "flex", gap: "10px" }}>
                <ButtonStyled
                //  onClick={onOpenModal}
                >
                  Edit
                </ButtonStyled>
                {Data.status === "approved" ? (
                  <ButtonStyled
                    Loading={Loading}
                    onClick={() => history.push(`/createEvent/${id}`)}
                    main>
                    Create Event
                  </ButtonStyled>
                ) : null}
              </div>
            </PageActions>

            <BookingActions>
              {BookingStatus ? (
                <div>Published</div>
              ) : (
                <Dropdown overlay={menu}>
                  <Pending>
                    <spna>
                      {Data.status}
                      <DownOutlined
                        style={{ fontSize: "10px", margin: " 0 5px" }}
                      />
                    </spna>
                  </Pending>
                </Dropdown>
              )}
              {!BookingStatus ? (
                <Reject onClick={Recject}>Reject</Reject>
              ) : null}
              {!BookingStatus ? (
                <Accept onClick={Approve}>Accept</Accept>
              ) : null}
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
                  paddingTop: "20px",
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
                <Col>
                  <Date>
                    <div>Data</div>
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
                    <GrayText>Created by</GrayText>

                    <ActivityItem>
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
                      <GrayText>
                        <div
                          style={{
                            width: "max-content",
                          }}>
                          <TimeAgo date={data.createdAt} />
                        </div>
                      </GrayText>
                    </ActivityItem>
                  </DetailItem>
                  <DetailItem>
                    {BookingStatus ? (
                      <div>
                        <GrayText>Approved by</GrayText>
                        <ActivityItem>
                          <UserHolder>
                            <UserImage
                              src={require("../../public/images/user2.png")}
                            />
                            <span>{data.admin ? data.admin.name : ""} </span>
                          </UserHolder>
                          <GrayText></GrayText>
                        </ActivityItem>
                      </div>
                    ) : null}
                  </DetailItem>
                </Activity>
              </Col>
            </Row>
          </Wrapper>
        </div>
      </PageContent>
      {/* <EditBooking
        open={open}
        id={id}
        onOpenModal={onOpenModal}
        Edit={true}
        Designs={Designs}
        getData={getDetalis}
        data={Data}
      /> */

    // </CustomPageWrapper>
  );
};

export default Index;

import React, { useState } from "react";
import { Widget } from "./index";
import { ReservationsData } from "../../fakeData";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { monthNames } from "../shared/assets";
import { Text } from "../Notification";
import { ReservationLoading } from "../shared/Loading";
import TimeAgo from "react-simple-timeago";
const ReservationItem = styled.div`
  display: grid;
  grid-template-columns: 17% 60% 20%;
  width: 100%;
  padding-bottom: 3%;
  align-items: center;
  cursor: pointer;
  padding-top: 3%;
`;
// gap: 12px;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;
// padding: 10px 7% 10px 7%;
const ReservIcon = styled.div`
  width: 2.8vw;
  height: 2.7vw;
  border-radius: 10px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  font-size: 1vw;
  justify-content: center;
  background-color: var(--lightBlue);
`;

const SubA = styled.div`
  width: 2.8vw;
  height: 2.7vw;
  border-radius: 10px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  font-size: 1vw;

  justify-content: center;
  background-color: var(--lightRed);
`;
const SubB = styled.div`
  width: 2.8vw;
  height: 2.7vw;
  border-radius: 10px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  font-size: 1vw;
  justify-content: center;
  background-color: var(--lightOrange);
`;
const SubC = styled.div`
  width: 2.8vw;
  height: 2.7vw;
  border-radius: 10px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  font-size: 1vw;
  justify-content: center;
  background-color: var(--LightGreen);
`;
const GrayText = styled.span`
  color: var(--textGray);
  display: flex;
  font-size: 0.7vw;
`;
const NumBtn = styled.div`
  background-color: var(--yellow);
  padding-top: 2px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 7px;
  font-size: 0.8vw;
`;
const SeeAll = styled.div`
  text-align: center;
  padding-top: 5px;
  display: flex;
  algin-items: center;
  justify-content: center;

  cursor: pointer;
`;
function Index(props) {
  let Data = [];
  props.Reservations.map((item, i) =>
    Data.push({
      key: i,
      id: item.id,
      place: item.space.title,
      name: item.title,
      time: item.createdAt,
      doc: item.organizer,
      date:
        item.createdAt.slice(0, 2) +
        " " +
        monthNames[
          item.createdAt.split("-")[1] === 0
            ? item.createdAt.split("-")[1].slice(1) - 1
            : item.createdAt.split("-")[1] - 1
        ] +
        " " +
        item.createdAt.split("-")[0],
    })
  );

  const Name = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 200px;
  `;
  const WidgetInner = styled.div`
    overflow: hidden;
    transition: 2s ease;
  `;
  // max-height: ${(props) => (props.showall ? "auto" : "18vw")};
  const [show, setshow] = useState(false);
  const ShowAll = () => {
    setshow(!show);
  };

  return (
    <Widget reservation>
      <div
        style={{
          overflow: "hidden",
          transition: "2s ease",

          height: show ? "auto" : "330px",
        }}>
        <ItemHeader>
          <span style={{ fontWeight: "bold", fontSize: "1.1vw" }}>
            Pending Reservations
          </span>
          <NumBtn>{Data.length}</NumBtn>
        </ItemHeader>
        <div className="items">
          {props.Loading
            ? [1, 2, 3, 4].map((item, i) => {
                return <ReservationLoading />;
              })
            : Data.map((item, i) => {
                let place = item.place;

                return (
                  <div key={i}>
                    <Link
                      to={{
                        pathname: `/bookingDetalis/${item.id}`,
                      }}>
                      {" "}
                      <ReservationItem>
                        {place === "Event Hall" ? (
                          <span>
                            <ReservIcon> Hall</ReservIcon>
                          </span>
                        ) : place === "A" ? (
                          <SubA>{item.place}</SubA>
                        ) : place === "B" ? (
                          <SubB>{item.place}</SubB>
                        ) : place === "C" ? (
                          <SubC>{item.place}</SubC>
                        ) : (
                          <ReservIcon>{item.place}</ReservIcon>
                        )}

                        <div>
                          {" "}
                          <div
                            style={{
                              fontSize: "1vw",
                            }}>
                            <Name>{item.name}</Name>
                          </div>
                          <div style={{ marginTop: "-4px" }}>
                            <GrayText>
                              <span>{item.doc} </span>
                              <span
                                style={{
                                  width: "7px",

                                  textAlign: "center",
                                }}>
                                |
                              </span>
                              <span> {item.date}</span>
                            </GrayText>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            fontSize: "0.8vw",
                            color: "var(--textGray)",
                            paddingRight: "2px",
                            justifyContent: "flex-end",
                            textAlign: "right",
                            height: "23px",
                            // width: "max-content",
                            backgroundColor: "white",
                          }}>
                          <TimeAgo date={item.time} />
                        </div>
                      </ReservationItem>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
      <SeeAll>
        <GrayText onClick={ShowAll}>
          {show ? "Show less " : " Show All"}
        </GrayText>
      </SeeAll>
    </Widget>
  );
}

export default Index;

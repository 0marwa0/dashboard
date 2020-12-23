import React from "react";
import { Skeleton, Space, Divider, Switch, Form, Radio } from "antd";
import { CardItem, GrayText } from "../../Booking/NewBooking/Modal";
import { CreateText, EmptyTextHolder } from "../../shared/SharedStyle";
const StatisticLoading = () => {
  return (
    <div>
      <Space>
        {/* <Skeleton.Image /> */}
        <Divider />
        <Skeleton.Avatar
          active="active"
          style={{ width: "45px", height: "42px" }}
          shape="circle"
        />
        <Skeleton.Input
          style={{ width: 70, height: 3 }}
          active="active"
          size="default"
        />
        <Skeleton.Input
          style={{ width: 20, height: 3, marginLeft: "180px" }}
          active="active"
          size="default"
        />
      </Space>
    </div>
  );
};
export const ReservationLoading = () => {
  return (
    <div>
      <Space
        style={{
          height: "70px",

          borderBottom: "1px solid var(--LighterGray)",
        }}>
        {/* <Skeleton.Image /> */}
        <Divider />
        <div
          style={{
            display: "flex",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <Skeleton.Input
              active="active"
              style={{ width: "3vw", height: "3vw", borderRadius: "7px" }}
              shape="circle"
            />{" "}
            <Skeleton.Input
              style={{ width: 70, height: 3 }}
              active="active"
              size="default"
            />
          </div>
          {/* <Skeleton.Input
            style={{ width: 20, height: 3 }}
            active="active"
            size="default"
          /> */}
        </div>
      </Space>
    </div>
  );
};
export const BookItemLoading = () => {
  return [1, 2, 3].map((item, i) => {
    return (
      <CardItem key={i}>
        <div>{item.price}</div>
        <GrayText>
          <Skeleton.Input
            style={{ width: 70, height: 3 }}
            active="active"
            size="default"
          />{" "}
        </GrayText>

        <Skeleton.Input
          style={{ width: 70, height: 3 }}
          active="active"
          size="default"
        />
      </CardItem>
    );
  });
};
export const TableLoading = (Loading, Item) => {
  return Loading ? (
    [1, 2, 3, 3, 4].map((i, index) => {
      return (
        <Space
          key={index}
          style={{
            borderBottom: "1px solid var(--lighterGray)",
            width: "100%",
          }}>
          {[1, 2, 3, 3, 4, 5].map((i, index) => {
            return (
              <Skeleton.Input
                key={index}
                style={{
                  width: "3.5vw",
                  height: 5,
                  margin: "20px 3.5vw",
                }}
                active="active"
                size="default"
              />
            );
          })}
        </Space>
      );
    })
  ) : (
    <EmptyTextHolder>
      <div>
        <img src={require("../../../public/images/noData.png")} />
      </div>
      <div style={{ color: "black" }}>No {Item + "s"} found</div>
      <div style={{ width: "248px" }}>
        You havent't add any {Item} yet . Tap here to add your first {Item}
      </div>

      <CreateText>
        Add New {Item.charAt(0).toUpperCase() + Item.slice(1)}
      </CreateText>
    </EmptyTextHolder>
  );
};

export default StatisticLoading;

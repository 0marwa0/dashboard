import React, { useState, useCallback, useRef } from "react";
import { InputLable, ModleFooter, ModleHeader } from "../shared/SharedStyle";
import { CustomModleButton } from "../shared/SharedComponents";
import { ReactComponent as Close } from "../../public/images/close.svg";
import styled from "styled-components";
import { DatePicker, Checkbox, Space } from "antd";

const { RangePicker } = DatePicker;
export const TextNote = styled.div`
  color: var(--darkGray);
  font-size: 13px;
`;

const PageWrapper = styled.div`
  width: max-content;

  display: flex;
  flex-direction: column;
  height: 85%;
  padding: 20px 40px;
`;
export const SideModal = styled.div`
  width: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  width: 540px;
  padding: 30px 40px;
  margin-bottom: 20px;
`;
const Index = (props) => {
  let node;
  const handleClose = (e) => {
    if (node.contains(e.target)) {
      return;
    }
    props.fun(false);
  };
  return (
    <div className="Overlay" onClick={(e) => handleClose(e)}>
      <div
        className="Modal"
        ref={(nods) => {
          node = nods;
        }}>
        <SideModal>
          <ModleHeader>
            <div style={{ fontWeight: "bold", fontSize: "25px" }}>
              {" "}
              Export Bookings
            </div>

            <Close onClick={props.fun} cursor="pointer" />
          </ModleHeader>
          <div className="exportSpaec"></div>
          <div style={{ marginBottom: "10px", fontSize: "18px" }}>
            Choose Date
          </div>
          <RangePicker showTime />
          <div className="exportSpaec"></div>
          <div className="exportListHolder">
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>Coulmns</div>
            <div className="exportList">
              <Checkbox /> Tile
            </div>
            <div className="exportList">
              <Checkbox /> Status
            </div>
            <div className="exportList">
              <Checkbox /> Starting Date
            </div>
            <div className="exportList">
              <Checkbox /> Ending Date
            </div>{" "}
            <div className="exportList">
              <Checkbox /> Creation Date
            </div>
            <div className="exportList">
              <Checkbox /> Booked By
            </div>
            <div className="exportList">
              <Checkbox /> Approved By
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "0", left: "65%" }}>
            <PageWrapper>
              <ModleFooter>
                <CustomModleButton main fun={props.handleSubmit}>
                  Export
                </CustomModleButton>
              </ModleFooter>
            </PageWrapper>
          </div>{" "}
        </SideModal>
      </div>
    </div>
  );
};

export default Index;

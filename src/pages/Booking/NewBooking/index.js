// create new booking  modle
import { CustomModleButton } from "../../shared/SharedComponents";

import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ReactComponent as Close } from "../../../public/images/close.svg";
import { FirstPage, SecondPage, ThirdPage, ForthPage } from "./Modle";
const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const Dot = styled.span``;
const CurrentDot = styled.span``;

const ModleTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 40px;
`;

const ModleFooter = styled.div`
  display: flex;
  transition: all 0.3s ease;
  align-items: center;
  padding: 40px;
  justify-content: space-between;
`;
class Index extends React.Component {
  state = {
    currentPage: 1,
    pagePerOnce: 1,

    pageNumber: 0,
  };
  prevPage = () => {
    const currentPage = this.state.currentPage;
    if (currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  nextPage = () => {
    const currentPage = this.state.currentPage;
    const totalPge = Math.ceil(data.length / this.state.pagePerOnce);
    if (currentPage != totalPge) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const indexOfLastPage = this.state.currentPage * this.state.pagePerOnce;
    const indexOfFirstPage = indexOfLastPage - this.state.pagePerOnce;
    const pages = data.slice(indexOfFirstPage, indexOfLastPage);
    console.log(this.state.currentPage);
    return (
      <div>
        <ModleTitle>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            New Booking
            <Close onClick={this.props.Close} cursor="pointer" />
            {/* <AiOutlineClose  /> */}
          </div>
          <div style={{ color: "#8F8F8F" }}>
            Create a booking for a costumer directly from reception
          </div>
        </ModleTitle>
        {pages.map((i) => {
          return (
            <div>
              {i.id === 1 ? (
                <FirstPage />
              ) : i.id === 2 ? (
                <SecondPage />
              ) : i.id === 3 ? (
                <ThirdPage />
              ) : i.id === 4 ? (
                <ForthPage />
              ) : (
                ""
              )}
            </div>
          );
        })}
        <ModleFooter>
          <div>
            {data.map((i) => (
              <span
                style={{
                  width: "200px",
                }}
              >
                {i.id === this.state.currentPage ? (
                  <span className="cDot"></span>
                ) : (
                  <span className="dot"></span>
                )}
              </span>
            ))}
          </div>
          <span style={{ display: "flex", gap: "5px" }}>
            {this.state.currentPage === 1 ? null : (
              <CustomModleButton fun={this.prevPage} extra>
                Back
              </CustomModleButton>
            )}
            {this.state.currentPage === 4 ? (
              <Link to="/BookingDetalis">
                <CustomModleButton Main extra fun={this.nextPage}>
                  finsh
                </CustomModleButton>
              </Link>
            ) : (
              <CustomModleButton Main extra fun={this.nextPage}>
                Next
              </CustomModleButton>
            )}
          </span>
        </ModleFooter>
      </div>
    );
  }
}

export default Index;

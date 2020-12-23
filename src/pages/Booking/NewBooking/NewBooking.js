// create new booking  modle
import { CustomModleButton } from "../../shared/SharedComponents";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ReactComponent as Close } from "../../../public/images/close.svg";
import { Mesg, FailedMesg } from "../../../API/APIMessage";
import { LoadData } from "../../../API";
import Step1 from "../NewBooking/Modal/Step1";
import FirstPage from "./Modal/FirstPage";
import SecondPage from "./Modal/SecondPage";
import ThirdPage from "./Modal/ThirdPage";
import ForthPage from "./Modal/ForthPage";
const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
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
const Space = styled.div`
  width: 10px;
`;
function NewBooking(props) {
  const [currentPage, setcurrentPage] = useState(1);
  const [pagePerOnce, setpagePerOnce] = useState(1);
  const [pageNumber, setpageNumber] = useState(0);
  const prevPage = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPge = Math.ceil(data.length / pagePerOnce);
    if (currentPage != totalPge) {
      setcurrentPage(currentPage + 1);
    }
  };

  const indexOfLastPage = currentPage * pagePerOnce;
  const indexOfFirstPage = indexOfLastPage - pagePerOnce;
  const pages = data.slice(indexOfFirstPage, indexOfLastPage);
  const [Loading, setLoading] = useState(false);
  const [coffees, setCoffees] = useState([]);
  const [lunches, setLunches] = useState([]);
  const [Designs, setDesigns] = useState([]);

  const loadDesigns = () => {
    setLoading(true);
    LoadData(
      "space/designs",
      (err, data) => {
        setLoading(false);
        setDesigns(data.data);
        // console.log(data.data, "design");
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
  const loadLunches = () => {
    setLoading(true);
    LoadData(
      "lunches",
      (err, data) => {
        setLoading(false);
        setLunches(data.data);
        // console.log(data, " lunches");
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
  const loadCoffees = () => {
    setLoading(true);
    LoadData(
      "/coffees",
      (err, data) => {
        setLoading(false);
        setCoffees(data.data);
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
  //  console.log(currentPage);
  useEffect(() => {
    loadCoffees();
    loadLunches();
    loadDesigns();
    return () => {};
  }, []);
  return (
    <div>
      <ModleTitle>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            display: "flex",

            alignItems: "center",
            justifyContent: "space-between",
          }}>
          New Booking
          <Close onClick={props.Close} cursor="pointer" />
          {/* <AiOutlineClose  /> */}
        </div>
        <div style={{ color: "#8F8F8F" }}>
          Create a booking for a costumer directly from reception
        </div>
      </ModleTitle>
      {props.edit ? "" : ""}
      {props.edit
        ? pages.map((i) => {
            return (
              <div>
                {i.id === 1 ? (
                  <FirstPage
                    handleInput={props.handleInput}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 2 ? (
                  <SecondPage
                    // handleInput={props.handleInput}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 3 ? (
                  <ThirdPage
                    coffees={coffees}
                    lunches={lunches}
                    Designs={Designs}
                    Loading={Loading}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 5 ? (
                  <ForthPage
                    handleInput={props.handleInput}
                    edit={props.edit}
                    handleselect={props.handleselect}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })
        : pages.map((i) => {
            return (
              <div>
                {i.id === 1 ? (
                  <Step1
                    handleInput={props.handleInput}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 2 ? (
                  <FirstPage
                    handleInput={props.handleInput}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 3 ? (
                  <SecondPage
                    // handleInput={props.handleInput}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 4 ? (
                  <ThirdPage
                    coffees={coffees}
                    lunches={lunches}
                    Designs={Designs}
                    Loading={Loading}
                    handleselect={props.handleselect}
                  />
                ) : i.id === 5 ? (
                  <ForthPage
                    handleInput={props.handleInput}
                    edit={props.edit}
                    handleselect={props.handleselect}
                  />
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
              }}>
              {i.id === currentPage ? (
                <span className="cDot"></span>
              ) : (
                <span className="dot"></span>
              )}
            </span>
          ))}
        </div>
        <span style={{ display: "flex", gap: "5px" }}>
          {currentPage === 1 ? null : (
            <CustomModleButton fun={prevPage} extra>
              Back
            </CustomModleButton>
          )}
          <Space />
          {currentPage === 5 ? (
            <CustomModleButton fun={props.handleSubmit} main extra>
              Finsh
            </CustomModleButton>
          ) : (
            <CustomModleButton main extra fun={nextPage}>
              Next
            </CustomModleButton>
          )}
        </span>
      </ModleFooter>
    </div>
  );
}

export default NewBooking;

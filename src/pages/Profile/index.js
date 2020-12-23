import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar";
import { CustomPageWrapper, ProfileContent } from "../shared/CustomPage";
import { Button, Col, Row, Input, Upload } from "antd";
import { GlobalStyle } from "../Dashboard";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import styled from "styled-components";
import { CustomInput } from "../shared/SharedStyle";
import { BsExclamationCircle } from "react-icons/bs";
import { ButtonStyledModle } from "../shared/SharedStyle";
import { addData, editData, addFile } from "../../API";
import { Mesg, SuccessMesg, FailedMesg } from "../../API/APIMessage";
import { set } from "date-fns";
const ProfileContetn = styled.div`
  margin: 0 10%;
  border-radius: 6px;
  height: 700px;
  background-color: white;
  width: 80%;
  padding: 40px 60px;
`;
const ProfileHead = styled.div`
  margin: 20px 10%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const PageBack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-size: 16px;
  color: #b5b5b5;
  align-items: center;
`;
const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  font-weight: bold;
`; //
export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fffff2;
  border: 1px solid var(--yellow);
  display: flex;
  align-items: center;
  background-position: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: cover;
  justify-content: center;
  background-image: url(${(props) => props.src});
  font-size: 25px;
  margin-bottom: 15px;
  position: relative;
  color: var(--yellow);
`;
const InputLable = styled.div`
  display: grid;
  grid-template-columns: 100px 300px;
  text-align: right;
  gap: 15px;
  margin: 10px 0;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  float: left;
`;
const Space = styled.div`
  margin-bottom: 25px;
`;
const DeleteAccount = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 40px;
  align-items: center;
  justify-content: centen;
`;
// const InputLable = styled.div`
//   display: flex;
//   gap: 10px;
// `;
function Index(props) {
  let user = props.admins.filter((i) => i.id === props.id);
  let data = {};
  user.map((i) => (data = i));

  const [fillName, setfillName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [type, settype] = useState("");
  const [file, setfile] = useState("");
  const [Loading, setLoading] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (localStorage.getItem("station_token")) {
    } else {
      props.history.push("/login");
    }
  }, []);
  const Props = {
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    showUploadList: false,
    onChange({ file, fileList }) {
      Image(file.originFileObj);
    },
    transformFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const canvas = document.createElement("canvas");
          const img = document.createElement("img");
          img.src = reader.result;

          img.onload = () => {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "yellow";
            ctx.textBaseline = "middle";
            setImageUrl(img.src);
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
  };
  const ProfileContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;

    margin-top: 25px;
    margin-left: auto;

    margin-right: auto;
  `;
  const Image = (e) => {
    setfile(e);
  };
  const handleInput = (e, key) => {
    let value = e.target.value;
    let file = e;
    switch (key) {
      case "userName":
        setuserName(value);
        break;
      case "fillName":
        setfillName(value);
        break;
      case "phone":
        setphone(value);
        break;
      case "eamil":
        setemail(value);
        break;
      case "password":
        setpassword(value);
        break;

      default:
        break;
    }
  };
  const Save = () => {
    let admin = {
      name: fillName,
      username: userName,
      type: type,
      active: true,
      phone: phone,
      email: email,
      image: data.url,
    };
    addData(
      `admin/edit${data.id}`,
      admin,

      (mesg, Data) => {
        if (mesg && mesg != undefined) {
          Mesg(mesg);
          setLoading(false);
        } else {
          SuccessMesg("Account data Saved!");
          setLoading(false);
          props.onOpenModal(false);
          props.getData();
        }
      },
      (err) => {
        props.onOpenModal(false);
        setLoading(false);

        FailedMesg(err);
      }
    );
  };
  let name = data.name;
  return (
    <CustomPageWrapper>
      <GlobalStyle />
      <SideBar />
      <ProfileContent>
        <ProfileHead>
          <Link to="/">
            <PageBack>
              <BsArrowLeft />
              <div>Dashboard</div>
            </PageBack>
          </Link>
          <PageTitle>
            My Profile
            <div>
              <ButtonStyledModle main onClick={Save}>
                Save
              </ButtonStyledModle>
            </div>
          </PageTitle>
        </ProfileHead>
        <ProfileContetn>
          <Form>
            <div style={{ width: "40%" }}>
              <ProfileImage src={ImageUrl}>
                {/* {ImageUrl === "" ? name : ""} */}
              </ProfileImage>
              <Space style={{ cursor: "pointer" }}>
                <Upload {...Props}>Upload Photo</Upload>
              </Space>
            </div>
            <InputLable>
              Full Name
              <span style={{ display: "flex", gap: "5px" }}>
                <CustomInput
                  defaultValue={data.name}
                  onChange={(e) => handleInput(e, "fillName")}
                />{" "}
                <CustomInput
                  defaultValue={data.username}
                  onChange={(e) => handleInput(e, "userName")}
                />
              </span>
            </InputLable>
            <InputLable>
              Email Address
              <CustomInput
                gray
                defaultValue={data.email}
                onChange={(e) => handleInput(e, "email")}
              />
            </InputLable>
            <InputLable>
              Password
              <CustomInput
                type="password"
                gray
                defaultValue={data.password}
                onChange={(e) => handleInput(e, "password")}
              />
            </InputLable>
            <Space>Change Password?</Space>
            <InputLable>
              Phone Number
              <CustomInput
                defaultValue={data.phone}
                onChange={(e) => handleInput(e, "phone")}
              />
            </InputLable>
            <DeleteAccount>
              Delet Your Account?
              <BsExclamationCircle color="var(--lighterGray)" />
            </DeleteAccount>
          </Form>{" "}
        </ProfileContetn>
      </ProfileContent>
    </CustomPageWrapper>
  );
}

export default Index;

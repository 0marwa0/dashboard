import React, { useEffect, useState } from "react";
import { InputLable } from "../../shared/SharedStyle";
import { CustomModleButton } from "../../shared/SharedComponents";
import { Menu, Dropdown, Button, Input } from "antd";
import { ReactComponent as DropIcon } from "../../../public/images/dropdown.svg";
import { ReactComponent as Close } from "../../../public/images/close.svg";
import styled from "styled-components";
import { ProfileImage } from "../../Profile";
import { Upload, Select } from "antd";
import { LoadData, addData, editData, addFile } from "../../../API";
import "../../../App.css";
import { Mesg, FailedMesg, SuccessMesg } from "../../../API/APIMessage";

import { CustomInput } from "../../shared/SharedStyle";
export const option = (
  <Menu>
    <Menu.Item key="1">200</Menu.Item>
    <Menu.Item key="2">100</Menu.Item>
    <Menu.Item key="3">50</Menu.Item>
  </Menu>
);
export const data = (
  <Menu>
    <Menu.Item key="1">200</Menu.Item>
    <Menu.Item key="2">100</Menu.Item>
    <Menu.Item key="3">50</Menu.Item>
  </Menu>
);
const { Option } = Select;
export const SideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 999999999;

  background: rgba(0, 0, 0, 0.3);
`;
export const ModalFooter = styled.div`
  height: 5%;
`;
// export const SideModal = styled.div`
//   position: absolute;
//   top: 0;
//   animation: listFade 0.6s;
//   right: 0;
//   display: flex;

//   flex-direction: column;
//   background-color: white;
//   overflow: hidden;
//   height: 100%;
//   width: 540px;
//   backgorund-color: red;
//   padding: 30px 50px;
// `;

export const SideModal = styled.div`
  width: max-content;

  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  justify-content: space-between;
  width: 540px;
  padding: 30px 40px;
  margin-bottom: 20px;
`;
export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 40px;
  align-items: center;
`;
export const Space = styled.div`
  height: 8px;
`;
const Imageholder = styled.div``;
function Index(props) {
  const [Loading, setLoading] = useState(false);
  const [imageName, setimageName] = useState();
  const [file, setfile] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const Image = (e) => {
    setfile(e);
  };
  const Props = {
    //multiple: false,
    name: "image",
    action: "https://station-solo.herokuapp.com/dash/v1/upload",
    headers: { token: localStorage.getItem("station_token") },
    showUploadList: false,
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
  const handleImage = (info, fileList) => {
    Image(info.originFileObj);

    if (info.file.status === "done") {
      let data = {
        uid: info.file.uid,
        name: info.file.name,
        url: info.file.response.url,
      };
      setimageName(data);
      props.handleSelect(info.file.response.url, "image");
      // console.log(fileList, "respone");
    }
  };

  const handleClose = (e) => {
    if (node.contains(e.target)) {
      return;
    }
    props.fun(false);
  };
  let node;
  return (
    <div className="Overlay" onClick={(e) => handleClose(e)}>
      <div
        className="Modal"
        ref={(nods) => {
          node = nods;
        }}>
        <SideModal>
          <div style={{ height: "150vh" }}>
            <Title>
              <div>Add new Admin</div>
              <Close
                onClick={() => {
                  props.fun(false);
                }}
                cursor="pointer"
              />
              {/* <AiOutlineClose /> */}
            </Title>
            <InputLable>
              {" "}
              <div style={{ fontSize: "17px" }}>Admin Info</div>
            </InputLable>{" "}
            <Space />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <div>
                <ProfileImage src={ImageUrl}>
                  {/* {ImageUrl === "" ? name : ""} */}
                </ProfileImage>
                <Space style={{ cursor: "pointer" }}>
                  <Upload
                    {...Props}
                    onChange={(e) => handleImage(e)}
                    defaultFileList={imageName && [imageName]}>
                    Upload Photo
                  </Upload>
                </Space>
              </div>
            </div>
            <Space /> <Space />
            <InputLable>
              Full Name
              <CustomInput
                onChange={(e) => props.handleInput(e, "name")}
                placeholder="Write admin name"
              />
            </InputLable>
            <Space /> <Space />
            <InputLable>
              Username
              <CustomInput
                onChange={(e) => props.handleInput(e, "username")}
                placeholder="Write admin username"
              />
            </InputLable>
            {props.type === "create" ? (
              <div>
                <Space /> <Space />{" "}
                <InputLable>
                  Password
                  <CustomInput
                    placeholder="Write admin password"
                    onChange={(e) => props.handleInput(e, "password")}
                  />
                </InputLable>
              </div>
            ) : null}
            <Space /> <Space />
            <InputLable>
              Email
              <CustomInput
                placeholder="Write admin Email"
                onChange={(e) => props.handleInput(e, "email")}
              />
            </InputLable>
            <Space /> <Space />
            <InputLable>
              Phone
              <CustomInput
                placeholder="Write admin phone number"
                onChange={(e) => props.handleInput(e, "phone")}
              />
            </InputLable>
            <Space /> <Space />
            <InputLable>
              Branch
              <Select
                suffixIcon={<DropIcon />}
                placeholder=" Choose admin branch loaction"
                onChange={(e) => props.handleSelect(e, "branch")}>
                <Option key="baghdad">Baghadad</Option>
                <Option key="mosul">Mosul</Option>
              </Select>
            </InputLable>
            <Space /> <Space />
            <InputLable>
              Role
              <Select
                suffixIcon={<DropIcon />}
                placeholder="Choose admin role"
                onChange={(e) => props.handleRole(e, "type")}>
                <Option key="Meadia Admin">Meadia Admin</Option>
                <Option key="Book Admin">Book Admin</Option>
              </Select>
            </InputLable>
          </div>
          <Space />
          <div
            style={{
              marginTop: "40px",
            }}>
            <ModalFooter>
              <div style={{ float: "right" }}>
                {" "}
                <CustomModleButton main extra fun={props.handleSubmit}>
                  {props.type === "create" ? "Create" : "Save"}
                </CustomModleButton>
              </div>
            </ModalFooter>
          </div>
        </SideModal>
      </div>
    </div>
  );
}

export default Index;

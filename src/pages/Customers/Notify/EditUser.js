import React, { useState, useContext } from "react";
import { Input, InputNumber } from "antd";
import { Menu, Dropdown, Button, Select, Upload } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Mesg, FailedMesg, SuccessMesg } from "../../../API/APIMessage";

import {
  InputLable,
  ModleFooter,
  ModleHeader,
  Space,
} from "../../shared/SharedStyle";
import styled from "styled-components";
import { ProfileImage } from "../../Profile";
import { ReactComponent as DropIcon } from "../../../public/images/dropdown.svg";
import { ReactComponent as Close } from "../../../public/images/close.svg";
import { addData } from "../../../API";

import { GiNorthStarShuriken } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CustomModleButton } from "../../shared/SharedComponents";
import { CustomInput, CustomInputArea } from "../../shared/SharedStyle";
import { UserContext } from "../index";

const PageWrapper = styled.div`
  width: 470px;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  justify-content: space-between;
`;
const Divider = styled.div`
  height: 10px;
`;
function Index(props) {
  const [title, setTitle] = useState("");
  const [mesg, setMesg] = useState("");
  const [Loading, setLoading] = useState(false);
  let user = useContext(UserContext);
  // const handleInput = (e, key) => {
  //   let value = e.target.value;
  //   if (key === "title") {
  //     setTitle(value);
  //   }
  //   if (key === "mesg") {
  //     setMesg(value);
  //   }
  // };

  const clear = () => {
    setTitle("");
    setMesg("");
  };

  const [imageName, setimageName] = useState();

  const [file, setfile] = useState("");
  const [ImageUrl, setImageUrl] = useState(user.image);
  console.log(user.image, "user image");
  const Props = {
    //multiple: false,
    name: "image",
    action: "http://station-solo.herokuapp.com/dash/v1/upload",
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
    // Image(info.originFileObj);
    if (info.file.status === "done") {
      let data = {
        uid: info.file.uid,
        name: info.file.name,
        url: info.file.response.url,
      };
      setimageName(data);

      props.setFile(info.file.response.url);
    }
  };
  const handleClose = (e) => {
    if (node.contains(e.target)) {
      return;
    }
    props.fun();
  };
  let node;

  console.log(props.info ? props.info : "no", "ind edit");
  return (
    <div className="Overlay" onClick={(e) => handleClose(e)}>
      <div
        className="Modal"
        ref={(nods) => {
          node = nods;
        }}>
        <PageWrapper>
          {" "}
          <UserContext.Consumer>
            {({
              name,
              email,
              phone,
              jobTitle,
              birthday,
              address,
              gender,
              image,
              education,
            }) => (
              <div>
                <ModleHeader>
                  Update User
                  <Close
                    onClick={() => {
                      props.Close();
                      clear();
                    }}
                    cursor="pointer"
                  />
                </ModleHeader>
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
                <Space />
                <InputLable>
                  Name
                  {/* {props.info.name} */}
                  <CustomInput
                    defaultValue={name}
                    onChange={(e) => props.handleInput(e, "name")}
                  />
                </InputLable>
                <Space />
                <InputLable>
                  Email
                  <CustomInput
                    defaultValue={email}
                    onChange={(e) => props.handleInput(e, "email")}
                  />
                </InputLable>
                <InputLable>
                  Education
                  <CustomInput
                    defaultValue={education}
                    onChange={(e) => props.handleInput(e, "education")}
                  />
                </InputLable>
                <Space />
                {/* <InputLable>
                  Birthday
                  <CustomInput
                    defaultValue={birthday}
                    onChange={(e) => props.handleInput(e, "birthday")}
                  />
                </InputLable> */}
                <InputLable>
                  Gender
                  <CustomInput
                    defaultValue={gender}
                    onChange={(e) => props.handleInput(e, "gender")}
                  />
                </InputLable>
                <Space />
                <InputLable>
                  Address
                  <CustomInput
                    defaultValue={address}
                    onChange={(e) => props.handleInput(e, "address")}
                  />
                </InputLable>{" "}
                <InputLable>
                  Phone
                  <CustomInput
                    defaultValue={phone}
                    onChange={(e) => props.handleInput(e, "phone")}
                  />
                </InputLable>
                <Space />
                <InputLable>
                  JobTitle
                  <CustomInput
                    defaultValue={jobTitle}
                    onChange={(e) => props.handleInput(e, "jobTitle")}
                  />
                </InputLable>
              </div>
            )}
          </UserContext.Consumer>
          <ModleFooter>
            <CustomModleButton
              main
              fun={props.handleSubmit}
              loading={props.loading}>
              Save
            </CustomModleButton>
          </ModleFooter>
        </PageWrapper>
      </div>
    </div>
  );
}

export default Index;

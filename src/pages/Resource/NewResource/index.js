import React, { useState } from "react";
import {
  CustomInputArea,
  InputLable,
  ModleFooter,
  ModleHeader,
} from "../../shared/SharedStyle";
import ProgressBar from "@ramonak/react-progress-bar";

import { CustomModleButton } from "../../shared/SharedComponents";
import styled from "styled-components";
import { TextNote } from "../../FileUploader/NewFileUploader";
import { Input, Upload, Button } from "antd";
import { CustomInput, Space } from "../../shared/SharedStyle";
import { ImAttachment } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";
import { ReactComponent as Close } from "../../../public/images/close.svg";

const { TextArea } = Input;
const PageWrapper = styled.div`
  width: max-content;

  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;

  justify-content: space-between;
`;
function Index(props) {
  // const [Active, setActive] = useState(false);
  // const [fileName, setFileName] = useState("");
  // const [fileSize, setFileSize] = useState("");
  // const [Load, setLoad] = useState(0);

  // const [Image, setImage] = useState(
  //   require("../../FileUploader/NewFileUploader/default.png")
  // );

  // const [allowToChange, setallowToChange] = useState(false);

  // const getFileSize = (e) => {
  //   let fileSize = e;
  //   var Uints = new Array("Bytes", "KB", "MB", "GB"),
  //     i = 0;
  //   while (fileSize > 900) {
  //     fileSize /= 1024;
  //     i++;
  //   }
  //   var exactSize = Math.round(fileSize * 100) / 100 + " " + Uints[i];
  //   console.log("FILE SIZE = ", exactSize);
  //   console.log(fileSize, "sizzzzzz");
  //   setFileSize(exactSize);
  // };

  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let value;
  //   setLoad(100);
  //   setallowToChange(true);
  //   setActive(true);
  //   let type = e.target.files[0].type;
  //   if (type.substring(0, 5) === "image") {
  //     console.log(e.target.files[0], "file uplaoded");
  //     value = URL.createObjectURL(e.target.files[0]);
  //     setImage(value);
  //   } else {
  //     setImage(require("../../FileUploader/NewFileUploader/file2.webp"));
  //   }
  //   props.handleFile(e.target.files[0]);
  //   setFileName(e.target.files[0].name);
  //   getFileSize(e.target.files[0].size);
  // };
  // const removeImage = () => {
  //   setActive(false);
  //   setImage(require("../../FileUploader/NewFileUploader/default.png"));
  //   setallowToChange(false);
  //   setFileName("");
  //   setLoad(0);
  //   setFileSize("");
  // };

  // const dragEnter = (e) => {
  //   e.preventDefault();
  // };
  // const dragLeave = (e) => {
  //   e.preventDefault();
  //   setActive(false);
  // };
  // const dragOver = (e) => {
  //   setActive(true);
  //   e.preventDefault();
  // };
  // const fileDrop = (e) => {
  //   e.preventDefault();
  //   // console.log("doregedd");
  //   let value;
  //   let type = e.dataTransfer.files[0].type;
  //   if (type.substring(0, 5) === "image") {
  //     value = URL.createObjectURL(e.dataTransfer.files[0]);

  //     setImage(value);
  //   } else {
  //     setImage(require("../../FileUploader/NewFileUploader/file2.webp"));
  //   }
  //   setLoad(100);

  //   props.handleFile(e.dataTransfer.files[0]);

  //   setallowToChange(true);
  //   setFileName(e.dataTransfer.files[0].name);
  //   getFileSize(e.dataTransfer.files[0].size);
  // };
  const [imageName, setimageName] = useState();

  const Props = {
    multiple: false,
    name: "file",
    action: "http://station-solo.herokuapp.com/dash/v1/file",
    headers: { token: localStorage.getItem("station_token") },
    // previewFile(file) {
    //   console.log("Your upload file:", file);
    //   // Your process logic. Here we just mock to the same file
    //   return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
    //     method: "POST",
    //     body: file,
    //   })
    //     .then((res) => res.json())
    //     .then(({ thumbnail }) => thumbnail);
    // },

    onChange({ file, fileList }) {
      if (file.status === "done") {
        let data = {
          uid: file.uid,
          name: file.name,
          url: file.response.data.link,
        };
        props.handlesiz(file.size);
        props.handleFile(file.response.data.link);

        console.log(file, "don");
        setimageName(data);
      }
      //   if (file.status !== "uploading") {
      //     console.log(file, fileList);
      //   }
    },
  };

  return (
    <>
      <PageWrapper>
        <div>
          {" "}
          <ModleHeader>
            Upload New Resources
            <Close onClick={props.Close} cursor="pointer" />
          </ModleHeader>
          <InputLable>
            Title
            <CustomInput
              onChange={(e) => props.handleInput(e, "title")}
              placeholder="write file title"
            />
          </InputLable>
          <Space />
          <InputLable>
            Description
            <CustomInputArea
              onChange={(e) => props.handleInput(e, "dec")}
              rows={3}
              placeholder="write file Description ..."
            />
          </InputLable>
          <Space />
          <Space />
          <Upload {...Props} defaultFileList={imageName && [imageName]}>
            <div className="upload_modal">
              <div className="upload_img_close">
                <img
                  src={require("../../FileUploader/NewFileUploader/default.png")}
                  className="img"
                />
              </div>
              <span
                style={{
                  color: "var(--darkGray)",
                }}>
                Choose any file form computer or Drag & Drop it here
              </span>
              <span style={{ margin: "20px 0" }}>
                {" "}
                <Button>Upload</Button>
              </span>
            </div>
          </Upload>
        </div>
        <ModleFooter>
          <CustomModleButton fun={props.Close}>Cancel</CustomModleButton>
          <CustomModleButton main fun={props.handleSubmit}>
            Upload
          </CustomModleButton>
        </ModleFooter>
      </PageWrapper>
    </>
  );
}

export default Index;

import React, { useState, useCallback, useRef } from "react";
import { InputLable, ModleFooter, ModleHeader } from "../../shared/SharedStyle";
import { CustomModleButton } from "../../shared/SharedComponents";
import { ReactComponent as Close } from "../../../public/images/close.svg";

import { ImAttachment } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";

import "antd/dist/antd.css";

import { Upload, Button, Tooltip } from "antd";

import styled from "styled-components";

import { UploadOutlined } from "@ant-design/icons";
export const TextNote = styled.div`
  color: var(--darkGray);
  font-size: 13px;
`;

const PageWrapper = styled.div`
  width: max-content;

  display: flex;
  flex-direction: column;
  height: 85%;

  justify-content: space-between;
`;
export default function NewFileUploader(props) {
  const [imageName, setimageName] = useState();

  const Props = {
    multiple: false,

    action: "https://station-solo.herokuapp.com/dash/v1",

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
      props.handleInput(file.originFileObj);
      console.log(file);
      let data = {
        uid: file.uid,
        name: file.name,
        url: "file.response.url",
      };
      setimageName(data);
      //   if (file.status !== "uploading") {
      //     console.log(file, fileList);
      //   }
    },

    // defaultFileList: [
    //   {
    //     uid: "3",
    //     name: "zzz.png",
    //     status: "error",

    //     response: "Server Error 500", // custom error message to show
    //     url: "http://www.baidu.com/zzz.png",
    //   },
    // ],

    // transformFile(file) {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //       const canvas = document.createElement("canvas");
    //       const img = document.createElement("img");
    //       img.src = reader.result;

    //       img.onload = () => {
    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(img, 0, 0);
    //         ctx.fillStyle = "yellow";
    //         ctx.textBaseline = "middle";

    //         ctx.fillText("Ant Design", 20, 20);
    //         canvas.toBlob(resolve);
    //       };
    //     };
    //   });
    // },
  };

  return (
    <>
      <ModleHeader>
        Upload New Media
        <Close onClick={props.Close} cursor="pointer" />
      </ModleHeader>

      <PageWrapper>
        <Upload {...Props} defaultFileList={imageName && [imageName]}>
          {console.log(imageName && [imageName], "now waht")}
          <div className="upload_modal">
            <div className="upload_img_close">
              <img src={require("./default.png")} className="img" />
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
        </Upload>{" "}
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

import React, { useState } from "react";
import { InputLable, ModleFooter, ModleHeader } from "../../shared/SharedStyle";
import { CustomModleButton } from "../../shared/SharedComponents";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../public/images/close.svg";

import { ImAttachment } from "react-icons/im";
import { AiOutlineClose } from "react-icons/ai";

export const TextNote = styled.div`
  color: var(--darkGray);
  font-size: 13px;
`;

const PageWrapper = styled.div`
  width: 600px;
  padding: 40px;
`;

function Index(props) {
  const [Active, setActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [Image, setImage] = useState(require("./default.png"));

  const [allowToChange, setallowToChange] = useState(false);

  const getFileSize = (e) => {
    let fileSize = e;
    var Uints = new Array("Bytes", "KB", "MB", "GB"),
      i = 0;
    while (fileSize > 900) {
      fileSize /= 1024;
      i++;
    }
    var exactSize = Math.round(fileSize * 100) / 100 + " " + Uints[i];
    // console.log("FILE SIZE = ", exactSize);
    // console.log(fileSize, "sizzzzzz");
    setFileSize(exactSize);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let value;
    setallowToChange(true);
    setActive(true);
    let type = e.target.files[0].type;
    props.handleInput(e.target.files[0]);

    if (type.substring(0, 5) === "image") {
      value = URL.createObjectURL(e.target.files[0]);
      setImage(value);
    } else {
      setImage(require("./file2.webp"));
    }
    setFileName(e.target.files[0].name);
    getFileSize(e.target.files[0].size);
  };
  const removeImage = () => {
    setActive(false);
    setImage(require("./default.png"));
    setallowToChange(false);
    setFileName("");
    setFileSize("");
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
    setActive(false);
  };
  const dragOver = (e) => {
    setActive(true);
    e.preventDefault();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    console.log("doregedd");
    let value;
    let type = e.dataTransfer.files[0].type;
    if (type.substring(0, 5) === "image") {
      props.handleInput(e.dataTransfer.files[0]);
      value = URL.createObjectURL(e.dataTransfer.files[0]);
      setImage(value);
    } else {
      setImage(require("./file2.webp"));
    }
    setallowToChange(true);
    setFileName(e.dataTransfer.files[0].name);
    getFileSize(e.dataTransfer.files[0].size);
  };
  return (
    <div>
      <ModleHeader>
        Upload New Media
        <Close onClick={props.Close} cursor="pointer" />
        {/* <AiOutlineClose  /> */}
      </ModleHeader>

      <PageWrapper>
        <div
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          className={Active ? "upload_modal active" : "upload_modal"}
        >
          <div className="upload_img_close">
            {allowToChange ? (
              <AiOutlineClose
                size="20px"
                cursor="pointer"
                onClick={removeImage}
              />
            ) : null}

            <img src={Image} className="img" />
          </div>
          <span
            style={{
              color: "var(--darkGray)",
            }}
          >
            Choose any file form computer or Drag & Drop it here
          </span>
          <span style={{ margin: "20px 0" }}>
            <input type="file" id="file" onChange={handleImageChange} />
            <label for="file"> ChooseFile</label>
          </span>
        </div>
        <span>
          {fileName ? (
            <span style={{ display: "flex", gap: "5px" }}>
              <TextNote>
                <ImAttachment />
              </TextNote>

              {fileName}
              <TextNote>{fileSize}</TextNote>
            </span>
          ) : (
            ""
          )}
        </span>
      </PageWrapper>
      <ModleFooter>
        <CustomModleButton fun={props.Close}>Cancel</CustomModleButton>
        <CustomModleButton main fun={props.handleSubmit}>
          Upload
        </CustomModleButton>
      </ModleFooter>
    </div>
  );
}

export default Index;

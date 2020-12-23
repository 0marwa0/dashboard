// File uploader page
import { UserImage } from "../Sidebar";
import { BsTrashFill, BsTrash } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { Popconfirm } from "antd";
import { FiEdit } from "react-icons/fi";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Checkbox, Tag, Tooltip, Popover, Drawer } from "antd";
import React, { useState, useEffect } from "react";
import { FilUploadedColumns, FilesData } from "./Config";
import CustomPage from "../shared/CustomPage";
import "../../styles/globals.css";
import { DateName } from "../Dashboard";

import { FileUpoaderData } from "../../fakeData";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NewFileUploader from "./NewFileUploader";

import { LoadData, addFile, removeItem } from "../../API";
import { monthNames } from "../shared/assets";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";
function FilUploader(props) {
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [files, setfiles] = useState([]);
  const [data, setdata] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  const onOpenModal = (open) => {
    setOpen(open);
  };
  const [file, setfile] = useState("");
  const [copied, setcopy] = useState(false);
  const [copiedUlr, setcopiedUlr] = useState("");
  const handleCopy = (url, id) => {
    setcopy(true);
    setcopiedUlr(url);
    seturl(id);
  };
  const [showNotification, setShow] = useState(false);
  const showPopup = (showNotification) => {
    setShow(showNotification);
  };

  const handleInput = (value) => {
    setfile(value);
  };
  const getFiles = () => {
    LoadData(
      "files",
      (err, data) => {
        setLoading(false);
        // setfiles(data.data.rows);
        if (err) {
          Mesg(err);
        } else {
          let Files = [];
          data.data.rows.map((file) => {
            Files.push({
              id: {
                url: file.link,
                id: file.id,
                delete: () => onDelete(file.id),
                copy: handleCopy,
                copied: copied,
                copiedUlr: copiedUlr,
              },
              FileTitle: file.name,
              Type: [
                `${
                  /[.]/.exec(file.name) ? /[^.]+$/.exec(file.name) : undefined
                }`,
              ],
              Size: "",
              UploadedDate: DateName(file.createdAt),
              image: "",
            });
          });
          setdata(Files);
          setFilterdata(Files);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
        console.log(err, "failed");
      }
    );
  };
  useEffect(() => {
    setLoading(true);
    getFiles();
    // if (localStorage.getItem("station_token")) {
    //   setLoading(true);
    //   getFiles();
    // } else {
    //   props.history.push("/login");
    // }
  }, []);
  const handleSubmit = () => {
    let data = new FormData();
    data.append("file", file);

    setLoading(true);
    addFile(
      "upload/file",
      data,
      (data) => {
        if (data.errMsg) {
          Mesg(data.errMsg);
        } else {
          SuccessMesg("File upload done !");

          onOpenModal(false);
          getFiles();
        }
        setfile("");
        setLoading(false);
      },
      (err) => {
        onOpenModal(false);
        setLoading(false);

        setfile("");

        FailedMesg(err.toString());
      }
    );
  };
  const onDelete = (id) => {
    setLoading(true);
    removeItem(
      "file",
      id,
      (err, data) => {
        if (err) {
          setLoading(false);
          Mesg(err);
        } else {
          setLoading(false);
          getFiles();
          SuccessMesg("Delete File Done !");
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg("Delete File Faild!", err);
      }
    );
    // console.log(id, "id to deleted");
  };
  const [searchText, setsearchText] = useState("");

  const HandleSearch = (e) => {
    let value = e.target.value;
    setsearchText(value);
    if (value) {
      //setFilterdata(data);
      let newData = data.filter((item) =>
        item.FileTitle.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilterdata(newData);
    } else {
      setFilterdata(data);
    }
  };
  const [url, seturl] = useState("");
  // const FilUploadedColumns = [
  //   { key: "1", title: "", dataIndex: "", render: () => <Checkbox /> },
  //   {
  //     key: "2",
  //     title: "File Title",
  //     dataIndex: "FileTitle",
  //     render: (item) => item,
  //     sorter: {
  //       compare: (a, b) => a.english - b.english,
  //       multiple: 1,
  //     },
  //   },

  //   {
  //     key: "3",
  //     title: "Type",
  //     dataIndex: "Type",
  //     sorter: {
  //       compare: (a, b) => a.chinese - b.chinese,
  //       multiple: 3,
  //     },
  //     render: (Type) => (
  //       <>
  //         {Type.map((type) => {
  //           let color;
  //           if (type === "pdf" || type == "PDF") {
  //             color = "orange";
  //           } else if (type === "jpg" || type == "JPG") {
  //             color = "blue";
  //           } else {
  //             color = "green";
  //           }
  //           return (
  //             <Tag color={color} key={type}>
  //               {type.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     key: "4",
  //     title: "Size",
  //     dataIndex: "Size",
  //     sorter: {
  //       compare: (a, b) => a.math - b.math,
  //       multiple: 2,
  //     },
  //   },
  //   {
  //     key: "5",
  //     title: "Uploaded Date",
  //     dataIndex: "UploadedDate",
  //     sorter: {
  //       compare: (a, b) => a.english - b.english,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     key: "6",
  //     title: "Uploaded by",
  //     dataIndex: "image",
  //     render: (theImageURL) => (
  //       <div style={{ width: "50px" }}>
  //         <UserImage
  //           alt={theImageURL}
  //           src={require("../../public/images/user2.png")}
  //         />
  //       </div>
  //     ),
  //     sorter: {
  //       compare: (a, b) => a.english - b.english,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     key: "7",
  //     title: "",
  //     dataIndex: "id",
  //     render: (item) => (
  //       <div className="ResourcesIcon">
  //         <div className="icon">
  //           <Popover
  //             content={<div>Copied !</div>}
  //             // title={}
  //             // onVisibleChange={(e) => item.copy(e, null)}
  //             trigger="click"
  //             visible={showNotification && item.id === url}
  //             onVisibleChange={showPopup}
  //             placement="top">
  //             {/* {item.url + "m" + url} */}
  //             <CopyToClipboard
  //               text={item.url}
  //               onCopy={(e) => item.copy(e, item.id)}>
  //               <FaCopy fontSize="16" style={{ cursor: "pointer" }} />
  //             </CopyToClipboard>{" "}
  //           </Popover>
  //         </div>
  //         <div className="icon">
  //           <a href={item.url} target="_blank">
  //             <FiEdit fontSize="16" />
  //           </a>
  //         </div>
  //         <div className="icon">
  //           <Popconfirm
  //             title="Are you sure？"
  //             okText="Yes"
  //             onConfirm={() => item.delete()}
  //             cancelText="No">
  //             <BsTrashFill fontSize="16" style={{ cursor: "pointer" }} />
  //           </Popconfirm>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div>
      <CustomPage
        pageTitle="file Uploader"
        columns={FilUploadedColumns}
        data={Filterdata}
        HandleSearch={HandleSearch}
        onOpenModal={onOpenModal}
        Loading={Loading}
        Item="file"
      />
      {/* <Modal
        closeOnOverlayClick={true}
        open={open}
        onClose={() => onOpenModal(false)}
        center
        showCloseIcon={false}
        classNames={{
          modal: "customModal",
        }}> */}
      <Drawer
        placement="right"
        closable={false}
        title={false}
        onClose={() => onOpenModal(false)}
        width={510}
        maskClosable={open}
        visible={open}
        key="right">
        <NewFileUploader
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          Close={() => onOpenModal(false)}
        />
      </Drawer>
      {/* </Modal> */}
    </div>
  );
}

export default FilUploader;

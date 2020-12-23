// Resource page

import React, { useState, useEffect } from "react";
import { ResourcesColumns, ResourcesData } from "./Config";
import CustomPage from "../shared/CustomPage";
import "../../styles/globals.css";

// import { ResourcesData } from "../../fakeData";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NewResources from "./NewResource";
import { LoadData, addData, addFile, removeItem } from "../../API";
import { monthNames } from "../shared/assets";
import { DateName } from "../Dashboard";
import { Drawer } from "antd";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";

function Resources(props) {
  const [open, setOpen] = useState(false);
  const onOpenModal = (open) => {
    setOpen(open);
  };
  const [Loading, setLoading] = useState(false);
  const [resource, setresource] = useState([]);
  const [data, setdata] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  const getResources = () => {
    setLoading(true);
    LoadData(
      "resources",
      (err, data) => {
        setLoading(false);
        if (err) {
          Mesg(err);
        }
        let Resources = [];
        data.data.rows.map((item) => {
          Resources.push({
            id: {
              url: item.url,
              id: item.id,
              delete: () => onDelete(item.id),
            },
            Title: item.name,

            Descriptions: item.description,
            Type: [
              `${/[.]/.exec(item.name) ? /[^.]+$/.exec(item.name) : undefined}`,
            ],
            Size: item.size,

            UploadedDate: DateName(item.createdAt),
            image: "",
          });
        });

        setdata(Resources);
        setFilterdata(Resources);
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
        console.log(err, "failed");
      }
    );
  };
  const [title, settitle] = useState("");
  const [dec, setdec] = useState("");
  const [url, seturl] = useState("");
  const [image, setimage] = useState("");
  const [file, setfile] = useState("");
  const [size, setsize] = useState("");
  const handleInput = (e, key) => {
    let value = e.target.value;
    let file = e;
    switch (key) {
      case "title":
        settitle(value);
        break;
      case "dec":
        setdec(value);
        break;

      default:
        break;
    }
  };
  const handleFile = (file) => {
    setimage(file);
  };
  const handlesiz = (file) => {
    setsize(file);
  };
  const handleSubmit = () => {
    setLoading(true);
    // let File = new FormData();
    // File.append("file", image);
    // addFile(
    //   "upload/file",
    //   File,
    //   (data) => {
    //     if (data.errMsg) {
    //       Mesg(data.errMsg);
    //     } else {
    var resource = {
      name: title,
      description: dec,
      url: image,
      image: image,
      nameAr: title,
      descriptionAr: dec,
      size: size.toString(),
    };
    console.log(resource, "file");
    addData(
      "resource",
      resource,
      (data) => {
        if (data.errMsg) {
          Mesg(data.errMsg);
        } else {
          SuccessMesg("Resource creating done !");

          getResources();
        }
        onOpenModal(false);
        ClearState();
      },
      (err) => {
        onOpenModal(false);
        ClearState();
        FailedMesg(" Resuorces creating failed ", err);
      }
    );
  };
  const ClearState = () => {
    setLoading(false);
    settitle("");
    setdec("");
    setimage("");
    seturl("");
  };
  useEffect(() => {
    getResources();
    // if (localStorage.getItem("station_token")) {
    //   getResources();
    // } else {
    //   props.history.push("/login");
    // }
  }, []);
  const onDelete = (id) => {
    setLoading(true);
    removeItem(
      "resource",
      id,
      (err, data) => {
        setLoading(false);

        if (err) {
          setLoading(false);
          Mesg(err);
        } else {
          setLoading(false);
          getResources();
          SuccessMesg("Delete File Done !");
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg("Delete File Faild!", err);
      }
    );
    console.log(id, "id to deleted");
  };
  const [searchText, setsearchText] = useState("");

  const HandleSearch = (e) => {
    let value = e.target.value;
    setsearchText(value);
    if (value) {
      //setFilterdata(data);
      let newData = data.filter((item) =>
        item.Title.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilterdata(newData);
    } else {
      setFilterdata(data);
    }
  };
  return (
    <div>
      <CustomPage
        pageTitle="resources"
        columns={ResourcesColumns}
        data={Filterdata}
        HandleSearch={HandleSearch}
        onOpenModal={onOpenModal}
        Item="resource"
        Loading={Loading}
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
        width={520}
        maskClosable={open}
        visible={open}
        key="right">
        <NewResources
          handleFile={handleFile}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          handlesiz={handlesiz}
          Close={() => onOpenModal(false)}
        />
      </Drawer>
      {/* </Modal> */}
    </div>
  );
}

export default Resources;

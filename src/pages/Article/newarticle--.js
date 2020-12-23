// import React, { useState, useEffect } from "react";// import { useLocation } from "react-router-dom";
// import { IoMdRefresh } from "react-icons/io";

// import { LoadData, addData, addFile } from "../../API";
// import { toole } from "./toole";
// import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
// import { ReactComponent as RefreshIcon } from "../../public/images/solid undo-right.svg";
// import { ReactComponent as RefreshIconLeft } from "../../public/images/solid undo.svg";
// import { ReactComponent as DropIcon } from "../../public/images/dropdown.svg";
// import { CustomPageWrapper, PageContent } from "../shared/CustomPage";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import ImageEditor from "@editorjs/image";
// // import Link from "@editorjs/link";
// import Table from "@editorjs/table";
// import SimpleImage from "@editorjs/simple-image";

// import { Link, useParams } from "react-router-dom";
// import { BsArrowLeft } from "react-icons/bs";
// import { PageBack } from "../Profile";
// import { Menu, Dropdown, message, Tooltip } from "antd";
// import { DownOutlined, UserOutlined } from "@ant-design/icons";
// import SideBar from "../Sidebar";
// import { Button, Row, Col, Input, Select, Upload, Tabs } from "antd";
// import { GlobalStyle } from "../Dashboard";
// import styled from "styled-components";
// import { ImAttachment } from "react-icons/im";
// import { FaTrashAlt } from "react-icons/fa";
// import { CustomInput } from "../shared/SharedStyle";
// // import { Space, HeadText } from "../Events/CreateEvent";
// import { ArticleContext } from "./editarticle";
// import { CustomButton } from "../shared/SharedComponents";
// import { Checkbox } from "@material-ui/core";
// // const { Option } = Select;

// export const HeadText = styled.div`
//   padding: 10px 0;
//   font-size: 16px;
//   font-weight: bold;
// `;
// export const Space = styled.div`
//   width: 17px;
// `;
// const { Option } = Select;
// const { TabPane } = Tabs;
// export const TextNote = styled.div`
//   color: var(--darkGray);
//   font-size: 13px;
// `;

// const EventContent = styled(Col)`
//   width: 65%;
//   min-height: 800px;
//   height: auto;
//   background-color: white;
//   border: 1px solid var(--lightGray);
//   position: relative;

//   border-radius: 0 0 7px 7px;
// `;
// const WidgetCol = styled(Col)`
//   background-color: white;
//   padding: 30px;
//   height: auto;

//   border-radius: 7px;
// `;
// const Widget = styled(Col)`
//   background-color: white;

//   margint-bottom: 10%;
// `;
// const Layout = styled(Row)`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   gap: 10px;
// `;

// const LanguageOption = styled.div`
//   display: flex;
//   padding: 10px 0;
//   gap: 5px;

//   justify-content: space-between;
//   background-color: white;
// `;
// const LanguageSide = styled.div`
//   padding: 10px 0;
//   background-color: white;
//   font-weight: bold;
// `;

// export const EventHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-top:
//   padding-bottom: 30px;
//   border-bottom: 1px solid var(--lightGray);
// `;
// const UploadContenter = styled.div`
//   background-color: white;
//   padding: 10px 20px;
//   border-radius: 7px;
//   margin-bottom: 5%;
//   width: 100%;
// `;

// const LanguageWidget = styled.div`
//   height: 35%;
//   background-color: white;
//   padding: 10px 20px;
//   border-radius: 7px;
// `;
// export const InputTitle = styled(Input)`
//   width: 80%;
//   height: 60px;
//   font-size: 20px;
//   border: none;
//   font-weight: 500;
// `;
// const PageTitle = styled.span`
//   font-size: 27px;
//   font-weight: bold;
// `;
// const MainLayout = styled(Col)`
//   width: 100%;
//   display: flex;
//   height: 100px;
//   align-items: center;

//   justify-content: space-between;
// `;

// const GrayText = styled.div`
//   color: var(--darkGray);
//   font-size: 0.9vw;
// `;
// function Index(props) {
//   let { id } = useParams();
//   let location = useLocation();
//   const [Active, setActive] = useState(false);

//   const [description, setdescription] = useState("");
//   const [platform, setplatform] = useState("");
//   const [titleAr, settitleAr] = useState("");
//   const [title, settitle] = useState("");
//   const [descriptionAr, setdescriptionAr] = useState("");
//   const [Loading, setLoading] = useState(false);
//   const [file, setfile] = useState("");

//   // const [fileName, setFileName] = useState("");
//   // const [fileSize, setFileSize] = useState("");
//   const handletext = (e) => {
//     setdescription(e);
//   };
//   const handletextAr = (e) => {
//     setdescriptionAr(e);
//   };
//   const handletextPlat = (e) => {
//     setplatform(e);
//   };
//   const [Image, setImage] = useState();
//   const handleselect = (e, key) => {
//     let value = e.target.value;
//     switch (key) {
//       case "title":
//         settitle(value);
//         break;
//       case "titleAr":
//         settitleAr(value);
//         break;

//         break;
//       default:
//         break;
//     }
//   };

//   const onEdit = (id) => {
//     setLoading(true);

//     let data = {
//       title: "test",
//       description: "test",
//       platform: "web",
//       publish: true,
//       image: "file",
//       lang: "ar",
//       gov: "baghdad",
//     };
//     addData(
//       `article/edit/${id}`,
//       data,
//       (mesg, Data) => {
//         SuccessMesg("Edit Article Done!");
//         setLoading(false);
//       },
//       (err) => {
//         setLoading(false);

//         FailedMesg(err);
//       }
//     );
//   };
//   const createArticle = () => {
//     let article = {
//       title: titleAr,
//       description: JSON.stringify(descriptionAr),
//       platform: platform,
//       publish: true,
//       image: Image,
//       lang: "ar",
//       gov: "baghdad",
//     };
//     console.log(article, "data sended");
//     // addData(
//     //   "article/add",
//     //   [artilce],
//     //   (mesg, Data) => {
//     //     SuccessMesg("Create Article Done!");
//     //     setLoading(false);
//     //   },
//     //   (err) => {
//     //     setLoading(false);
//     //     FailedMesg(err);
//     //   }
//     // );
//   };
//   let editor;
//   useEffect(() => {

//   }, []);

//   const [imageName, setimageName] = useState();
//   const HandleFile = (e) => {
//     setImage(e);
//   };
//   const Props = {
//     multiple: false,
//     name: "file",
//     action: "https://station-solo.herokuapp.com/dash/v1/upload/file",
//     headers: { token: localStorage.getItem("station_token") },

//     onChange({ file, fileList }) {
//       if (file.status === "done") {
//         let data = {
//           uid: file.uid,
//           name: file.name,
//           url: file.response.data.link,
//         };

//         HandleFile(file.response.data.link);

//         setimageName(data);
//       }
//     },
//   };
//   // console.log("its ", articles);
//   // let item = articles;
//   const EditerFooter = styled.div`
//     position: absolute;
//     background-color: #fafafa;
//     bottom: 0;
//     display: flex;
//     width: 100%;
//     height: 40px;
//     justify-content: space-between;
//     padding: 10px 20px;
//     border-radius: 0 0 7px 7px;
//     color: var(--darkGray);
//   `;
//   console.log(props.description, "doc ar data");
//   let doc = props.description ? props.description : [];
//   return (
//     // <ArticleContext.Consumer>
//     //   {({ data }) => (
//     <CustomPageWrapper>
//       {/* <GlobalStyle /> */}
//       <SideBar />
//       <PageContent>
//         {" "}
//         <div style={{ margin: "20px" }}>
//           <Row>
//             <MainLayout>
//               <div
//                 style={{
//                   height: "110px",
//                   margin: "60px 0",
//                 }}>
//                 <Link to="/booking">
//                   <PageBack>
//                     <BsArrowLeft />
//                     <div>Booking</div>
//                   </PageBack>
//                 </Link>
//                 <PageTitle>
//                   {props.type === "edit" ? "Update Article" : "New Article"}{" "}
//                 </PageTitle>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   gap: "6px",
//                   alignItems: "center",
//                 }}>
//                 <span style={{ color: "var(--textGray)", marginRight: "8px" }}>
//                   Save as draft
//                 </span>
//                 <CustomButton undo>
//                   <RefreshIconLeft />
//                 </CustomButton>
//                 <CustomButton undo>
//                   <RefreshIcon />
//                 </CustomButton>
//                 <CustomButton>Preview</CustomButton>
//                 <Space />

//                 <CustomButton main onOpen={createArticle}>
//                   {props.type === "edit" ? "Save" : "Finsh"}
//                 </CustomButton>
//               </div>
//             </MainLayout>
//           </Row>
//           <Row
//             style={{
//               display: "flex",
//             }}>
//             <EventContent>
//               <div className="card-container">
//                 <Tabs type="card">
//                   <TabPane tab="Arabic" key="1">
//                     <EventHeader>
//                       <InputTitle
//                         style={{ marginLeft: "10px", marginBottom: "10px" }}
//                         placeholder="Event Title Goes Here .."
//                         onChange={(e) => handleselect(e, "titleAr")}
//                       />
//                     </EventHeader>
//                     {/* <Editor
//                       style={{ marginLeft: "10px", marginBottom: "10px" }}
//                       placeholder="Start writing or tap here to add images or videos .."
//                       onData={(e) => handletextAr(e.blocks)}
//                       tools={toole}
//                       data={[]}
//                     />{" "} */}
//                   </TabPane>
//                   <TabPane tab="English" key="2">
//                     <EventHeader>
//                       {" "}
//                       <InputTitle
//                         style={{ marginLeft: "10px", marginBottom: "10px" }}
//                         placeholder="Event Title Goes Here .."
//                         //  onChange={(e) => handleselect(e, "title")}
//                       />
//                     </EventHeader>
//                     <div id="edit-artical"></div>
//                     {/* <Editor
//                       placeholder="Start writing or tap here to add images or videos .."
//                       // onData={(e) => handletext(e.blocks)}
//                       tools={toole}
//                       // data={data}
//                     /> */}
//                   </TabPane>
//                 </Tabs>
//               </div>
//               <EditerFooter>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "5",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}>
//                   <Checkbox color="gray"> </Checkbox>
//                   Disalbe
//                 </div>
//                 <div>Words count 0</div>
//               </EditerFooter>
//             </EventContent>
//             <Col
//               style={{
//                 width: "35%",
//                 paddingLeft: "2%",
//                 borderTop: "1px solid var(--lightGray)",
//               }}>
//               <UploadContenter>
//                 <HeadText>Header Photo</HeadText>
//                 <div className="upload_modal_event">
//                   <Upload {...Props} defaultFileList={imageName && [imageName]}>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "10px",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}>
//                       <img src={require("./default2.png")} className="img" />

//                       <span
//                         style={{
//                           color: "var(--darkGray)",
//                           fontSize: "1vw",
//                           width: "14vw",
//                         }}>
//                         Choose any file form computer or{" "}
//                         <span style={{ color: "black" }}>Drag & Drop </span>it
//                         here
//                       </span>
//                       <span style={{ margin: "20px 0" }}>
//                         <Button>Choose File</Button>
//                       </span>
//                     </div>
//                   </Upload>
//                 </div>
//               </UploadContenter>
//               <LanguageWidget>
//                 <HeadText>Settings</HeadText>
//                 <div>
//                   {/* <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}>
//                     <GrayText>Price</GrayText>
//                     <CustomInput
//                       placeholder="0"
//                       onChange={(e) => handleselect(e, "price")}
//                       style={{ width: "100px" }}
//                     />
//                   </div> */}

//                   <LanguageOption>
//                     <GrayText> Platform</GrayText>
//                     <Select
//                       suffixIcon={<DropIcon />}
//                       className="stylecss"
//                       defaultValue="both"
//                       onChange={(e) => handletextPlat(e)}>
//                       <Option key="both" def>
//                         both
//                       </Option>
//                       <Option key="web">web</Option>
//                       <Option key="app">app</Option>
//                     </Select>
//                   </LanguageOption>
//                 </div>
//               </LanguageWidget>
//             </Col>
//           </Row>
//         </div>
//       </PageContent>
//     </CustomPageWrapper>
//     //   )}
//     // </ArticleContext.Consumer>
//   );
// }

// export default Index;

import { IoMdRefresh } from "react-icons/io";

import { LoadData, addData, addFile } from "../../API";
import { toole } from "./toole";
import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
import { ReactComponent as RefreshIcon } from "../../public/images/solid undo-right.svg";
import { ReactComponent as RefreshIconLeft } from "../../public/images/solid undo.svg";
import { ReactComponent as DropIcon } from "../../public/images/dropdown.svg";
import { CustomPageWrapper, PageContent } from "../shared/CustomPage";
import React, { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { PageBack } from "../Profile";
import { Menu, Dropdown, message, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import SideBar from "../Sidebar";
import { Row, Col, Upload, Tabs } from "antd";
import { GlobalStyle } from "../Dashboard";
import styled from "styled-components";
import { ImAttachment } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import { CustomInput } from "../shared/SharedStyle";
// import { Space, HeadText } from "../Events/CreateEvent";
import { ArticleContext } from "./editarticle";
import { CustomButton } from "../shared/SharedComponents";
import { Checkbox } from "@material-ui/core";
import {
  Icon,
  Button,
  Divider,
  Image,
  Popup,
  Select,
  Loader,
  Dimmer,
  Input,
} from "semantic-ui-react";
import placeholder from "../../public/images/a.jpg";
import { withRouter } from "react-router-dom";
import fileDialog from "file-dialog";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageEditor from "@editorjs/image";
import Link from "@editorjs/link";
import Table from "@editorjs/table";
import SimpleImage from "@editorjs/simple-image";
export const HeadText = styled.div`
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
`;
export const Space = styled.div`
  width: 17px;
`;
const { Option } = Select;
const { TabPane } = Tabs;
export const TextNote = styled.div`
  color: var(--darkGray);
  font-size: 13px;
`;
const EditerFooter = styled.div`
  position: absolute;
  background-color: #fafafa;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 0 0 7px 7px;
  color: var(--darkGray);
`;
const EventContent = styled(Col)`
  width: 65%;
  min-height: 800px;
  height: auto;
  background-color: white;
  border: 1px solid var(--lightGray);
  position: relative;

  border-radius: 0 0 7px 7px;
`;
const WidgetCol = styled(Col)`
  background-color: white;
  padding: 30px;
  height: auto;

  border-radius: 7px;
`;
const GrayText = styled.div`
  color: var(--darkGray);
  font-size: 0.9vw;
`;
const Widget = styled(Col)`
  background-color: white;

  margint-bottom: 10%;
`;
const Layout = styled(Row)`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

const LanguageOption = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 5px;

  justify-content: space-between;
  background-color: white;
`;
const LanguageSide = styled.div`
  padding: 10px 0;
  background-color: white;
  font-weight: bold;
`;

export const EventHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top:
  padding-bottom: 30px;
  border-bottom: 1px solid var(--lightGray);
`;
const UploadContenter = styled.div`
  background-color: white;
  padding: 10px 20px;
  border-radius: 7px;
  margin-bottom: 5%;
  width: 100%;
`;

const LanguageWidget = styled.div`
  height: 35%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 7px;
`;
export const InputTitle = styled(Input)`
  width: 80%;
  height: 60px;
  font-size: 20px;
  border: none;
  font-weight: 500;
`;
const PageTitle = styled.span`
  font-size: 27px;
  font-weight: bold;
`;
const MainLayout = styled(Col)`
  width: 100%;
  display: flex;
  height: 100px;
  align-items: center;

  justify-content: space-between;
`;
var editor;

function Newarticle(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [platform, setPlatform] = useState("web");
  const [lang, setLang] = useState("en");
  const [thumbnail, setThumbnail] = useState("");
  const [gallery, setGallery] = useState([1, 2, 3, 4]);

  function uploadImage(files) {
    setIsLoading(true);
    var formdata = new FormData();
    formdata.append("image", files[0]);
    fetch("https://station-test-api.herokuapp.com/dash/v1/upload", {
      method: "POST",
      body: formdata,
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((respose) => respose.json())
      .then((jsonRespone) => {
        // console.log(jsonRespone);
        // setImageUrl(jsonRespone.url);
        // setThumbnail(jsonRespone.thumbnail);
        // setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }

  function publishArtical(publish) {
    setIsLoading(true);
    editor
      .save()
      .then((description) => {
        var artical = {
          title,
          description: JSON.stringify(description),
          platform,
          publish,
          image: imageUrl,
          thumbnail,
          lang,
          //gallery: gallery.toString()
        };

        fetch("https://station-test-api.herogggkuapp.com/dash/v1/article/add", {
          method: "POST",
          body: JSON.stringify(artical),
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        })
          .then((respose) => respose.json())
          .then((jsonRespone) => {
            //setIsLoading(false);
            // props.history.go(-1);
            // console.log(jsonRespone);
          })
          .catch((e) => {
            console.log(e);
            //setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }

  useEffect(() => {
    editor = new EditorJS({
      holderId: "creat-artical",
      tools: {
        headers: Header,
        list: List,
        image: {
          class: ImageEditor,
          config: {
            uploader: {
              uploadByFile(file) {
                console.log(file);
                var formdata = new FormData();
                formdata.append("image", file);
                return fetch(
                  "https://station-test-api.herokuapp.com/dash/v1/upload",
                  {
                    method: "POST",
                    body: formdata,
                    headers: {
                      token: localStorage.getItem("station_token"),
                    },
                  }
                )
                  .then((respose) => respose.json())
                  .then((jsonRespone) => {
                    return {
                      success: 1,
                      file: {
                        url: jsonRespone.url,
                      },
                    };
                  })
                  .catch((e) => {
                    console.log(e);
                    setIsLoading(false);
                  });
              },
            },
          },
        },
        table: Table,
        //link: Link
      },
      placeholder: "Let`s write an awesome story!",

      data: {},
    });
  }, []);

  return (
    // <CustomPageWrapper>
    //   {/* <GlobalStyle /> */}
    //   <SideBar />
    //   <PageContent>
    //     {" "}
    //     <div style={{ margin: "20px" }}>
    //       <Row>
    //         <MainLayout>
    //           <div
    //             style={{
    //               height: "110px",
    //               margin: "60px 0",
    //             }}>
    //             {/* <Link to="/booking">
    //               <PageBack>
    //                 <BsArrowLeft />
    //                 <div>Booking</div>
    //               </PageBack>
    //             </Link> */}

    //             <PageTitle>
    //               {props.type === "edit" ? "Update Article" : "New Article"}{" "}
    //             </PageTitle>
    //           </div>

    //           <div
    //             style={{
    //               display: "flex",
    //               gap: "6px",
    //               alignItems: "center",
    //             }}>
    //             <span style={{ color: "var(--textGray)", marginRight: "8px" }}>
    //               Save as draft
    //             </span>
    //             <CustomButton undo>
    //               <RefreshIconLeft />
    //             </CustomButton>
    //             <CustomButton undo>
    //               <RefreshIcon />
    //             </CustomButton>
    //             <CustomButton>Preview</CustomButton>
    //             <Space />

    //             <CustomButton
    //               main

    //               // onOpen={createArticle}
    //             >
    //               {props.type === "edit" ? "Save" : "Finsh"}
    //             </CustomButton>
    //           </div>
    //         </MainLayout>
    //       </Row>
    //       <Row
    //         style={{
    //           display: "flex",
    //         }}>
    //         <EventContent>
    //           <div className="card-container">
    //             <Tabs type="card">
    //               <TabPane tab="Arabic" key="1">
    //                 <EventHeader>
    //                   <InputTitle
    //                     style={{ marginLeft: "10px", marginBottom: "10px" }}
    //                     placeholder="Event Title Goes Here .."
    //                   />
    //                 </EventHeader>
    //               </TabPane>
    //               <TabPane tab="English" key="2">
    //                 <EventHeader>
    //                   {" "}
    //                   <InputTitle
    //                     style={{ marginLeft: "10px", marginBottom: "10px" }}
    //                     placeholder="Event Title Goes Here .."
    //                   />
    //                 </EventHeader>

    //               </TabPane>
    //             </Tabs>
    //           </div>
    //           <EditerFooter>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 gap: "5",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //               }}>
    //               <Checkbox color="gray"> </Checkbox>
    //               Disalbe
    //             </div>
    //             <div>Words count 0</div>
    //           </EditerFooter>
    //         </EventContent>
    //         <Col
    //           style={{
    //             width: "35%",
    //             paddingLeft: "2%",
    //             borderTop: "1px solid var(--lightGray)",
    //           }}>
    //           <UploadContenter>
    //             <HeadText>Header Photo</HeadText>
    //             <div className="upload_modal_event">
    //               <Upload
    //               // {...Props}

    //               // defaultFileList={imageName && [imageName]}
    //               >
    //                 <div
    //                   style={{
    //                     display: "flex",
    //                     flexDirection: "column",
    //                     gap: "10px",
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                   }}>
    //                   <img src={require("./default2.png")} className="img" />

    //                   <span
    //                     style={{
    //                       color: "var(--darkGray)",
    //                       fontSize: "1vw",
    //                       width: "14vw",
    //                     }}>
    //                     Choose any file form computer or{" "}
    //                     <span style={{ color: "black" }}>Drag & Drop </span>it
    //                     here
    //                   </span>
    //                   <span style={{ margin: "20px 0" }}>
    //                     <Button>Choose File</Button>
    //                   </span>
    //                 </div>
    //               </Upload>
    //             </div>
    //           </UploadContenter>
    //           <LanguageWidget>
    //             <HeadText>Settings</HeadText>
    //             <div>
    //               <LanguageOption>
    //                 <GrayText> Platform</GrayText>
    //                 {/* <Select
    //               suffixIcon={<DropIcon />}
    //               className="stylecss"
    //               defaultValue="both">
    //               <Option key="both" def>
    //                 both
    //               </Option>
    //               <Option key="web">web</Option>
    //               <Option key="app">app</Option>
    //             </Select> */}
    //               </LanguageOption>
    //             </div>
    //           </LanguageWidget>
    //         </Col>
    //       </Row>
    //     </div>
    //   </PageContent>
    // </CustomPageWrapper>
    <div id="edit-artical"></div>
  );
}
export default Newarticle;

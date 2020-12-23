import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-responsive-modal";
import NewBooking from "../Booking/NewBooking/NewBooking";
import { FailedMesg, Mesg, SuccessMesg } from "../../API/APIMessage";
import { LoadData, LoadBooking, LoadDataByID, addData } from "../../API";
//export const Values = React.createContext();
import { Values } from "../Booking/index";
function Index(props) {
  const [Loading, setLoading] = useState(false);
  const [Book, setBook] = useState([]);
  const [DateValues, setDateValues] = useState([]);
  let edit = props.Edit;
  let data = props.data ? props.data : [];
  let Design = props.Designs
    ? props.Designs.filter((item) => item.id != data.designId)
    : [];

  let space = data.space ? data.space.id : "";
  let lunch = data.lunch ? data.lunch.id : "";
  let design = Design[0] ? Design[0].id : "";
  let type = data.booktype ? data.booktype.id : "";
  let coffee = data.coffeebreak ? data.coffeebreak.id : "";
  const handleInput = (e, key) => {
    let value = e.target.value;
    switch (key) {
      case "title":
        settitle(value);
        break;
      case "price":
        setprice(value);
        break;
      case "received":
        setrecived(value);
        break;
      case "organizer":
        setorganizer(value);
        break;

      case "comment":
        setcomment(value);
        break;

      default:
        break;
    }
  };
  const handleselect = (e, key, daysValues) => {
    let value = e;
    switch (key) {
      case "typeId":
        settypeId(value);
        break;
      case "spaceId":
        setspaceId(value);
        break;
      case "designId":
        setdesignId(value);
        break;
      case "coffeebreakId":
        setcoffeebreakId(value);
        break;
      case "lunchId":
        setlunchId(value);
        break;
      case "people":
        setpeople(value);
        break;
      case "days":
        setDateValues(daysValues);
        setdays(value);
        break;
      case "name":
        setname(value);
        break;
      case "phone":
        setphone(value);
        break;
      case "email":
        setemail(value);
        break;
      case "gender":
        setgender(value);
        break;
      case "birthday":
        setbirthday(value);
        break;
      case "address":
        setaddress(value);
        break;
      default:
        break;
    }
  };
  const clearState = () => {
    settitle("");
    setorganizer("");
    setpeople();
    setcomment("");
    settypeId();
    setspaceId();
    setdesignId();
    setcoffeebreakId();
    setlunchId();
    setprice("");
    setrecived("");
    setdays([]);
  };
  const [name, setname] = useState("");
  const [phone, setphone] = useState();
  const [email, setemail] = useState();
  const [birthday, setbirthday] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [title, settitle] = useState(data.title);
  const [price, setprice] = useState(data.price);
  const [received, setrecived] = useState(data.received);
  const [organizer, setorganizer] = useState(data.organizer);
  const [people, setpeople] = useState(data.people);
  const [comment, setcomment] = useState(data.comment);
  const [typeId, settypeId] = useState(type);
  const [spaceId, setspaceId] = useState(space);
  const [designId, setdesignId] = useState(design);
  const [coffeebreakId, setcoffeebreakId] = useState(coffee);
  const [lunchId, setlunchId] = useState(lunch);
  const [days, setdays] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const handleEdit = () => {
    let data = {
      title: title,
      organizer: organizer,
      people: people,
      comment: comment,
      days: days,
      spaceId: spaceId,
      typeId: typeId,
      designId: designId,
      coffeebreakId: coffeebreakId,
      lunchId: lunchId,
      price: price,
      received: received,
    };
    props.onOpenModal(false);
    Object.keys(data).forEach(function (key) {
      if (data[key] === undefined || data[key] === "" || data[key] === []) {
        delete data[key];
      }
    });
  };

  const handleSubmit = () => {
    let data = {
      title: title,
      organizer: organizer,
      people: people,
      comment: comment,
      days: days,
      spaceId: spaceId,
      typeId: typeId,
      designId: designId,
      coffeebreakId: coffeebreakId,
      lunchId: lunchId,
      price: price,
      received: received,
      user: {
        // name: name,
        // phone: phone,
        // password: "1234",
        // sex: gender,
        // birthday: birthday,
        // address: address,
        // education: "",
        // jobTitle: "",
        // email: email,
        // lang: "ar",
        // image: "",
      },
    };
    props.onOpenModal(false);

    // onOpenModal(false);
    console.log(data, "book data sended/dash");
    setLoading(true);
    addData(
      "book/add",
      data,
      (mesg, Data) => {
        if (mesg) {
          clearState();
          Mesg(mesg);
          setLoading(false);
        } else {
          SuccessMesg("Booking done !");
          setLoading(false);
          props.onOpenModal(false);
          props.getData();
          clearState();
        }
      },
      (err) => {
        props.onOpenModal(false);
        setLoading(false);
        clearState();
        FailedMesg(err);
      }
    );
  };
  return (
    <div>
      <Values.Provider
        value={{
          title: edit ? data.title : title,
          organizer: edit ? data.organizer : organizer,
          people: edit ? data.people : people,
          comment: edit ? data.comment : comment,
          spaceId: edit ? space : spaceId,
          coffeebreakId: edit ? coffee : coffeebreakId,
          lunchId: edit ? lunch : lunchId,
          designId: edit ? design : designId,
          typeId: edit ? type : typeId,
          price: edit ? data.price : price,
          received: edit ? data.received : received,
          days: edit ? data.bookDates : days,
          DateValues: edit ? data.bookDates : days,
        }}>
        <Modal
          closeOnOverlayClick={true}
          open={props.open}
          onClose={() => {
            props.onOpenModal(false);
            clearState();
          }}
          center
          showCloseIcon={false}
          classNames={{
            modal: "customModal",
          }}>
          <NewBooking
            handleInput={handleInput}
            handleselect={handleselect}
            edit={edit ? true : false}
            handleSubmit={edit ? handleEdit : handleSubmit}
            Close={() => {
              props.onOpenModal(false);
              clearState();
            }}
          />
        </Modal>
      </Values.Provider>
    </div>
  );
}

export default Index;

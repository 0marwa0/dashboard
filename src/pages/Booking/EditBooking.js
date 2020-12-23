import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-responsive-modal";
import NewBooking from "../Booking/NewBooking/NewBooking";
import { FailedMesg, Mesg, SuccessMesg } from "../../API/APIMessage";
import {
  LoadData,
  LoadBooking,
  LoadDataByID,
  addData,
  editData,
} from "../../API";
//export const Values = React.createContext();
import { Values } from "../Booking/index";
function Index(props) {
  const [Loading, setLoading] = useState(false);
  const [Book, setBook] = useState([]);
  const [DateValues, setDateValues] = useState([]);

  let data = props.data;
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

  const [title, settitle] = useState(props.data.title);
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
  const [Designs, setDesigns] = useState([]);
  const getDetalis = () => {
    setLoading(true);

    LoadData(
      `book/${props.id}`,
      (err, data) => {
        setLoading(false);
        if (err) {
          Mesg(err);
        } else {
          let info = data.data;

          settitle(info.title);
          setorganizer(info.organizer);
          setpeople(info.people);
          setcomment(info.comment);
          setspaceId(info.spaceId);
          setlunchId(info.lunchId);
          setcoffeebreakId(info.coffeebreakId);
          settypeId(info.typeId);
          setprice(info.price);
          setrecived(info.received);
          setdays(info.bookDates);

          setdesignId(info.designId);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
      }
    );
  };
  useEffect(() => {
    getDetalis();
  }, []);

  const handleSubmit = () => {
    let data = {
      title: title,
      organizer: organizer,
      people: people,
      comment: comment,
      // days: days,
      spaceId: spaceId,
      typeId: typeId,
      designId: designId,
      coffeebreakId: coffeebreakId,
      lunchId: lunchId,
      price: price,
      received: received,
    };
    props.onOpenModal(false);
    // Object.keys(data).forEach(function (key) {
    //   if (data[key] === undefined || data[key] === "" || data[key] === []) {
    //     delete data[key];
    //   }
    // });
    props.onOpenModal(false);

    // onOpenModal(false);
    console.log(data, "book data sended", props.id);
    setLoading(true);
    editData(
      "book/update",
      data,
      props.id,
      (mesg, Data) => {
        if (mesg && mesg != undefined) {
          Mesg(mesg);
          setLoading(false);
        } else {
          // console.log(mesg, Data);
          SuccessMesg("Edit Booking done !");
          setLoading(false);
          props.onOpenModal(false);
          props.getData();
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
          data: data,
          title: title,
          organizer: organizer,
          people: people,
          comment: comment,
          spaceId: spaceId,
          coffeebreakId: coffeebreakId,
          lunchId: lunchId,
          designId: designId,
          typeId: typeId,
          price: price,
          received: received,
          days: DateValues,
          DateValues: days,
        }}>
        <Modal
          closeOnOverlayClick={true}
          open={props.open}
          onClose={() => {
            props.onOpenModal(false);
            //clearState();
          }}
          center
          showCloseIcon={false}
          classNames={{
            modal: "customModal",
          }}>
          <NewBooking
            handleInput={handleInput}
            handleselect={handleselect}
            handleSubmit={handleSubmit}
            edit={true}
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

// Event page
import React, { useState, useEffect } from "react";
import { EventsColumns, EventsData } from "./Config";
// import { EventsData } from "../../fakeData";
import CustomPage from "../shared/CustomPage";
import { DateName } from "../Dashboard";
import { LoadData, LoadBooking, LoadDataByID, addData } from "../../API";
import "react-responsive-modal/styles.css";
import { Mesg, FailedMesg, SuccessMesg } from "../../API/APIMessage";
import { monthNames } from "../shared/assets";
import { Modal } from "react-responsive-modal";
import { useHistory } from "react-router-dom";
import BookingModal from "../Dashboard";
import NewBooking from "../Booking/NewBooking/NewBooking";

function Events(props) {
  const [open, setOpen] = useState(false);

  const onOpenModal = (open) => {
    setOpen(open);
  };
  const [DateValues, setDateValues] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [events, setevents] = useState([]);
  const [data, setdata] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  const loadEvent = () => {
    setLoading(true);
    LoadData(
      "events",
      (err, data) => {
        setLoading(false);
        if (err) {
          Mesg(err);
        } else {
          setevents(data.data.rows);

          let Events = [];
          data.data.rows.map((item, index) => {
            // console.log(item.approvedBy, "event admin");
            console.log(Events);
            Events.push({
              id: index + 1,
              edit: item.id,
              Organizer: { name: item.organizer, id: item.bookId },
              Date: DateName(item.createdAt),
              Space: [`${item.space.title}`],
              SoldTickets: item.people - item.ticketLeft,
              Approvedby: props.admins
                .filter((i) => i.id === item.approvedBy)
                .map((i) => i.username)
                .toString(),
            });
          });
          setdata(Events);
          setFilterdata(Events);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
        // console.log(err, "failed");
      }
    );
  };
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
    // console.log("select is passed alredy");
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
  const [title, settitle] = useState("");
  const [price, setprice] = useState();
  const [received, setrecived] = useState();
  const [organizer, setorganizer] = useState("");
  const [people, setpeople] = useState();
  const [comment, setcomment] = useState("");
  const [typeId, settypeId] = useState();
  const [spaceId, setspaceId] = useState();
  const [designId, setdesignId] = useState(0);
  const [coffeebreakId, setcoffeebreakId] = useState(0);
  const [lunchId, setlunchId] = useState();
  const [days, setdays] = useState([]);
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
        name: name,
        phone: phone,
        password: "1234",
        sex: gender,
        birthday: birthday,
        address: address,
        education: "",
        jobTitle: "",
        email: email,
        lang: "ar",
        image: "",
      },
    };

    // onOpenModal(false);
    console.log(data, "book data sended");
    onOpenModal(false);
    setLoading(true);
    addData(
      "book/add",
      data,
      (mesg, Data) => {
        if (mesg) {
          Mesg(mesg);
          setLoading(false);
        } else {
          SuccessMesg("Booking Created Successfully !");
          setLoading(false);
          onOpenModal(false);
          // loadBook();
        }
      },
      (err) => {
        onOpenModal(false);
        setLoading(false);

        FailedMesg(err);
      }
    );
  };
  useEffect(() => {
    loadEvent();
    // if (localStorage.getItem("station_token")) {
    //   loadEvent();
    // } else {
    //   props.history.push("/login");
    // }
  }, []);

  const [searchText, setsearchText] = useState("");

  const HandleSearch = (e) => {
    let value = e.target.value;
    setsearchText(value);
    if (value) {
      setFilterdata(data);
    }
  };

  const Filter = () => {
    let newData = data.filter((item) =>
      item.Organizer.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(data, searchText);

    setFilterdata(newData);
  };
  return (
    <div>
      <CustomPage
        pageTitle="events"
        columns={EventsColumns}
        data={Filterdata}
        HandleSearch={HandleSearch}
        filter={Filter}
        Item="event"
        Loading={Loading}
        onOpenModal={onOpenModal}
      />
      <Modal
        closeOnOverlayClick={true}
        open={open}
        onClose={() => onOpenModal(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}>
        <NewBooking
          handleInput={handleInput}
          handleselect={handleselect}
          handleSubmit={handleSubmit}
          Close={() => onOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

export default Events;

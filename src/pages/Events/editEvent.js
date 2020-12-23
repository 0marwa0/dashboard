import React, { useEffect, useState, createContext } from "react";
import CreateEvent from "./CreateEvent";
import { useParams } from "react-router-dom";
import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
import { LoadData } from "../../API";
export let EventContext = createContext();
function Index(props) {
  let { id } = useParams();
  const LoadInfo = () => {
    LoadData(
      `event/${id}`,
      (err, data) => {
        //setLoading(false);
        if (err) {
          Mesg(err);
        } else {
          setdata(data.data);
        }
      },

      (err) => {
        // setLoading(false);
        FailedMesg(err, "Something worng happend !");
        // console.log(err, "failed");
      }
    );
  };
  const [data, setdata] = useState({});
  useEffect(() => {
    LoadInfo();
  }, []);
  let info = data ? data : {};

  return (
    <EventContext.Provider value={{ title: data.title }}>
      <CreateEvent edit={true} admins={props.admins} data={data} />
    </EventContext.Provider>
  );
}

export default Index;

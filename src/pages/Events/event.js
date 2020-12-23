import React from "react";
import Booking from "../Booking/booking";
function Index(props) {
  return <Booking event={true} admins={props.admins} />;
}

export default Index;

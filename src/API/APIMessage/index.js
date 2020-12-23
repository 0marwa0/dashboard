import { notification } from "antd";
import { GoCheck } from "react-icons/go";
import { FaExclamation } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import React from "react";
export const Mesg = (Msg) => {
  notification.open({
    message: "Something worng happend !",
    description: Msg,
    placement: "bottomRight",
    style: { borderRadius: "5px", width: "420px", height: "120px" },
    icon: (
      <div className="NotificationIcon">
        <FaExclamation color="var(--orange)" size={18} />
      </div>
    ),
  });
};
export const SuccessMesg = (Title, Msg) => {
  notification.open({
    message: Title,
    description: Msg,
    placement: "bottomRight",
    style: { borderRadius: "5px", width: "420px", height: "120px" },
    icon: (
      <div className="NotificationIcon Success">
        <GoCheck color="var(--darkGreen)" size={25} />
      </div>
    ),
  });
};
export const FailedMesg = (Title, Msg) => {
  notification.open({
    message: Title,
    description: Msg,
    placement: "bottomRight",
    style: { borderRadius: "5px", width: "420px", height: "120px" },
    icon: (
      <div className="NotificationIcon Failed">
        <IoIosWarning color="var(--red)" size={18} />
      </div>
    ),
  });
};

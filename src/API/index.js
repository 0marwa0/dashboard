// /** @format */

//import { Host } from "./Config";

let Host = "http://station-solo.herokuapp.com/dash/v1/";
// import axios from "axios";
//let Host = `https://station-test-api.herokuapp.com/dash/v1/`;

export const LoadData = (query, onSuccess, onFailure) => {
  // let data ;spaces
  fetch(`${Host}${query}`, {
    headers: {
      token: localStorage.getItem("station_token"),
    },
  })
    .then((resp) => resp.json())
    .then((jsonData) => {
      onSuccess(jsonData.errMsg, jsonData);
    })
    .catch((err) => {
      onFailure(err.message);
    });
};
export const LoadDataByID = (query, onSuccess, onFailure) => {
  fetch(`${Host}${query}`, {
    headers: {
      token: localStorage.getItem("station_token"),
    },
  })
    .then((resp) => resp.json())
    .then((jsonData) => {
      onSuccess(jsonData.errMsg, jsonData);
    })
    .catch((err) => {
      onFailure(err.message);
    });
};

// export const LoadBooking = (onSuccess, onFailure) => {
//   fetch(`${Host}books/home`, {
//     headers: {
//       token: localStorage.getItem("station_token"),
//     },
//   })
//     .then((resp) => resp.json())
//     .then((jsonData) => jsonData)
//     .then((jsonData) => {
//       let info = [];
//       jsonData.data.map((item) => {
//         LoadDataByID(
//           `book/${item.id}`,
//           (err, data) => {
//             info.push(data.data);
//             onSuccess(jsonData.errMsg, info);
//           },
//           () => {}
//         );
//       });
//     })
//     .catch((err) => {
//       onFailure(err.message);
//     });
// };
export const Login = (data, onSuccess, onFailure) => {
  let myHeaders = new Headers();
  let raw = JSON.stringify(data);
  // console.log(raw, "login data");
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: "POST",
    headers: myHeaders,

    body: raw,
    redirect: "follow",
  };
  fetch(`${Host}/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      localStorage.setItem("station_token", result.token);
      localStorage.setItem("Station_id", result.user.id);

      onSuccess(result.status, result.errMsg, result);
      //console.log(result, "login success");
    })

    .catch((error) => {
      //console.log(error.message, "login failed");
      onFailure(error.message);
    });
};

// Post request

export const addData = (query, data, onSuccess, onFailure) => {
  let options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("station_token"),
    },
    body: JSON.stringify(data),
  };

  fetch(`${Host}${query}`, options)
    .then((resp) => resp.json())
    .then((jsonData) => {
      console.log(jsonData.errMsg, jsonData, "on Success");
      onSuccess(jsonData.errMsg, jsonData);
      // console.log("data sended", data);
    })
    .catch((err) => {
      console.log(err, "add error");
      onFailure(err.message);
    });
};

export const addFile = (query, data, onSuccess, onFailure) => {
  var myHeaders = new Headers();
  // if (query === "resource") {
  //   myHeaders.append("Content-Type", "application/json");
  // }
  myHeaders.append("token", localStorage.getItem("station_token"));
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };
  fetch(`${Host}${query}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      onSuccess(result);
    })
    .catch((error) => {
      onFailure(error);
      console.log(error, "failure");
    });
};

export const removeItem = (query, id, onSuccess, onFailure) => {
  fetch(`${Host}${query}/${id}`, {
    method: "delete",
    headers: {
      token: localStorage.getItem("station_token"),
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((jsonData) => {
      onSuccess(jsonData.errMsg, jsonData);
    })
    .catch((err) => {
      onFailure(err.message);
    });
};

export const editData = (query, data, id, onSuccess, onFailure) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNTkzNDAzODI2MTQ5LCJpYXQiOjE1OTM0MDM4MjB9.4x1MBn-UnDXl-s83r0U4FBk2lYO9FMzkKBVjfCPUeUQ"
  );

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${Host}${query}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      onSuccess(result.errMsg, result.data);
    })
    .catch((error) => onFailure(error.toString()));
};

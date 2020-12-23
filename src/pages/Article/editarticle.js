import React, { useState, useEffect, createContext } from "react";
import { editData } from "../../API";
import { useParams } from "react-router-dom";

import Newarticle from "./newarticle--";
import { LoadData, addData, addFile } from "../../API";
import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
export const ArticleContext = createContext();
function Index() {
  let { id } = useParams();
  const [description, setdescription] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    LoadData(
      `article/${id}`,
      (err, data) => {
        if (err) {
          Mesg(err);
          //setLoading(false);
        } else {
          setData(data.data);

          // console.log("one article", data.data.description);
          setdescription(data.data.description);
        }
      },
      (err) => {
        //setLoading(false);
        FailedMesg(err, "Something worng happend !");
      }
    );
  }, []);

  return (
    <ArticleContext.Provider value={{ data: data.description }}>
      <Newarticle type="edit" description={data.description} />
    </ArticleContext.Provider>
  );
}

export default Index;

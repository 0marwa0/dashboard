import React, { useEffect } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageEditor from "@editorjs/image";
import Link from "@editorjs/link";
import Table from "@editorjs/table";

function Index(props) {
  useEffect(() => {
    props.ShowEditor();
  }, []);
  return (
    <div
      id="enEditor"
      style={{
        width: "100%",
      }}></div>
  );
}

export default Index;

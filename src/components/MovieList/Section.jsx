import React from "react";
import style from "./styled";
import List from "./List";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function section() {
  return (
    <style.section>
      <style.btn>
        <ArrowBackIosIcon />
      </style.btn>
      <List />
      <style.btn>
        <ArrowForwardIosIcon />
      </style.btn>
    </style.section>
  );
}

export default section;

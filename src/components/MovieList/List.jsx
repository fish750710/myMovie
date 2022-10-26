import React from "react";
import style from "./styled";
import Card from "../Card";

function list() {
  return (
    <style.List>
      <div className="title">熱門電影</div>
      <div className="content">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </style.List>
  );
}

export default list;

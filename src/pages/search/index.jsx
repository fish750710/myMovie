import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Tag from "@/components/Tag";

import { moviesSVC } from "@/api";
import base from "@/api/base";

import style from "./styled";
import "./index.scss";

function index() {
  const renderRef = useRef(true);

  useEffect(() => {
    try {
      if (renderRef.current) {
        renderRef.current = false;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <style.Content>
      <style.Section>123123132</style.Section>
      <style.Section></style.Section>
    </style.Content>
  );
}

export default index;

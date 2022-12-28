import React, { memo } from "react";
import style from "./styled";

export default memo(({ item }) => {
  return <style.Tag>{item}</style.Tag>;
});

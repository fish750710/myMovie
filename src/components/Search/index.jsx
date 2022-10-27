import React from "react";
import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 10px 16px;
  gap: 7px;

  width: 448px;
  height: 38px;

  border: 1px solid ${styles.font_color};
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0);
`;
function index() {
  return <Input />;
}

export default index;

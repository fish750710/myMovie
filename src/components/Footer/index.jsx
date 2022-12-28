import React from "react";
import styled from "styled-components";
import styles from "@/styles/_export.module.scss";
import { devices } from "@/styles/devices";

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50px;
  background-color: ${styles.bg_color};
  font-size: 14px;
  line-height: 21px;
  z-index: 0;
  margin-top: 50px;
  @media ${devices.sm} {
    margin-top: 0px;
    margin-bottom: 58px;
  }
`;
export default function () {
  return (
    <Footer>
      <p>© Copyright 2022</p>
      <p>資料來源取自TMDB，僅供練習作品使用，非商業與營利用途</p>
    </Footer>
  );
}

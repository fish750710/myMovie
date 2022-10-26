import React from "react";
import styled from "styled-components";
import styles from "../../styles/_export.module.scss";

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
`;
function index() {
  return (
    <Footer>
      <p>© Copyright 2022</p>
      <p>圖片與素材取自網路，僅供練習作品使用，非商業與營利用途</p>
    </Footer>
  );
}

export default index;

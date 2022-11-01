import React from "react";
import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const Banner = styled.div`
  background-color: ${styles.bg_color};
  /* width: 1280px; */
  height: 720px;
  position: relative;
`;
const Title = styled.div`
  width: 345px;
  position: absolute;
  left: 110px;
  top: 200px;
  z-index: 0;
  line-height: 24px;
  .score {
    width: 103px;
    height: 80px;
    font-weight: 700;
    font-size: 70px;
    text-align: right;
    background: ${styles.btn_gradual_color};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.48);
    line-height: 1;
  }
  h2 {
    font-weight: 500;
    font-size: 76px;
    line-height: 110px;
  }
  .btn-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    a {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;
      width: 160px;
      height: 42px;
      background: #161616;
      border-radius: 13px;
    }
    .btn-bg {
      padding: 2px;
      background: ${styles.btn_gradual_color};
      .content {
        width: 100%;
        height: 100%;
        background: ${styles.btn_color};
        border-radius: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

function index() {
  return (
    <Banner className="">
      {/* <Title>
        <div className="score">8.8</div>
        <h2>殭屍校園</h2>
        <div className="info">
          <p>
            開春鉅作《殭屍校園》短短一周在全球造成話題，「喪屍」熱潮再現！雖然，喪屍題材已是...
          </p>
        </div>
        <div className="btn-box">
          <a className="more btn-bg">
            <div className="content">更多資訊</div>
          </a>
          <a className="add btn-bg">加入片單</a>
        </div>
      </Title> */}
    </Banner>
  );
}

export default index;

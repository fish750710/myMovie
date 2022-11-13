import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};

style.Banner = styled.div`
  background-color: ${styles.bg_color};
  display: flex;
  justify-content: center;
  position: relative;
`;
style.BannerBox = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 720px;
  position: relative;
`;
style.Title = styled.div`
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
    font-size: 36px;
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
style.Img = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  /* 內層陰影 */
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.48));
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
`;
style.Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(360deg, #1b1e25 0%, rgba(27, 30, 37, 0) 29.22%),
    radial-gradient(
      72.5% 427.7% at 96.33% 50%,
      rgba(27, 30, 37, 0) 39.58%,
      rgba(27, 30, 37, 0.93) 94.79%
    );
`;
export default style;

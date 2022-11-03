import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
style.Intro = styled.div`
  display: flex;
  .main-img {
    position: relative;
    width: 323px;
    height: 430px;
    margin-right: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    img {
      width: 100%;
      height: 100%;
      background: #686b72;
      background-size: cover;
      filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.48));
      border-radius: 20px;
    }
    .btn-play {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      position: absolute;
      &::before {
        content: "";
        position: absolute;
        top: calc(50% - 10px);
        left: calc(50% - 10px);

        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 0 10px 20px;
        border-color: transparent transparent transparent white;
      }
    }
  }
  .info-box {
    .title {
      display: flex;
      font-weight: 500;
      font-size: 38px;
      line-height: 55px;
      .score {
        margin-left: 18px;
        font-weight: 700;
        font-size: 50px;

        background: ${styles.btn_gradual_color};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
    .description {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin: 12px 8px;
    }
    .play-platform {
      img {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        margin: 5px;
      }
    }
  }
`;
style.Section = styled.div`
  max-width: 1200px;
  width: 100%;
  background: rgba(104, 107, 114, 0.1);
  border-radius: 20px;
  padding: 24px;
  margin: 6px;
`;

export default style;

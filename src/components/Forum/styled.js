import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.CardBox = styled.div`
  margin: 20px 8px;
`;
style.Card = styled.div`
  /* width: 154px;
  height: 250px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .score {
    position: absolute;
    right: 4px;
    top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    width: 33px;
    height: 20px;

    background: ${styles.btn_gradual_color};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.48);
    border-radius: 4px;
  }
  .move-name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    margin-top: 4px;
  } */
`;
style.Img = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  /* 內層陰影 */
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.48));
  padding: 0;
  margin: 0;
  width: 100%;
  height: 231px;
  border-radius: 8px;
`;

export default style;

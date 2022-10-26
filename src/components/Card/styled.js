import styled from "styled-components";
import styles from "../../styles/_export.module.scss";

const style = {};
style.Card = styled.div`
  margin: 8px;
  width: 152px;
  height: 225px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .score {
    position: absolute;
    right: 4px;
    bottom: 30px;
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
  }
`;
style.Img = styled.img`
  background: linear-gradient(
      180deg,
      rgba(22, 22, 22, 0) 30.58%,
      rgba(22, 22, 22, 0.98) 100%
    ),
    url(image.png);
  /* 內層陰影 */
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.48));

  width: 152px;
  height: 201px;
  border-radius: 8px;
  background-color: #fff;
`;
export default style;

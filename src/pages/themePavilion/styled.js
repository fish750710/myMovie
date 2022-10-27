import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.content = styled.div`
  /* width: 100%;
  min-height: 100%;
  color: white;
  font-size: 16px; */
  margin-top: 105px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

style.card = styled.div`
  width: 360px;
  height: 180px;
  margin: 8px;
  /* padding: 8px 8px 4px; */
  background-color: gray;
  display: flex;
  justify-content: end;
  align-items: flex-end;
  border-radius: 8px;

  /* background: linear-gradient(180deg, rgba(22, 22, 22, 0.98) -71.5%, rgba(22, 22, 22, 0) 46.55%, rgba(22, 22, 22, 0.98) 100%), url(image.png); */
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.48));
  
  p {
    padding: 4px 8px;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.48);
  }
`

export default style;

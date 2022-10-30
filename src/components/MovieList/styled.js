import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 10px 40px; */
  border-radius: 20px;
`;
style.List = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0px;
  gap: 14px; // 間距

  border-radius: 20px;
  .title {
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    margin: 0 8px;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
  }
`;

style.btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 50px;
  height: 50px;
  background: rgba(104, 107, 114, 0.1);
  border-radius: 13px;
  margin: 0 26px;
`;
export default style;

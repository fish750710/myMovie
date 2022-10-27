import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.Content = styled.div`
  margin-bottom: 30px;
  .section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .btn{
    width: 66.36px;
    height: 28px;
    background: ${styles.bg_color};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
  }
  .active {
    background: ${styles.btn_gradual_color};
  }
`
export default style;

import styled from "styled-components";
import styles from "../../styles/_export.module.scss";

const style = {};
style.Content = styled.div`
  margin-bottom: 30px;
  .title{
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding-left: 8px;
    border-left: 2px solid white;

    /* width: 3px;
    height: 23px; */

    /* blue_red */

    /* background: linear-gradient(91.47deg, #C10171 3.73%, #5C00F2 100%);
    border-radius: 50px; */
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .btn{
    width: 66.36px;
    height: 28px;
    background: #161616;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
    &:hover{
      cursor: pointer;
    }
  }
  .active {
    background: linear-gradient(91.47deg, #C10171 3.73%, #5C00F2 100%);
  }
`
export default style;

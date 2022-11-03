import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

style.Section = styled.div`
  width: 1200px;
  background: rgba(104, 107, 114, 0.1);
  border-radius: 20px;
  padding: 24px;
  margin: 6px;
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export default style;

import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
style.section = styled.div`
    width: 100%;
    max-width: 1200px;
    background: rgba(104, 107, 114, 0.1);
    border-radius: 20px;
    padding: 24px;
    margin: 6px 0;
`;
export default style;

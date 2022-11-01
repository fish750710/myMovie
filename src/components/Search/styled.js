import styled from "styled-components";
import styles from "@/styles/_export.module.scss";

const style = {};
style.StyledInputBase = styled.input`
  padding: 4px 0px 5px;
  border: 0px;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0px;
  margin-left: 30px;
  display: block;
  padding: 8px 8px 8px 16px;
  width: calc(100% - 50px);
  max-width: 250px;
  min-width: 100px;
  &:focus {
    outline: none;
  }
`;
style.Search = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  margin-right: 16px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  width: 100%;
  max-width: 300px;
  margin-left: 24px;
  color: white;
`;
style.SearchIconWrapper = styled.div`
  padding: 0px 16px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

export default style;

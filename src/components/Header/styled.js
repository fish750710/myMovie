import styled from "styled-components";
import styles from "../../styles/_export.module.scss";

const style = {};
style.Navbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  gap: 60px;
  z-index: 999;

  position: absolute;
  width: 100%;
  height: 58px;
  left: 0px;
  top: 0px;

  background: rgba(27, 30, 37, 0.68);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.48);
`;
style.Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  li {
    width: 77px;
    height: 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;

    text-align: center;
    color: ${styles.font_light};

    &:hover {
      cursor: pointer;
    }
  }
`;
export default style;

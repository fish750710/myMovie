import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';
import { devices } from '@/styles/devices';

const style = {};
style.Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 56px;
  left: 0px;
  bottom: 0;

  /* black */

  background: #161616;
  /* shadow */
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
    color: ${styles.font_color};
    position: relative;
    margin: 0 4px;
    .active {
      color: ${styles.font_light};
      /* &::before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 77px;
        height: 4px;
        background: ${styles.btn_gradual_color};
        border-radius: 50px;
      } */
    }
  }
`;
export default style;

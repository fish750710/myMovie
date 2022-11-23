import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';
import { devices } from '@/styles/devices';

const style = {};
style.Content = styled.div`
  margin-bottom: 30px;
  @media ${devices.xs} {
    margin-bottom: 0px;
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
    @media ${devices.xs} {
      margin-top: 5px;
    }
  }
  .btn {
    padding: 3.5px 20px;
    height: 28px;
    background: ${styles.bg_color};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
    @media ${devices.xs} {
      padding: 3.5px 16px;
    }
  }
  .active {
    background: ${styles.btn_gradual_color};
  }
`;
export default style;

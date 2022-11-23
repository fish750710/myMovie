import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';
import { devices } from '@/styles/devices';

const style = {};
style.content = styled.div`
  /* width: 100%;
  min-height: 100%;
  color: white;
  font-size: 16px; */
  margin-top: -82px;
  @media ${devices.sm} {
    margin-top: 0;
  }
  .content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .section {
    max-width: 1200px;
    width: 100%;
    /* padding: 24px;
    margin: 6px; */
  }
  .section-bg {
    background: rgba(104, 107, 114, 0.1);
    border-radius: 20px;
  }
`;

export default style;

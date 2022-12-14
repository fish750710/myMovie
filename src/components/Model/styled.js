import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';
import { devices } from '@/styles/devices';

const style = {};
style.content = styled.div`
  /* width: 100%;
  min-height: 100%;
  color: white;
  font-size: 16px; */
  /* width: 500px; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* @media ${devices.xs} {
    padding: 0px 16px;
    margin: 0 auto;
  } */
  .btn-submit {
    width: 160px;
    height: 42px;
  }
  .btn-more {
    /* width: 300px; */
    height: 52px;
  }
  .main {
    max-width: 1280px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 0 40px;
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    @media ${devices.xs} {
      padding: 0px 16px;
    }
  }
  .footer {
    width: 100%;
    margin: 50px;
  }
`;
style.section = styled.div`
  width: 100%;
  max-width: 1200px;
  background: rgba(104, 107, 114, 0.1);
  /* background-color: #ffffff; */
  border-radius: 20px;
  padding: 24px;
  margin: 6px 0;
  @media ${devices.xs} {
    padding: 0px 16px;
    margin: 0 auto;
  }
`;

export default style;

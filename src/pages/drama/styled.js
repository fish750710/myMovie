import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';

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
  .btn-submit {
    width: 160px;
    height: 42px;
  }
  .btn-more {
    /* width: 300px; */
    height: 52px;
  }
  .main {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
  .footer {
    width: 100%;
    margin: 50px ;
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
`;

export default style;

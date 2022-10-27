import styled from 'styled-components';
import styles from '@/styles/_export.module.scss';

const style = {};
style.CardBox = styled.div`
  margin: 8px;
`;
style.Card = styled.div`
  width: 152px;
  height: 200px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  .score {
    position: absolute;
    right: 4px;
    bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    width: 33px;
    height: 20px;

    background: ${styles.btn_gradual_color};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.48);
    border-radius: 4px;
  }
  .move-name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    margin-top: 4px;
  }
`;
style.Img = styled.div`
  /* 內層陰影 */
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.48));
  padding: 0;
  margin: 0;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;

`;
export default style;

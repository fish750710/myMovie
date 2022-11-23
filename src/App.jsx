import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import styled from 'styled-components';
import styles from './styles/_export.module.scss';
import { devices } from '@/styles/devices';

const AppStyled = styled.div`
  background-color: ${styles.bg_color};
  /* max-width: 1920px; */
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  main {
    height: 100%;
    display: block;
    z-index: 1;
    color: white;
    font-size: 16px;
    margin-top: 82px;
    @media ${devices.sm} {
      margin-top: 50px;
      min-height: 80vh;
      /* color: red; */
      /* height: calc(100% - 200px); */
    }
  }
`;
function App() {
  const isMobile = useMediaQuery({ maxWidth: 599 });
  return (
    <AppStyled className=''>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {isMobile && <Navbar />}
    </AppStyled>
  );
}

export default App;

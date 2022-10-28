import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import styled from "styled-components";
import styles from "./styles/_export.module.scss";

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
  }
`;
function App() {
  return (
    <AppStyled className="">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </AppStyled>
  );
}

export default App;

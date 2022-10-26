import React from "react";
import Banner from "../../components/Banner";
import Section from "../../components/MovieList/Section";
import style from "./styled";
import "./index.scss";

// background: rgba(104, 107, 114, 0.1);
function index() {
  return (
    <style.content>
      <Banner />
      <div className="content">
        <div className="">
          <Section />
        </div>
        <div className="section-bg">
          <Section />
        </div>
        <div className="">
          <Section />
        </div>
        <div className="section-bg">
          <Section />
        </div>
      </div>

      {/* <p>12312313213</p>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="h-64"></div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="h-64"></div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="h-64"></div> */}
    </style.content>
  );
}

export default index;

import React from "react";
import Banner from "@/components/Banner";
import Section from "@/components/MovieList/Section";
import style from "./styled";
import "./index.scss";

// background: rgba(104, 107, 114, 0.1);
function index() {
  return (
    <style.content>
      <Banner />
      {/* <div className="content">
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
      </div> */}
      <div className="content">
        <Section title="熱門電影" />
      </div>
    </style.content>
  );
}

export default index;

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Banner from "@/components/Banner";
import Section from "@/components/MovieList/Section";

import style from "./styled";

const index = () => {
  return (
    <style.content>
      <Banner />
      <div className="content">
        <div className="section">
          <Section title="熱門電影" category="movie" />
        </div>
        <div className="section section-bg">
          <Section title="熱門戲劇" category="tv" />
        </div>
        <div className="section">
          <Section title="熱門韓國電影" category="movie" />
        </div>
        <div className="section section-bg">
          <Section title="熱門韓劇" category="tv" />
        </div>
        <div className="section">
          <Section title="熱門華語電影" category="movie" />
        </div>
        <div className="section section-bg">
          <Section title="熱門華語劇" category="tv" />
        </div>
      </div>
    </style.content>
  );
};

export default index;

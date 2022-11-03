import React, { useEffect, useState, useRef } from "react";
// import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import Banner from "@/components/Banner";
import Section from "@/components/MovieList/Section";

// import { authenticationSVC } from '@/api';


import style from "./styled";


// background: rgba(104, 107, 114, 0.1);
function index() {
  const renderRef = useRef(true);

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    
  }, [])
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

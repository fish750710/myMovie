// 首頁 有swiper功能

import React from "react";
import { useNavigate } from "react-router-dom";
// import { useMediaQuery } from 'react-responsive';
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/navigation";

import style from "./styled";
import Card from "../Card";

function list({ isLoading, itemList, title, category }) {
  const navigate = useNavigate();
  const toDetail = (item) => {
    navigate(`/${category}/detail/${item.id}`);
  };
  return (
    <style.List>
      <div className="title">{title}</div>
      <Swiper
        breakpoints={{
          // when window width is >= 640px
          375: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        style={{
          "--swiper-navigation-color": "#fff",
          padding: "0 38px",
        }}
        className="w-full"
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        loop
      >
        {itemList?.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              isLoading={isLoading}
              item={item}
              key={index}
              toDetail={toDetail}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </style.List>
  );
}

export default list;

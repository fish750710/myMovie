// 首頁 有swiper功能

import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/navigation";

import style from "./styled";
import Card from "../Card";

function list({ isLoading, itemList, title, category }) {
  const navigate = useNavigate();
  const toDetail = (item) => {
    console.log("item list =>", item.id, category);
    navigate(`/${category}/detail/${item.id}`);
  };
  return (
    <style.List>
      <div className="title">{title}</div>
      <Swiper
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
        slidesPerView={5}
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

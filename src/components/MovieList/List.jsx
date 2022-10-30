import React from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/navigation";

import style from "./styled";
import Card from "../Card";

function list({ isLoading, itemList, title }) {
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
            <Card isLoading={isLoading} item={item} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </style.List>
  );
}

export default list;

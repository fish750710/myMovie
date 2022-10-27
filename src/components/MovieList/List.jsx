import React from "react";
import style from "./styled";
import Card from "../Card";

function list() {
  const isLoading = false;
  const itemList = [
    {
      name: '蛛蛛人',
      imgUrl:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      score: '8.2',
    },
    {
      name: '蛛蛛人2',
      imgUrl:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      score: '7.5',
    },
    {
      name: '蛛蛛人3',
      imgUrl:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
      score: '6',
    },
    {
      name: '蛛蛛人4',
      imgUrl:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
      score: '9.1',
    },
    {
      name: '蛛蛛人5',
      imgUrl:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      score: '2',
    },
    {
      name: '蛛蛛人6',
      imgUrl:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
      score: '9.9',
    },
  ];

  return (
    <style.List>
      <div className="title">熱門電影</div>
      <div className="content">
      { itemList.map((item, index) => <Card isLoading={isLoading} item={item} key={index}/>)}
      </div>
    </style.List>
  );
}

export default list;

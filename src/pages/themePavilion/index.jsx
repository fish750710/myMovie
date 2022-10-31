import React from "react";

import style from "./styled";

// background: rgba(104, 107, 114, 0.1);
function index() {
  const arr = ['浪漫愛情', '熱門韓劇', '喜劇之王', '驚悚恐怖', '燒腦懸疑', '動作冒險', '動漫動畫', '喪屍、病毒', 'Netflix 經典']
  return (
    <style.content>
      {arr.map((item, index) => (
        <style.card><p>{item}</p></style.card>
      ))}
    </style.content>
  );
}

export default index;

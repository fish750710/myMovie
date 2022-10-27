import React from 'react';

import Tag from '@/components/Tag';

import style from './styled';
import './index.scss';

// background: rgba(104, 107, 114, 0.1);
function index() {
  const tagsList = ['劇情', '科幻奇幻'];
  return (
    <style.Content>
      <style.Section>
        <style.Intro>
          <div className='main-img'>
            <div className='btn btn-gradual btn-play'></div>
          </div>
          <div className='info-box w-full'>
            <div className='flex'>
              {tagsList.map((item) => (
                <Tag item={item} key={item} />
              ))}
            </div>
            <div className='title mb-3'>
              殭屍校園
              <div className='score'>0.0</div>
            </div>
            <div className='flex mb-4'>
              <div className='label'>2022/01/28</div>
              <div className='label'>韓語</div>
              <div className='label'>01小時05分</div>
            </div>
            <div className='label mb-4'>導演 Chun Sung-il</div>
            <div className='label mb-4'>劇情介紹</div>

            <div className='description w-full'>
              開春鉅作《殭屍校園》短短一周在全球造成話題，「喪屍」熱潮再現！雖然，喪屍題材已是老梗，但大家知道原來喪屍也有分門別類！而劇集裡最特別的就是半人半屍的「無感染症狀」者，大家都以為奎男和南拉都是「半屍人」，但為什麼奎男嗜血成性而南拉卻能像「謎豆子」一樣努力克制自己咬人呢？
            </div>
            <div className='label'>播放平台</div>
            <div className='play-platform flex'>
              <img src='./images/logo/netflix.png' alt='' />
              <img src='./images/logo/QIY.png' alt='' />
              <img src='./images/logo/disney+.png' alt='' />
            </div>
          </div>
        </style.Intro>
      </style.Section>
      <style.Section>
        <style.ActorList>
          <img src='./images/actor/Lee-sang-hee.png' alt='' />
          <img src='./images/actor/Park-Ji-hu.png' alt='' />
        </style.ActorList>
      </style.Section>
    </style.Content>
  );
}

export default index;

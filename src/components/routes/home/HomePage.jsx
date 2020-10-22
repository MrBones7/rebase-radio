/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { fullscreenBg, fullscreenBgVideo } from './HomePage.styles.less';

import PosterImage from './poster.jpg';

export default function HomePage() {
  const backgroundVideoSrc = "https://github.com/rbubs/rebase-radio/raw/master/video-asset/background.mp4";

  return (
    <div className={fullscreenBg}>
      <video loop muted autoPlay poster={PosterImage} className={fullscreenBgVideo}>
        <source src={backgroundVideoSrc} type="video/mp4" />
        <img src={PosterImage} alt="Your browser does not support the video element" />
      </video>
    </div>
  );
}

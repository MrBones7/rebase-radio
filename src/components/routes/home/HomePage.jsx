/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { overlay, content, fullwidthContainer, fullwidthVideo, wrapperFullwidthVideo } from './HomePage.styles.less';

import PosterImage from './poster.jpg';

export default function HomePage() {
  const faviconSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/favicon.png';
  const backgroundVideoSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/background.mp4';

  const homeLinkStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
  };

  const contactStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  const Overlay = (
    <div className={overlay}>
      <a href="/" style={homeLinkStyle}>
        <img src={faviconSrc} alt="Home" />
      </a>
      <a href="mailto:bones@rebase.radio" rel="noreferer" target="_blank" style={contactStyle}>Contact</a>
    </div>
  );

  const VideoBackground = (
    <div className={fullwidthContainer}>
      <div className={wrapperFullwidthVideo}>
        <video loop muted autoPlay poster={PosterImage} className={fullwidthVideo}>
          <source src={backgroundVideoSrc} type="video/mp4" />
          <img src={PosterImage} alt="Your browser does not support the video element" />
        </video>
      </div>
    </div>
  );

  return (
    <div className={content}>
      {Overlay}
      {VideoBackground}
    </div>
  );
}

/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { overlay, content, nav, player, contactNav, homeNav, fullwidthContainer, fullwidthVideo, wrapperFullwidthVideo } from './HomePage.styles.less';

export default function HomePage() {
  const faviconSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/favicon.png';
  const backgroundVideoSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/background.mp4';
  const posterSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/poster.jpg';

  const Player = () => (
    <div className={player}>
      <p>Player controls</p>
    </div>
  );

  const Nav = () => (
    <div className={nav}>
      <a href="/" className={homeNav}>
        <img src={faviconSrc} alt="Home" />
      </a>
      <a href="mailto:bones@rebase.radio" target="_blank" rel="noopener noreferrer" className={contactNav}>Contact</a>
    </div>
  );

  const VideoBackground = (
    <div className={fullwidthContainer}>
      <div className={wrapperFullwidthVideo}>
        <video loop muted playsInline autoPlay poster={posterSrc} className={fullwidthVideo}>
          <source src={backgroundVideoSrc} type="video/mp4" />
          <img src={posterSrc} alt="Your browser does not support the video element" />
        </video>
      </div>
    </div>
  );

  return (
    <div className={content}>
      <div className={overlay}>
        <Nav />
        <Player />
      </div>
      {VideoBackground}
    </div>
  );
}

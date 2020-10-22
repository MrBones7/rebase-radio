/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import cx from 'classnames';
import { overlay, content, nav, playerControls, button, paused, contactNav, homeNav, fullwidthContainer, fullwidthVideo, wrapperFullwidthVideo } from './HomePage.styles.less';

const radioSrc = 'https://s4.radio.co/sb5955894a/listen';
const faviconSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/favicon.png';
const backgroundVideoSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/background.mp4';
const posterSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/poster.jpg';

const PlayerControls = ({ onPlay, onPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      onPause();
      setIsPlaying(false);
    } else {
      onPlay();
      setIsPlaying(true);
    }
  };

  return (
    <div className={playerControls}>
      <button onClick={togglePlay} className={isPlaying ? cx(button, paused) : cx(button)} />
    </div>
  );
};

const Nav = () => (
  <div className={nav}>
    <a href="#" className={homeNav}>
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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
  }

  render() {
    const playerEl = () => this.player && this.player.audioEl.current;
    const onPlay = () => playerEl() && playerEl().play();
    const onPause = () => playerEl() && playerEl().pause();

    return (
      <div className={content}>
        <div className={overlay}>
          <Nav />
          <PlayerControls onPause={onPause} onPlay={onPlay} />
          <ReactAudioPlayer
            src={radioSrc}
            controls
            preload
            style={{ display: 'none' }}
            ref={(element) => { this.player = element; }}
          />
        </div>
        {VideoBackground}
      </div>
    );
  }
}

export default HomePage;

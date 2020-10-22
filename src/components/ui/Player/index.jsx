import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import cx from 'classnames';
import { playerControls, button, paused } from './Player.styles.less';

const radioSrc = 'https://s4.radio.co/sb5955894a/listen';

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

  useEffect(() => {
    const eventType = 'keydown';
    const eventHandler = ({ key }) => key === ' ' && togglePlay();
    
    window.addEventListener(eventType, eventHandler);
    return () => window.removeEventListener(eventType, eventHandler);
  });

  return (
    <div className={playerControls}>
      <button onClick={togglePlay} className={isPlaying ? cx(button, paused) : cx(button)} />
    </div>
  );
};

PlayerControls.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
  }

  render() {
    const playerEl = () => this.player && this.player.audioEl.current;
    const onPlay = () => playerEl() && playerEl().play();
    const onPause = () => playerEl() && playerEl().pause();

    return (
      <div>
        <PlayerControls onPause={onPause} onPlay={onPlay} />
        <ReactAudioPlayer
          src={radioSrc}
          controls
          style={{ display: 'none' }}
          ref={(element) => { this.player = element; }}
        />
      </div>
    );
  }
}

export default Player;

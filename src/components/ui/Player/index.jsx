import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import cx from 'classnames';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { player, playerControls, playerInfo, togglePlay, slider, icon, iconHoverable, volumeSlider } from './Player.styles.less';

const radioSrc = 'https://s4.radio.co/sb5955894a/listen';

const StyledSlider = withStyles({
  root: {
    color: '#ddd',
    width: 100,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: '#eee',
    marginTop: -4,
    '&:focus, &:hover, &$active': {
      boxShadow: 'none',
    },
  },
  track: {
    height: 4,
    borderRadius: 4,
    margin: '0 30',
  },
  rail: {
    height: 4,
    borderRadius: 4,
    margin: '0 30',
  },
})(Slider);

const VolumeSlider = ({ onChange, initialVolume }) => {
  const [value, setValue] = React.useState(initialVolume * 100.0);

  const handleChange = (event, newValue) => {
    onChange(newValue / 100.0); // volume values must be between 0 and 1
    setValue(newValue);
  };

  return (
    <div className={volumeSlider}>
      <FontAwesomeIcon icon={faVolumeDown} className={icon} />
      <StyledSlider value={value} className={slider} onChange={handleChange} aria-labelledby="continuous-slider" />
      <FontAwesomeIcon icon={faVolumeUp} className={icon} />
    </div>
  );
};

const TogglePlayButton = ({ onClick, isPlaying }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={isPlaying ? faPause : faPlay}
    className={cx(togglePlay, icon, iconHoverable)}
  />
);

const PlayerControls = ({ canPlay, onPlay, onPause, setVolume, initialVolume = 0.6 }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!canPlay) return null;

  const togglePlayHandler = () => {
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
    const eventHandler = ({ key }) => key === ' ' && togglePlayHandler();

    window.addEventListener(eventType, eventHandler);
    return () => window.removeEventListener(eventType, eventHandler);
  });

  return (
    <div className={playerControls}>
      <TogglePlayButton onClick={togglePlayHandler} isPlaying={isPlaying} />
      <VolumeSlider onChange={setVolume} initialVolume={initialVolume} />
    </div>
  );
};

PlayerControls.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  initialVolume: PropTypes.number,
};

const PlayerInfo = () => {
  const message = 'Song | Artist';

  return (
    <div className={playerInfo}><p>{message}</p></div>
  );
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef;
    this.state = {};
  }

  playerEl() { this.playerRef && this.playerRef.audioEl.current; }

  onPlay() { this.playerEl() && this.playerEl().play(); }

  onPause() { this.playerEl() && this.playerEl().pause(); }

  setVolume(volume) {
    if (this.playerEl()) this.playerEl().volume = volume;
  }

  render() {
    const initialVolume = 0.6;

    return (
      <div className={player}>
        <PlayerInfo />
        <PlayerControls
          onPause={() => this.onPause()}
          onPlay={() => this.onPlay()}
          setVolume={(volume) => this.setVolume(volume)}
          canPlay
          initialVolume={initialVolume}
        />
        <ReactAudioPlayer
          src={radioSrc}
          controls
          volume={initialVolume}
          style={{ display: 'none' }}
          ref={(el) => { this.playerRef = el; }}
        />
      </div>
    );
  }
}

export default Player;

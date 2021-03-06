import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import cx from 'classnames';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { player, playerControls, playerInfo, trackLink, togglePlay, slider, volumeSlider } from './Player.styles.less';
import { hoverable, primaryColor } from '../../../styles.less';
import { title as siteTitle } from '../../../../settings';

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
      <FontAwesomeIcon icon={faVolumeDown} className={primaryColor} />
      <StyledSlider value={value} className={slider} onChange={handleChange} aria-labelledby="continuous-slider" />
      <FontAwesomeIcon icon={faVolumeUp} className={primaryColor} />
    </div>
  );
};

VolumeSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialVolume: PropTypes.number.isRequired,
};

const TogglePlayButton = ({ onClick, isPlaying }) => (
  <FontAwesomeIcon
    onClick={onClick}
    icon={isPlaying ? faPause : faPlay}
    className={cx(togglePlay, primaryColor, hoverable)}
  />
);

TogglePlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

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
  canPlay: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  initialVolume: PropTypes.number,
};

const TrackInfo = ({ title, artwork_url }) => {
  document.title = `${title} | ${siteTitle}`;

  const params = queryString.stringify({ search_query: title });
  const searchUrl = `https://www.youtube.com/results?${params}`;

  return (
    <div>
      <p><a className={trackLink} href={searchUrl} target="_blank" rel="noopener noreferrer">{title}</a></p>
    </div>
  );
};

TrackInfo.propTypes = {
  title: PropTypes.string.isRequired,
  artwork_url: PropTypes.string.isRequired,
};

const PlayerInfo = ({ statusUrl }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = (abortController) => {
      fetch(statusUrl, { signal: abortController.signal })
        .then(response => response.json())
        .then(({ current_track }) => setCurrentTrack(current_track));
    };

    fetchData(ac);
    const interval = setInterval(() => fetchData(ac), 5000);

    return () => {
      clearInterval(interval);
      ac.abort();
    };
  }, []);

  if (!currentTrack) return null;

  return (
    <div className={playerInfo}>
      <TrackInfo {...currentTrack} />
    </div>
  );
};

PlayerInfo.propTypes = {
  statusUrl: PropTypes.string.isRequired,
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef;
    this.state = {};
  }

  playerEl() {
    return this.playerRef && this.playerRef.audioEl.current;
  }

  render() {
    const { initialVolume, stationId } = this.props;

    const radioSrc = `https://s4.radio.co/${stationId}/listen`;
    const radioStatusUrl = `https://public.radio.co/stations/${stationId}/status`;

    const onPlay = () => { this.playerEl() && this.playerEl().play(); };

    const onPause = () => { this.playerEl() && this.playerEl().pause(); };

    const setVolume = volume => { if (this.playerEl()) this.playerEl().volume = volume; };

    return (
      <div className={player}>

        <PlayerInfo statusUrl={radioStatusUrl} />
        <PlayerControls
          onPause={onPause}
          onPlay={onPlay}
          setVolume={setVolume}
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

Player.propTypes = {
  initialVolume: PropTypes.number.isRequired,
  stationId: PropTypes.string.isRequired,
};

export default Player;

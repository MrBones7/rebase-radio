import React from 'react';
import PropTypes from 'prop-types';
import { fullwidthContainer, fullwidthVideo, wrapperFullwidthVideo } from './BackgroundVideo.styles.less';

const BackgroundVideo = ({ videoSrc, posterSrc }) => (
  <div className={fullwidthContainer}>
    <div className={wrapperFullwidthVideo}>
      <video
        loop
        muted
        disablePictureInPicture
        playsInline
        autoPlay
        poster={posterSrc}
        className={fullwidthVideo}
      >
        <source src={videoSrc} type="video/mp4" />
        <img src={posterSrc} alt="Your browser does not support the video element" />
      </video>
    </div>
  </div>
);

BackgroundVideo.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string.isRequired,
};

export default BackgroundVideo;

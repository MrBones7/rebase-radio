/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { overlay, content } from './HomePage.styles.less';
import Nav from '../../ui/Nav';
import Player from '../../ui/Player';
import BackgroundVideo from '../../ui/BackgroundVideo';

const backgroundVideoSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/background.mp4';
const posterSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/poster.jpg';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
  }

  render() {
    return (
      <div className={content}>
        <div className={overlay}>
          <Nav />
          <Player />
        </div>
        <BackgroundVideo videoSrc={backgroundVideoSrc} posterSrc={posterSrc} />
      </div>
    );
  }
}

export default HomePage;

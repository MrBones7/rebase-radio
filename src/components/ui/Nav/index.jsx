import React from 'react';
import { nav, contactNav, homeNav } from './Nav.styles.less';

const logoSrc = 'https://github.com/rbubs/rebase-radio/raw/master/static-assets/favicon.png';

const Nav = () => (
  <div className={nav}>
    <a href="#" className={homeNav}>
      <img src={logoSrc} alt="Home" />
    </a>
    <a href="mailto:bones@rebase.radio" target="_blank" rel="noopener noreferrer" className={contactNav}>Contact</a>
  </div>
);

export default Nav;

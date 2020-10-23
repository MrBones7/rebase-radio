import React from 'react';
import { nav, contactNav, homeNav } from './Nav.styles.less';

const Nav = () => {
  const rootUrl = window.location.href;

  return (
    <div className={nav}>
      <a href={rootUrl} className={homeNav}>rebase radio</a>
      <a href="mailto:bones@rebase.radio" target="_blank" rel="noopener noreferrer" className={contactNav}>contact</a>
    </div>
  );
};

export default Nav;

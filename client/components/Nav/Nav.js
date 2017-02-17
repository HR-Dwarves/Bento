import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css'

const Nav = React.createClass({

  render() {
    let mainNavPanelCSS = `${styles.mainNavPanel} is-clearfix`
    let pageTitleCSS = `${styles.pageTitle} has-text-centered`
    
    return (
      <div className={mainNavPanelCSS}>
        <Link to="/">
          <div className={pageTitleCSS}>dashboard</div>
        </Link>
      </div>
    )
  }
});

export default Nav;
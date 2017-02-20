import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css'
import Dashboard from './../Dashboard/Dashboard'

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {isModalOpen: false}
  }

  render() {
    let mainNavPanelCSS = `${styles.mainNavPanel} is-clearfix`
    let pageTitleCSS = `${styles.pageTitle} has-text-centered`

    return(
      <div className={mainNavPanelCSS}>
        <Link to="/">
          <div className={pageTitleCSS}>dashboard</div>
        </Link>
        <button className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>
      </div>
    )
  }
}

// const Nav = React.createClass({

//   render() {
//     let mainNavPanelCSS = `${styles.mainNavPanel} is-clearfix`
//     let pageTitleCSS = `${styles.pageTitle} has-text-centered`
    
//     return (
//       <div className={mainNavPanelCSS}>
//         <Link to="/">
//           <div className={pageTitleCSS}>dashboard</div>
//         </Link>
//         <button className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>
//       </div>
//     )
//   }
// });

export default Nav;

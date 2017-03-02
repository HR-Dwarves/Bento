import React from 'react';
import firebaseApp from '../../base';
import styles from './Focus.css';
import classnames from 'classnames';
import ListItem from './../ListItem/ListItem'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const database = firebaseApp.database();

class Focus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: '',
      clicked: false
    }
    this.handleDeleteFocus = this.handleDeleteFocus.bind(this)
  }

  handleInputFocus(event) {
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    let newText = event.target.value;
    this.setState({
      focus: event.target.value,
      clicked: false
    }); 
    db_ref.set(newText);
  }

  handleDeleteFocus() {
    this.setState({
      clicked: true
    });
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    this.setState({
      focus: ''
    });
    this.refs.test.value="";
  }

  componentDidMount(){
    let that = this;
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    db_ref.once('value').then(function(snapshot) {
      that.setState({
        focus: snapshot.val()
      });
    });
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    let focus = dashboard.modules[db_key];

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    let hasCurrentFocus = classnames(this.state.focus && this.state.focus.length !==0 ? `${styles.hasCurrentFocus}` : `${styles.focusContent}`);
    let animateStyle;
    if(this.state.clicked) {
      animateStyle = `animated slideOutRight ${styles.activeFocus}`
    } else {
      animateStyle = `${styles.activeFocus}`
    }
    let focusContentStyle = `${animateStyle}`;
    let iconStyle = `fa fa-square-o ${styles.centerBox}`

    return (
      <div className='focus'>
        <div className='card'>
          <header className='card-header'>
            <div className='card-header-title'>
              <p>Daily Intent</p>
            </div>
            <div className="card-header-icon">
              <span className="icon">
                <i onClick={this.props.handleCollapseFunction} className="fa fa-crosshairs" aria-hidden="true"></i>
              </span>
            </div>
          </header>
          <div className={collapsedStyle}>
            <div className='card-content'>
              <div className={styles.focusStyle}>
                <div>
                  <p>What is your intent for today?</p>
                </div>
              </div>
              <span className={hasCurrentFocus}>
                <input ref="test" className={styles.focusInput}
                        type='text'
                        maxLength='40'
                        defaultValue={focus.focusBody}
                        onBlur={this.handleInputFocus.bind(this)}
                      />
              </span>
              <div className="media-content">
                {this.state.focus && this.state.focus.length !== 0 ? 
                  <div className={styles.centerFocus}>
                    <span className={focusContentStyle}>
                      <span className={focusContentStyle}> {this.state.focus}</span>
                      <span><i onClick={this.handleDeleteFocus} className={iconStyle} aria-hidden="true"></i></span>
                    </span>
                  </div>: ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Focus;
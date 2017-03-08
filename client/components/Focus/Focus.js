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
      focus: [''],
      tempFocus: '',
      clicked: false
    }

    this.db_key = this.props.db_key;
    this.user = this.props.user.uid;

    this.handleDeleteFocus = this.handleDeleteFocus.bind(this);
    this.removeFocus = this.removeFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleDeleteFocus() {
    this.setState({
      clicked: true
    });
    this.removeFocus(); 
  }

  handleChange(e){
    this.setState({
      tempFocus: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let focusArray = [];

    focusArray.push(this.state.tempFocus);
    
    this.setState({
      focus: focusArray
    });

    let context = this;
    let newValue = this.state.focus[0];
    const target = 'focusBody';
    const db_ref = database.ref(`users/${context.user}/modules/${context.db_key}/${target}`);
    
    db_ref.set(this.state.tempFocus);
    this.setState({
      tempFocus: ''
    });
  }

  removeFocus() {
    let context = this;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${context.user}/modules/${context.db_key}/${target}`);
    
    this.setState({
      focus: [''],
      clicked: false
    });
  }

  componentDidMount(){
    let context = this;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${context.user}/modules/${context.db_key}/${target}`);
    const focusArray = [];
    
    db_ref.once('value').then(function(snapshot) {
      focusArray.push(snapshot.val());
      if(focusArray[0] === null) {
        focusArray[0] = '';
      }
      context.setState({
        focus: focusArray
      });
    });
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.db_key;
    let focus = dashboard.modules[db_key];

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    let hasCurrentFocus = classnames(this.state.focus[0] === '' ? `${styles.focusContent}` : `${styles.hasCurrentFocus}`);
    let cardStyle = classnames(`card ${styles.maxHeight}`);
    let iconStyle = `fa fa-square-o ${styles.centerBox}`

    let empty = this.state.focus;
    let goalStyle, styleTemp;

    if(empty[0] === '') {
      goalStyle = `${styles.noHeight}`;
    } else {
      goalStyle = 'media-content';
    }

    if(this.state.focus[0] !== '' || this.state.clicked) {
      var items = this.state.focus.map((item, i) => (
        <div className='animated' key={item}>
          <div className={styles.centerFocus}>
            <div onClick={this.handleDeleteFocus} className={styles.focusItem}>{item}</div>
          </div>
        </div>
      ));
    }
    return (
      <div className='focus'>
        <div className={cardStyle}>
          <header className='card-header'>
            <div className='card-header-title'>
              <p>Daily Intent</p>
            </div>
            <div className="card-header-icon">
              <span className="icon">
                <i className="fa fa-crosshairs" aria-hidden="true"></i>
              </span>
            </div>
          </header>
          <div className={collapsedStyle}>
            <div className='card-content'>
              <div className={styles.focusStyle}>
                <div>
                  <p>What is your intent for today?<br/><br/></p>
                </div>
              </div>
              <div className={styles.formDiv}>
                <form className={styles.formStyle} ref={(input) => this.listForm = input} onSubmit={this.handleSubmit} className={styles.formStyle}>
                  <input className={styles.inputStyle} type="text"  maxLength='30' value={this.state.tempFocus} onChange={this.handleChange} className={styles.inputStyle}></input>
                </form>
              </div>
                <ReactCSSTransitionGroup 
                  transitionName={{
                    enter: 'fadeIn',
                    leave: 'fadeOut'
                  }}>
                  {items}
                </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Focus;
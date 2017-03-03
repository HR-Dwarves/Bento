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
      clicked: false
    }
    this.handleDeleteFocus = this.handleDeleteFocus.bind(this);
    this.removeFocus = this.removeFocus.bind(this);
  }

  handleInputFocus(event) {
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    let newText = event.target.value;
    var focusArray = [];
    focusArray.push(event.target.value);
    this.setState({
      focus: focusArray,
      clicked: false
    }); 
    db_ref.set(newText);
    this.refs.test.value="";
  }

  handleDeleteFocus() {
    this.setState({
      clicked: true
    });
    this.removeFocus();
    
  }

  removeFocus() {
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    this.setState({
      focus: ['']
    });
    this.refs.test.value="";
  }

  componentDidMount(){
    let that = this;
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'focusBody';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    const focusArray = [];
    db_ref.once('value').then(function(snapshot) {
      focusArray.push(snapshot.val());
      if(focusArray[0] === null) {
        focusArray[0] = '';
      }
      that.setState({
        focus: focusArray
      });
    });
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    let focus = dashboard.modules[db_key];

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    let hasCurrentFocus = classnames(this.state.focus[0] === '' ? `${styles.focusContent}` : `${styles.hasCurrentFocus}`);
    let cardStyle = classnames(`card ${styles.maxHeight}`);
    let iconStyle = `fa fa-square-o ${styles.centerBox}`


    let completed = this.state.clicked;
    let styleTemp;
    if (completed) {
      console.log('COMPLETED');
      styleTemp = styles.complete;
    } else {
      styleTemp = ""
    }

    if(this.state.focus[0] !== '' || this.state.clicked) {
      var items = this.state.focus.map((item, i) => (
        <div className='animated' key={item}>
          <div className={styles.centerFocus}>
            <span onClick={this.handleDeleteFocus} className={styleTemp}>{item}</span>
          </div>
        </div>
      ));
    }
//
    return (
      <div className='focus'>
        <div className={cardStyle}>
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
                <ReactCSSTransitionGroup 
                  transitionName={{
                    enter: 'slideInLeft',
                    leave: 'slideOutRight'
                  }}
                  transitionLeaveTimeout={1000}>
                  {items}
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Focus;
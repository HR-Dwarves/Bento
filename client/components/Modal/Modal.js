import React from 'react';
import Promise from 'bluebird';
import firebaseApp from '../../base';
import styles from './Modal.css'

const database = firebaseApp.database();

class Modal extends React.Component {
  constructor(){
    super();
    this.queryDb = Promise.promisify(this.queryDb, {context: this});
    this.state = {
      list: []
    }
    this.addModule = this.addModule.bind(this);
    this.removeModule = this.removeModule.bind(this);
  }

  componentDidMount(){
    this.queryDb();
  }

  queryDb() {
    let user = this.props.user.uid
    let dbRef = database.ref(`users/${user}/modules`);
    var moduleArray = [];
    dbRef.once('value').then(function(snapshot) {
      for(var key in snapshot.val()) {
        moduleArray.push(snapshot.val()[key].type);
      }
    });
    Promise.all(moduleArray)
    .then((results) => {
      this.setState({
        list: moduleArray
      });
    });
  }

  addModule(e, module) {
    e.preventDefault();
    let user = this.props.user.uid;
    let dbRef = database.ref(`users/${user}/modules/`);
    if(module === 'Newsfeed') {
      var newsFeedObj = {
        type: 'Hacker News',
        top: true,
        new: false,
        newsSource: 'hacker-news',
        numberOfPosts: '5'
      };
      dbRef.push(newsFeedObj)
    } else {
      dbRef.push({
        type: module
      });
    }
    
    dbRef.orderByChild('type').equalTo('DefaultModule').once('child_added', (snapshot) => {
      snapshot.ref.remove();
    });
    this.state.list.push(module);
  }

  removeModule(e) {
    e.preventDefault();
    let user = this.props.user.uid
    let deleteValue = e.target.value;
    let dbRef = database.ref(`users/${user}/modules/`);
    dbRef.orderByChild('type').equalTo(deleteValue).once('child_added', (snapshot) => {
      snapshot.ref.remove();
    });
    this.state.list.splice(this.state.list.indexOf(deleteValue), 1);
  }

  render() {
    if(!this.props.isOpen) {
      return null;
    }

    let modalStyles = `${styles.modalStyles} modal is-active animated`;
    let modalCard = `${styles.modalCard} modal-card`;
    let modalCardBody = `${styles.modalCardBody} modal-card-body box`;
    let moduleEntry = `${styles.moduleEntry}`;
    let moduleTitle = `${styles.moduleTitle}`;
    let moduleButton = `${styles.moduleButton}`;
    let moduleIcon = `${styles.moduleIcon}`;

    return(
      <div className={modalStyles}>
        <div className={modalCard}>
          <section className={modalCardBody}>
            {this.props.modules.map((module, key) => 
              <div key={key} className={moduleEntry}>
                <span className={moduleTitle}>
                  {module}
                </span> 
                <span className={moduleButton}>
                  <i  onClick={(e) => this.addModule(e, module)}
                      className="fa fa-plus-circle" 
                      aria-hidden="true">
                  </i>
                </span>
              </div>)}
          </section>
        </div>
      </div>
    )
  }
}

export default Modal;

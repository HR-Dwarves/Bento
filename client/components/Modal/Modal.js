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

  addModule(e) {
    e.preventDefault();
    let user = this.props.user.uid;
    let dbRef = database.ref(`users/${user}/modules/`);
    if(e.target.value === 'Hacker News') {
      var newsFeedObj = {
        type: e.target.value,
        top: true,
        new: false
      };
      dbRef.push(newsFeedObj)
    } else {
      dbRef.push({
        type: e.target.value
      });
    }
    
    dbRef.orderByChild('type').equalTo('DefaultModule').once('child_added', (snapshot) => {
      snapshot.ref.remove();
    });
    this.state.list.push(e.target.value);
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
    let moduleHeader = `${styles.header} modal-card-head`
    let moduleStyles = `${styles.moduleName}`
    let deleteButton = `${styles.delete} icon fa fa-times-circle`;

    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className={moduleHeader}>
            <p className="modal-card-title">Modules</p>
            <i className={deleteButton} onClick={this.props.onClose} aria-hidden="true"></i>
          </header>
          <section className="modal-card-body">
            {this.props.modules.map((module, key) => <div key={key} className={moduleStyles}><span>{module}</span> 
              <span className={moduleStyles}><span><button value={module} onClick={this.addModule} className='button is-dark'>Add</button></span></span></div>)}
          </section>
        </div>
      </div>
    )
  }
}

export default Modal;

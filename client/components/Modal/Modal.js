import React from 'react';
import Promise from 'bluebird';
import database from '../../base';
import styles from './Modal.css'


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
    let dbRef = database.ref('/testUser/modules');
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
    let dbRef = database.ref('/testUser/modules/');
    dbRef.push({
      type: e.target.value
    });
    dbRef.orderByChild('type').equalTo('DefaultModule').once('child_added', (snapshot) => {
      snapshot.ref.remove();
    });
    this.state.list.push(e.target.value);
  }

  removeModule(e) {
    e.preventDefault();
    let deleteValue = e.target.value;
    let dbRef = database.ref('/testUser/modules/');
    dbRef.orderByChild('type').equalTo(deleteValue).once('child_added', (snapshot) => {
      snapshot.ref.remove();
    });
    this.state.list.splice(this.state.list.indexOf(deleteValue), 1);
  }

  render() {
    if(!this.props.isOpen) {
      return null;
    }
    let moduleStyles = `${styles.moduleName}`
    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modules</p>
            <button className="delete" onClick={this.props.onClose}></button>
          </header>
          <section className="modal-card-body">
            {this.props.modules.map((module, key) => <div className={moduleStyles}><span>{module}</span> 
              <span className={moduleStyles}><span><button value={module} onClick={this.addModule} className='button is-primary'>Add</button></span>
              {this.state.list.includes({module}.module) ? <span><button value={module} onClick={this.removeModule} className='button is-primary'>Delete</button></span> : ''} </span></div>)}
          </section>
        </div>
      </div>
    )
  }
}

export default Modal;
import React from 'react';


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
  }

  removeModule(e) {
    e.preventDefault();
    // console.log(e.target.value);
    // let dbRef = database.ref('/testUser/modules');
    // dbRef.remove({
    //   type: e.target.value
    // });
  }

  render() {
    if(!this.props.isOpen) {
      return null;
    }
    return(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modules</p>
            <button className="delete" onClick={this.props.onClose}></button>
          </header>
          <section className="modal-card-body">
            {this.props.modules.map((module, key) => <div>{module} 
              <button value={module} onClick={this.addModule} className='button is-primary'>Add</button>
              {this.state.list.includes({module}.module) ? <button value={module} onClick={this.removeModule} className='button is-primary'>Delete</button> : <p>not found</p>} </div>)}
            <br/>
            {this.state.list.map((module, key) => <div>{module}</div>)}
          </section>
        </div>
      </div>
    )
  }
}

export default Modal;
import React from 'react';
import database from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';

// Import dashboard components as you add them!
import List from '../List/List';
import NewsFeed from '../NewsFeed/NewsFeed';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.components = {
      'List': List,
      'NewsFeed': NewsFeed,
      'WeatherDetails': WeatherDetails
    }
    this.state = { isModalOpen: false}
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.getDatabase();
    database.ref('/testUser').on('value', () => {
      this.props.getDatabase();
    });
  }

  handleSettingsButton() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }

  render() {
    let dashboard = this.props.dashboard;
    let modules, elements;
    let modulesArray = [];

    //push each object key into the modules array
    modulesArray = Object.keys(this.components);

    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        elements = Object.keys(modules).map((moduleKey) => {
          var additionalProps = {
            key: moduleKey,
            db_key: moduleKey
          };
          var newProps = Object.assign({}, this.props, additionalProps)
          return React.createElement(this.components[modules[moduleKey].type], newProps)
        });
      }
    }

    let mainDashboardPanelCSS = `${styles.mainDashboardPanel} container is-fluid`

    return (
      <div className='section' height='100vh'>
        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={modulesArray}></Modal>
        <div className={mainDashboardPanelCSS}>
          <button onClick={this.handleSettingsButton} className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>
          <div className='columns'>
            {elements ? elements : []}
          </div>
        </div>
      </div>
    )
  }
}

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

export default Dashboard;


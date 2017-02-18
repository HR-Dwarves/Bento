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
    this.handleComponentAdd = this.handleComponentAdd.bind(this);
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.getDatabase();
    database.ref('/testUser').on('value', () => {
      this.props.getDatabase();
    });
  }

  handleComponentAdd(e) {
    e.preventDefault();
    let dbRef = database.ref('/testUser/modules/');
    dbRef.push({
      type: e.target.value
    });
  }

  handleSettingsButton() {
    console.log('in settings button');
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  closeModal() {
    console.log('inside closeModal');
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
          <span className="select">
            <select onChange={this.handleComponentAdd}>
              {modulesArray.map((item, key) => <option className='testing' value={item}>{item}</option>)}
            </select>
          </span>
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
  }

  componentDidMount(){
    console.log('inside didmount');
    this.queryDb();
  }

  queryDb() {
    console.log('inside queryDB');
    let dbRef = database.ref('/testUser/modules');
    var moduleArray = [];
    dbRef.once('value').then(function(snapshot) {
      for(var key in snapshot.val()) {
        console.log(snapshot.val()[key].type);
        moduleArray.push(snapshot.val()[key].type);
      }
    });
    Promise.all(moduleArray)
    .then((results) => {
      console.log('this is results ' + moduleArray);
      this.setState({
        list: moduleArray
      });
    });
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
            {this.props.modules.map((module, key) => <div>{module}</div>)}
            <br/>
            {this.state.list.map((module, key) => <div>{module}</div>)}
          </section>
        </div>
      </div>
    )
  }
}

export default Dashboard;


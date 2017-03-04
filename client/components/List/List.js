import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import firebaseApp from '../../base';
import ListItem from '../ListItem/ListItem';
import styles from './List.css';
import classnames from 'classnames';

const database = firebaseApp.database();

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      hideArchived: false
    }
    this.toggleArchive = this.toggleArchive.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    let formInput = this.formInput.value;
    let db_key = this.props.db_key;
    let user = this.props.user.uid;
    let time = Date.now();
    if (formInput) {
      let listObj = {
        text: formInput,
        completed: false,
        createdAt: time
      }
      this.props.addToList(listObj, db_key, user);
    }
    this.listForm.reset();
  }

  sortKeys(items) {
    return Object.keys(items).sort((a, b) => {
      if (items[a].completed !== items[b].completed) {
        if (items[a].completed) {
          return 1;
        } else if (items[b].completed) {
          return -1;
        }
      } else {
        if (items[a].createdAt > items[b].createdAt) {
          return -1;
        } else {
          return 1;
        }
      }
    })
  }

  handleDelete() {
    let db_key = this.props.db_key;
    let user = this.props.user.uid;
    // let user = this.props.user.uid;

    this.props.deleteModule(db_key, user);
  }

  toggleArchive() {
    let newState = !this.state.hideArchived;
    this.setState({
      hideArchived: newState
    })
  }

  toggleEdit() {
    let newState = !this.state.editing;
    this.setState({
      editing: newState
    })
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    if (dashboard) {
      var { username, email, firstName, lastName } = dashboard;
    }
    let list = dashboard.modules[db_key];
    let items, keys;
    if (list) {
        items = list.items;
        if (items) {
          keys = this.sortKeys(items);
        }
    }


    let cssClasses = `${styles.listCard} card`;
    let headerStyle = `${styles.header} card-header`;
    let footerStyle = `${styles.footer} card-footer`;
    let deleteButton = `${styles.delete} delete`;
    let listFormContainerStyles = `${styles.listFormContainer} card-content`;
    let formStyle = `${styles.listForm} control`;
    let listContent = `${styles.listContent}`
    let listButton = `${styles.listButton} button is-small is-light`;
    let listItems = `${styles.listItems} card-content`;
    let footerButtonStyles = `${styles.footerButtons} card-footer-item`;
    let animateCSSClass = 'animated';
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    // if (this.state) {
    //   let archiveStyle = this.state.hideArchived ? {"display": "none"} : {"display": ""};
    // }

    return (
        <div className={cssClasses}>
          <header className={headerStyle}>
            <p className="card-header-title">List</p>
            <span href="" className="card-header-icon">
              <span className="icon">
                <i className="fa fa-list-ul" aria-hidden="true"></i>
              </span>
            </span>
          </header>
          <div className={listContent}>
            <div className={listFormContainerStyles}>
              <form action="submit"
                    className={formStyle}
                    onSubmit={(e) => this.handleSubmit(e)}
                    ref={(input) => this.listForm = input}
                    >
                <input className="input is-small" type="text" ref={(input) => this.formInput = input}/>
                <button className={listButton} type="sumbit">Add</button>
              </form>
            </div>
            <div className={listItems}>
              <div className='media-content'>
                <ReactCSSTransitionGroup
                transitionName="module"
                transitionName={{enter: "fadeIn", 
                leave: "fadeOut",
                appear: "fadeIn"}}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                  {items ? keys.map((key, ind) => {
                    // let completed = items[key].completed;
                    // let archiveStyle;
                    // if (completed) {
                    //   archiveStyle = this.state.hideArchived ? {"display": "none"} : {"display": ""};
                    // } else {
                    //   archiveStyle = '';
                    // }

                    return (<ListItem {...this.props} 
                           key={key}
                           itemKey={key}
                           className={animateCSSClass}
                           hideArchived={this.state.hideArchived}
                           editing={this.state.editing}
                           listItem={items[key]
                           }/>)
                   }) : []}
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </div>
          <footer className={footerStyle}>
            <a value="archive" className={footerButtonStyles} onClick={this.toggleArchive}>Archive</a>
            <a value="edit" className={footerButtonStyles} onClick={this.toggleEdit}>Edit</a>
          </footer>
        </div>
    )
  }
};

export default List;
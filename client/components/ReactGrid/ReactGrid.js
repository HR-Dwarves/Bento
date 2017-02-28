import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import firebaseApp from '../../base';
const database = firebaseApp.database();

import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';

import styles from './ReactGrid.css'
var height = 2;
// import 

class ReactGrid extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      layouts: {
        lg: [{i: 'a', x: 0, y: 0, w: 1, h: height},
             {i: 'b', x: 1, y: 0, w: 1, h: height},
             {i: 'c', x: 2, y: 0, w: 1, h: height}],
        md: [{i: 'a', x: 0, y: 0, w: 1, h: height},
             {i: 'b', x: 1, y: 0, w: 1, h: height},
             {i: 'c', x: 0, y: 0, w: 1, h: height}],
        sm: [{i: 'a', x: 0, y: 0, w: 1, h: height},
             {i: 'b', x: 0, y: 0, w: 1, h: height},
             {i: 'c', x: 0, y: 0, w: 1, h: height}],
        xs: [{i: 'a', x: 0, y: 0, w: 1, h: height},
             {i: 'b', x: 0, y: 0, w: 1, h: height},
             {i: 'c', x: 0, y: 0, w: 1, h: height}],    
      }
    }
  }

  // Returns initial state from local storage
  getInitialState() {
    return {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
      } catch(e) {/*Ignore*/}
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem('rgl-8', JSON.stringify({
        [key]: value
      }));
    }
  }


  render() {
    let dashboard = this.props.dashboard;
    let modules, wrappers;

    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        wrappers = Object.keys(modules).map((moduleKey) => {
          var additionalProps = {
            key: moduleKey,
            db_key: moduleKey,
            type: modules[moduleKey].type
          }
          var newProps = Object.assign({}, this.props, additionalProps)
          return React.createElement(ModuleWrapper, newProps);
        });
      }
    }
    let defaultModule = <div className={componentStyle}><DefaultModule key={'abcd'}/></div>;

    // layout is an array of objects, see the demo for more complete usage
    var layoutStyle = `${styles.layout} layout`
    let componentStyle = `${styles.component} animated`;

    return (
      <ResponsiveReactGridLayout 
      {...this.props}
      ref='rrgl'
      className={styles.layout} 
      layouts={this.state.layouts} 
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      >
      {wrappers ? wrappers.map((wrapper, ind) => (
        <div className={componentStyle} key={ind}>
            {wrapper}
        </div>
        )) : defaultModule }
      </ResponsiveReactGridLayout>
    )
  }
};

ReactGrid.defaultProps = {
  className: "layout",
  cols: {lg: 3, md: 2, sm: 1, xs: 1, xxs: 1},
  rowHeight: 150,
  autoSize: true,
  isResizable: true,
  margin: [20, 20],
  verticalCompact: true,
  useCSSTransforms: true,
  onLayoutChange: function() {
    return;
  },
}

export default ReactGrid;
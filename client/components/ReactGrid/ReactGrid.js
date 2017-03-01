import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import firebaseApp from '../../base';
const database = firebaseApp.database();

import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';

import styles from './ReactGrid.css';
import gridStyles from '../../../node_modules/react-grid-layout/css/styles.css';
import resizableStyles from '../../../node_modules/react-resizable/css/styles.css';

var datagrid = {x: 0, y: 0, w: 3, h: 1};


class ReactGrid extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      layouts: {},
      currentBreakpoint: 'lg',
      mounted: false
    }
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.generateLayout = this.generateLayout.bind(this);
  }

  componentDidMount() {
     this.setState({mounted: true});
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

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onLayoutChange(layout, layouts) {
    this.setState({
      layout: layout
    })
  }

  generateLayout(key) {
    return {"x": key, "y": 0, "w": 3, "h": 3};
  }

  render() {
    let dashboard = this.props.dashboard;
    let modules, wrappers;

    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        wrappers = Object.keys(modules).map((moduleKey, ind, array) => {
          var additionalProps = {
            key: moduleKey,
            db_key: moduleKey,
            type: modules[moduleKey].type
          }
          var gridProps = {
            i: ind.toString(),
            x: ind * 2, 
            y: 0, 
            w: 3, 
            h: 3, 
            add: ind === (array.length - 1).toString()
          };
          var newProps = Object.assign({}, this.props, additionalProps, gridProps)
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
      className={layoutStyle} 
      // layouts={this.state.layouts} 
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      measureBeforeMount={false}
      onBreakpointChange={this.onBreakpointChange}
      useCSSTransforms={this.state.mounted}
      >
      {wrappers ? wrappers : defaultModule }
      </ResponsiveReactGridLayout>
    )
  }
};

ReactGrid.defaultProps = {
  className: "layout",
  cols: {lg: 12, md: 9, sm: 6, xs: 3, xxs: 3},
  autoSize: true,
  rowHeight: 100,
  isResizable: true,
  isDraggable: true,
  margin: [20, 20],
  verticalCompact: true,
  useCSSTransforms: true,
  onLayoutChange: function() {
    return;
  },
}

export default ReactGrid;

// {wrappers ? wrappers.map((wrapper, ind) => (
//   <div 
//   key={ind} 
//   data-grid={this.generateLayout(ind)}
//   >
//       {wrapper}
//   </div>
//   )) : defaultModule }
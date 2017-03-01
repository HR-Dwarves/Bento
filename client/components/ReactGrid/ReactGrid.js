import React from 'react';
import { Responsive, WidthProvider } from '../../../node_modules/react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import firebaseApp from '../../base';
const database = firebaseApp.database();

import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';

import styles from './ReactGrid.css';
import gridStyles from '../../../node_modules/react-grid-layout/css/styles.css';
import resizableStyles from '../../../node_modules/react-resizable/css/styles.css';

// var datagrid = {x: 0, y: 0, w: 3, h: 1};


class ReactGrid extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      layouts: {},
      breakpoint: 'lg',
      cols: 12,
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

  onBreakpointChange(breakpoint, columns) {
    this.setState({
      breakpoint: breakpoint,
      cols: columns
    });
  };

  onLayoutChange(layout, layouts) {
    this.setState({
      layout: layout
    });
  }

  generateLayout(key) {
    return {"x": key, "y": 0, "w": 3, "h": 3};
  }

  render() {
    let dashboard = this.props.dashboard;
    let modules, wrappers, gridProps, gridItems;

    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        wrappers = Object.keys(modules).map((moduleKey, ind, array) => {
          
          var additionalProps = {
            key: moduleKey,
            db_key: moduleKey,
            type: modules[moduleKey].type
          };

          
          var newProps = Object.assign({}, this.props, additionalProps);
          return React.createElement(ModuleWrapper, newProps);
        });

        gridItems = wrappers.map((wrapper, ind, arr) => {
          gridProps = {
            i: ind.toString(),
            x: ind * 3, 
            y: 0, 
            w: 3, 
            h: 3,
            minW: 3,
            add: ind === (arr.length - 1).toString()
          };

          return (<div key={ind} data-grid={gridProps}>{wrapper}</div>);
        })
      }
    }
    let defaultModule = <div className={componentStyle}><DefaultModule key={'abcd'}/></div>;

    // layout is an array of objects, see the demo for more complete usage
    var layoutStyle = `${styles.layout} layout ${gridStyles} ${resizableStyles}`;
    let componentStyle = `${styles.component}`;

    return (
      <ResponsiveReactGridLayout 
      {...this.props}
      ref='rrgl'
      className={layoutStyle} 
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      measureBeforeMount={false}
      onBreakpointChange={this.onBreakpointChange}
      useCSSTransforms={this.state.mounted}
      >
        {gridItems ? gridItems : defaultModule }
      </ResponsiveReactGridLayout>
    );
  }
}

ReactGrid.defaultProps = {
  className: "layout",
  cols: {lg: 12, md: 9, sm: 6, xs: 3, xxs: 3},
  autoSize: true,
  rowHeight: 100,
  minH: 3,
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
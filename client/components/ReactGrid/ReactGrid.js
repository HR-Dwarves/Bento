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

const originalLayouts = getFromLS('layouts') || {};

class ReactGrid extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      breakpoint: 'lg',
      cols: 12,
      mounted: false
    }
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.generateLayout = this.generateLayout.bind(this);
  }

  // componentWillMount() {
  //   let user = this.props.user.uid
  //   getFromLS()
  // }

  componentDidMount() {
    this.setState({mounted: true});
    console.log("OG LAYOUTZ", originalLayouts);
  }
  // Returns initial state from local storage
  // getInitialState() {
  //   return {
  //     layouts: JSON.parse(JSON.stringify(originalLayouts))
  //   };
  // }

  

  onBreakpointChange(breakpoint, columns) {
    this.setState({
      breakpoint: breakpoint,
      cols: columns
    });
  };

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({layouts});
    console.log('LAYOUT CHANGE SAVED');
    // this.props.onLayoutChange(layout, layouts);
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
        let moduleKeys = Object.keys(modules);
        wrappers = moduleKeys.map((moduleKey, ind, array) => {
          
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
            minH: 2,
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
      layouts={this.state.layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      measureBeforeMount={false}
      onLayoutChange={this.onLayoutChange}
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

function getFromLS(key, user) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('dashboard')) || {};
    } catch(e) {
    /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('dashboard', JSON.stringify({
      [key]: value
    }));
  }
}

// {wrappers ? wrappers.map((wrapper, ind) => (
//   <div 
//   key={ind} 
//   data-grid={this.generateLayout(ind)}
//   >
//       {wrapper}
//   </div>
//   )) : defaultModule }
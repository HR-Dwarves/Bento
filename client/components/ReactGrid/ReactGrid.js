import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, WidthProvider } from '../../../node_modules/react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import firebaseApp from '../../base';
const database = firebaseApp.database();

import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';

import styles from './ReactGrid.css';
import defaultGridProps from './defaultGridProps';

const originalLayouts = getFromLS('layouts') || {};
const breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};

class ReactGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      layouts: props.layouts,
      mounted: false,
      cols: undefined,
      breakpoint: undefined
    }
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  componentDidMount() {
    this.setState({mounted: true});
    var node = ReactDOM.findDOMNode(this);
    var width = node.offsetWidth;
    var breakpoint;

    if (width > breakpoints['md']) {
      breakpoint = 'lg'
    } else if (width > breakpoints['sm']) {
      breakpoint = 'md'
    } else if (width > breakpoints['xs']) {
      breakpoint = 'sm'
    } else if (width > breakpoints['xxs']) {
      breakpoint = 'xs'
    } else {
      breakpoint = 'xxs'
    }

    var cols = this.props.cols[breakpoint];
    var LSlayouts = getFromLS('layouts');
    var layouts = Object.assign({xxs:[], xs: [], sm: [], md: [], lg:[]}, LSlayouts);
    this.setState({breakpoint, layouts, cols});

  }

  onBreakpointChange(breakpoint, columns) {
    this.setState({
      breakpoint: breakpoint,
      cols: columns
    });
  };

  onLayoutChange(layout, layouts) {
    let user = this.props.user.uid;
    let currentBreakpoint = this.state.breakpoint;
    let newLayouts = Object.assign({}, layouts);

    this.props.updateLayouts(user, newLayouts);

  }

  render() {
    let dashboard = this.props.dashboard;
    let modules, wrappers, defaultItemProps, gridItems;
    let layouts = this.state.layouts;
    if (layouts) {
      let layout = this.state.layouts[this.state.breakpoint];
      // console.log(layout);
      if (dashboard && layout) {
        modules = dashboard.modules
        if (modules) {
          let moduleKeys = Object.keys(modules);
          let numberOfModules = moduleKeys.length;

          //Create wrappers for each module
          wrappers = moduleKeys.map((moduleKey, ind, array) => {
            let moduleType = modules[moduleKey].type;

            var additionalProps = { key: moduleKey, db_key: moduleKey, type: moduleType};
            var newProps = Object.assign({}, this.props, additionalProps);
            defaultItemProps = { i: moduleKeys[ind], w: 3, h: 2, x: numberOfModules * 2 % (this.state.cols || 12), y: Infinity, minW: 3, minH: 2 };
            let defaultModuleProps = defaultGridProps[moduleType];
            let currentBreakpoint = this.state.breakpoint;
            let currentLayout = this.state.layouts[currentBreakpoint];
            let currentKey = moduleKeys[ind];

            // Filter saved grid props from current layout bu item ID
            let currentGridItem = currentLayout.filter((item) => {
              return item.i === currentKey;
            });

            let newGridProps = Object.assign({}, defaultItemProps, currentGridItem[0], defaultModuleProps);
            return <div key={currentKey} data-grid={newGridProps}>{React.createElement(ModuleWrapper, newProps)}</div>;
          });

        }
      }
    }
    let defaultModule = <div className={componentStyle}><DefaultModule {...this.props} key={'abcd'}/></div>;

    // layout is an array of objects, see the demo for more complete usage
    var layoutStyle = `${styles.layout} layout`;
    let componentStyle = `${styles.component}`;

    if (this.state.breakpoint) {
      return (
        <ResponsiveReactGridLayout 
        {...this.props}
        ref='rrgl'
        className={layoutStyle} 
        breakpoints={breakpoints}
        measureBeforeMount={false}
        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        useCSSTransforms={this.state.mounted}
        >
          {wrappers ? wrappers : defaultModule }
        </ResponsiveReactGridLayout>
      );
    } else {
      return <div></div>;
    }
  }
}

ReactGrid.defaultProps = {
  cols: {lg: 12, md: 9, sm: 6, xs: 3, xxs: 1},
  rowHeight: 100,
  margin: [20, 20],
}

export default ReactGrid;

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch(e) {
      console.error(e);
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('rgl-8', JSON.stringify({
      [key]: value
    }));
  }
}

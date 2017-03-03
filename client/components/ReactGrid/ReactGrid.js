import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, WidthProvider } from '../../../node_modules/react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import firebaseApp from '../../base';
const database = firebaseApp.database();

import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';

import styles from './ReactGrid.css';
// import gridStyles from '../../../node_modules/react-grid-layout/css/styles.css';
// import resizableStyles from '../../../node_modules/react-resizable/css/styles.css';

const originalLayouts = getFromLS('layouts') || {};
const breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};

class ReactGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // layouts: JSON.parse(JSON.stringify(originalLayouts)),
      // layouts: props.layouts,
      mounted: false,
      cols: undefined,
      breakpoint: undefined
    }
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  // componentWillMount() {
  //   console.log('Component Will Mount');

  // }

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
    var layouts = getFromLS('layouts');
    console.log(node.offsetWidth);
    this.setState({breakpoint, layouts, cols});

    // console.log("OG LAYOUTZ", originalLayouts);
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
    // let newLayouts = Object.assign({}, layouts, {currentBreakpoint: layout})
    let newLayouts = Object.assign({}, layouts);
    // newLayouts[currentBreakpoint] = layout;

    this.props.updateLayouts(user, newLayouts);
    // saveToLS('layouts', newLayouts);

    // this.setState({newLayouts});
    // console.log('LAYOUT CHANGE SAVED');
    // console.log(layouts);
    // console.log(layout); // THIS
    // console.log(this.state.layouts[this.state.breakpoint]);
    // this.props.onLayoutChange(layout, layouts);
  }

  render() {
    let dashboard = this.props.dashboard;
    let modules, wrappers, defaultGridProps, gridItems;
    // console.log(this.state.layouts);

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
          defaultGridProps = {
            w: 3, 
            h: 2,
            x: ind * 2, 
            y: 0, 
            minW: 3,
            minH: 2
          };
          let currentBreakpoint = this.state.breakpoint;
          let currentLayout = this.state.layouts[currentBreakpoint];
          // console.log('LAYOUTS', this.state.layouts);
          // console.log('CURRENT BREAKPOINT', currentBreakpoint);
          // console.log('CURRENT LAYOUT', currentLayout);
          let currentKey = moduleKeys[ind];
          // // console.log('LAYOUTSZZZZ', this.state.layouts);
          let currentGridItem = currentLayout.filter((item) => {
            return item.i === currentKey;
          });
          // console.log(`CURRENT GRID ITEM: `, currentGridItem[0]);
          let newGridProps = Object.assign({}, defaultGridProps, currentGridItem[0]);
          // console.log('NEW GRID PROPS', newGridProps);
          return <div key={currentKey} data-grid={newGridProps}>{wrapper}</div>;
        })
      }
    }
    let defaultModule = <div className={componentStyle}><DefaultModule key={'abcd'}/></div>;

    // layout is an array of objects, see the demo for more complete usage
    var layoutStyle = `${styles.layout} layout`;
    let componentStyle = `${styles.component}`;
    if (this.state.breakpoint) {
      return (
        <ResponsiveReactGridLayout 
        {...this.props}
        ref='rrgl'
        className={layoutStyle} 
        // layouts={this.state.layouts}
        breakpoints={breakpoints}
        measureBeforeMount={false}
        onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        useCSSTransforms={this.state.mounted}
        >
          {gridItems ? gridItems : defaultModule }
        </ResponsiveReactGridLayout>
      );
    } else {
      return defaultModule;
    }
  }
}

ReactGrid.defaultProps = {
  cols: {lg: 12, md: 9, sm: 6, xs: 3, xxs: 3},
  //className: 'layout',
  rowHeight: 100,
  margin: [20, 20],
  //useCSSTransforms: true,
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

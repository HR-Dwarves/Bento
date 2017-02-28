import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import styles from './ReactGrid.css'
// import 

class ReactGrid extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      layouts: {
        lg: [{i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 1, y: 0, w: 1, h: 2},
            {i: 'c', x: 2, y: 0, w: 1, h: 2}],
        md: [{i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 1, y: 0, w: 1, h: 2},
            {i: 'c', x: 0, y: 0, w: 1, h: 2}],
        sm: [{i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 0, y: 0, w: 1, h: 2},
            {i: 'c', x: 0, y: 0, w: 1, h: 2}],
        xs: [{i: 'a', x: 0, y: 0, w: 1, h: 2},
            {i: 'b', x: 0, y: 0, w: 1, h: 2},
            {i: 'c', x: 0, y: 0, w: 1, h: 2}],    
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
    // layout is an array of objects, see the demo for more complete usage
    var layoutStyle = `${styles.layout} layout`

    var layouts = {
      lg: this.createLayout(),
      md: this.createLayout(),
      sm: this.createLayout(),
      xs: this.createLayout(),
      xxs: this.createLayout(),
    }
    return (
      <ResponsiveReactGridLayout 
      {...this.props}
      ref='rrgl'
      className={styles.layout} 
      layouts={this.state.layouts} 
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      >
        <div className={styles.gridItem} key={'a'}>a</div>
        <div className={styles.gridItem} key={'b'}>b</div>
        <div className={styles.gridItem} key={'c'}>c</div>
      </ResponsiveReactGridLayout>
    )
  }
};

ReactGrid.defaultProps = {
  className: "layout",
  cols: {lg: 3, md: 2, sm: 1, xs: 1, xxs: 1},
  rowHeight: 150,
  onLayoutChange: function() {},
}

export default ReactGrid;
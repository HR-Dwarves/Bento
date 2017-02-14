import React from 'react';

const Test1 = React.createClass({
  render() {
    return (
      <div>
        {this.props.testInfo['1'].text}
      </div>
    )
  }
});

export default Test1;
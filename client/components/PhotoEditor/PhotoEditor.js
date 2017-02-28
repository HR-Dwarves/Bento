import React from 'react'

class PhotoEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    return (
      <img src={this.props.src} />
    )
  }
}

export default PhotoEditor
import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';


const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 320,    // We will scale the photo width to this
      height: 0,     // This will be computed based on the input stream

      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.

      streaming: false,

      // The various HTML elements we need to configure or control. These
      // will be set by the startup() function.

      video: null,
      canvas: null,
      photo: null,
      startbutton: null,
      track: null
    };
  }

  componentDidMount() {
    // adjust this. Will fail when there are more than one instance of this module
    // or make sure you can only have one (bc of #ids)

    // define all the elements we'll be using
    this.setState({
      video: document.getElementById('video'),
      canvas: document.getElementById('canvas'),
      photo: document.getElementById('photo'),
      startbutton: document.getElementById('startbutton')
    });
  }

  componentWillUnmount() {
    this.stopStream();
  }

  startupStream() {

    var context = this;

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {

        context.setState({
          track: stream.getTracks()[0]
        });

        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          context.state.video.src = vendorURL.createObjectURL(stream);
        }
        context.state.video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    this.state.video.addEventListener('canplay', function(ev){
      if (!context.streaming) {
        context.setState({
          height: context.state.video.videoHeight / (context.state.video.videoWidth/context.state.width)
        })

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
        if (isNaN(context.state.height)) {
          constext.setState({
            height: context.state.width / (4/3)
          })
        }

        context.state.video.setAttribute('width', context.state.width);
        context.state.video.setAttribute('height', context.state.height);
        context.state.canvas.setAttribute('width', context.state.width);
        context.state.canvas.setAttribute('height', context.state.height);

        context.setState({
          streaming: true
        })
      }
    }, false);

    this.state.startbutton.addEventListener('click', function(ev){
      context.takepicture();
      ev.preventDefault();
    }, false);

    this.clearphoto();
  }

  stopStream() {
    this.state.track.stop();
  }

  clearphoto() {
    var context = this.state.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);

    var data = this.state.canvas.toDataURL('image/png');
    this.state.photo.setAttribute('src', data);
  }

  takepicture() {
    var context = canvas.getContext('2d');
    if (this.state.width && this.state.height) {
      this.state.canvas.width = this.state.width;
      this.state.canvas.height = this.state.height;
      context.drawImage(this.state.video, 0, 0, this.state.width, this.state.height);

      var data = canvas.toDataURL('image/png');
      this.state.photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    return (
      <div className='card'>
        <header className="card-header">
          <p className="card-header-title">One Photo Every Day Challenge</p>
          <div className="card-header-icon">
            <span className="icon"><i onClick={this.props.handleCollapseFunction} className='fa fa-camera' aria-hidden='true'></i></span>
          </div>
        </header>

        <div className={collapsedStyle}>
          <div className="card-content">
            <div className="media-content">

              <a className="button" onClick={this.startupStream.bind(this)}>Take a photo</a>
              <a className="button">Import a photo</a>
              <a className="button" onClick={this.stopStream.bind(this)}>Stop video stream</a>

              <div className="camera">
                <video id="video">Video stream not available.</video>
                <button id="startbutton">Take photo</button>
              </div>

              <canvas id="canvas">
              </canvas>

              <div className="output">
                <img id="photo" alt="The screen capture will appear in this box." />
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PhotoPrompt;
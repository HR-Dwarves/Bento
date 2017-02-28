import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';

import PhotoEditor from '../PhotoEditor/PhotoEditor';


const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,    // We will scale the photo width to this
      height: null,     // This will be computed based on the input stream

      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.
      streaming: false,

      track: null,
      // The various HTML elements we need to configure or control. These
      // will be set by the startup() function.

      // video: null,
      // canvas: null,
      // photo: null,
      cameraStreamSrc: null,
      cameraIsActive: false,
      photoSrc: null
    };
  }

  componentDidMount() {
    // adjust this. Will fail when there are more than one instance of this module
    // or make sure you can only have one (bc of #ids)

    // define all the elements we'll be using
    // this.setState({
    //   // video: document.getElementById('video'),
    //   // canvas: document.getElementById('canvas'),
    //   photo: document.getElementById('photo'),
    // });
  }

  componentWillUnmount() {
    // make sure the video feed is off
    this.stopStream();
  }

  startupStream() {

    this.setState({cameraIsActive: true});

    var context = this;

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      .then(function(stream) {
        /* use the stream */
        context.setState({
          track: stream.getTracks()[0]
        });

        console.log('stream', stream)
        console.log('track', context.state.track);

        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          context.setState({
            cameraStreamSrc: vendorURL.createObjectURL(stream)
          })
        }
        context.cameraStream.play()
      }).catch(function(err) {
        /* handle the error */
        console.log("An error occured! " + err);
      });


    // deprecated way
    // navigator.getMedia = ( navigator.getUserMedia ||
    //                        navigator.webkitGetUserMedia ||
    //                        navigator.mozGetUserMedia ||
    //                        navigator.msGetUserMedia);

    // navigator.getMedia(
    //   {
    //     video: true,
    //     audio: false
    //   },
    //   function(stream) {

    //     context.setState({
    //       track: stream.getTracks()[0]
    //     });

    //     if (navigator.mozGetUserMedia) {
    //       video.mozSrcObject = stream;
    //     } else {
    //       var vendorURL = window.URL || window.webkitURL;
    //       context.state.video.src = vendorURL.createObjectURL(stream);
    //     }
    //     context.state.video.play();
    //   },
    //   function(err) {
    //     console.log("An error occured! " + err);
    //   }
    // );


    this.cameraStream.addEventListener('canplay', function(ev){
    // this.state.video.addEventListener('canplay', function(ev){
      if (!context.streaming) {
        // set height of video based on width
        // context.setState({
        //   height: context.cameraStream.videoHeight / (context.cameraStream.videoWidth/context.state.width)
        // })

        // // Firefox currently has a bug where the height can't be read from
        // // the video, so we will make assumptions if this happens.
        // if (isNaN(context.state.height)) {
        //   constext.setState({
        //     height: context.state.width / (4/3)
        //   })
        // }
        context.setState({
          width: context.cameraStream.offsetWidth,
          height: context.cameraStream.offsetHeight,
          streaming: true
        })
      }
    }, false);

    // this.state.startbutton.addEventListener('click', function(ev){
    //   context.takepicture();
    //   ev.preventDefault();
    // }, false);

    this.clearphoto();
  }

  // takePhoto(ev) {
  //   console.log('takePhoto')
  //   this.takepicture();
  //   ev.preventDefault();
  // }

  stopStream() {
    this.state.track.stop();
    this.setState({cameraIsActive: false})
  }

  clearphoto() {
    var context = this.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var data = this.canvas.toDataURL('image/png');
    this.setState({photoSrc: data})
    // this.state.photo.setAttribute('src', data);
  }

  takePicture() {
    var context = this.canvas.getContext('2d');

    // console.log('this.cameraStream', this.cameraStream);
    // console.log('this.cameraStream.offsetWidth', this.cameraStream.offsetWidth);
    // console.log('this.canvas', this.canvas);


    if (this.state.width && this.state.height) {
      this.canvas.width = this.state.width;
      this.canvas.height = this.state.height;
      context.drawImage(this.cameraStream, 0, 0, this.state.width, this.state.height);

      var data = this.canvas.toDataURL('image/png');
      this.setState({photoSrc: data});
      // this.state.photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    let photoButton = `${styles.photoButton} icon`;
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
                <video
                  ref={vid => this.cameraStream = vid}
                  src={this.state.cameraStreamSrc}>Video stream not available.
                </video>

                {this.state.cameraIsActive &&
                  <div className={photoButton} ><i
                    onClick={this.takePicture.bind(this)}
                    className='fa fa-bullseye'
                    aria-hidden='true'>
                  </i></div>
                }
              </div>

              <canvas ref={can => this.canvas = can}></canvas>

              <div className="output">
                {/*<img id="photo" alt="The screen capture will appear in this box." />*/}
                <PhotoEditor src={this.state.photoSrc}/>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PhotoPrompt;
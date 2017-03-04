// Action creators are grouped in the App.js component
// Add new action creators to the 'bundledActionCreators' using
// Object.assign so new action creators will be bound and passed down


import ActionTypes from './actionTypes';
import firebaseApp from '../base';
import firebase from 'firebase';
const database = firebaseApp.database();
const storage = firebaseApp.storage();

export function getPhotosForPhotoPrompt(db_key, user = 'testUser') {
  return dispatch => {

    dispatch(getPhotosForPhotoPromptRequestedAction());

    return database.ref(`users/${user}/modules/${db_key}`).once('value', snap => {
      const photos = snap.val();

      // if there's a streak
      // check if latest photo posted was today or yesterday
      // streak (from what I had in PhotoPrompt.js

      // console.log('streak', this.props.dashboard.modules[this.props.db_key].streak)

      // let photos = this.props.dashboard.modules[this.props.db_key].photos;
      // let allPhotoDates = Object.keys(photos)

      // allPhotoDates = allPhotoDates.map((key, index, array) => {
      //   return photos[key].date;
      // })

      // if not delete the streak

      dispatch(getPhotosForPhotoPromptFulfilledAction(photos))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getPhotosForPhotoPromptRejectedAction());
    });
  }
}

function getPhotosForPhotoPromptRequestedAction() {
  return {
    type: ActionTypes.GetPhotosForPhotoPromptRequested
  };
}

function getPhotosForPhotoPromptRejectedAction() {
  return {
    type: ActionTypes.GetPhotosForPhotoPromptRejected
  }
}

function getPhotosForPhotoPromptFulfilledAction(photos) {
  return {
    type: ActionTypes.GetPhotosForPhotoPromptFulfilled,
    photos
  };
}


export function addPhotoForPhotoPrompt(photoFile, db_key, user = 'testUser', cb) {
  return dispatch => {
    dispatch(addPhotoForPhotoPromptRequestedAction());

    // ping to see if a streak exists

    // if not, make one as 1


    // actually handle this in get photos. get photos represents a login
    // if so, check if the latest photo posted was yesterday

    // if it was, add one to the streak

    // if it wasn't

    // Create a root reference
    // upload file
    var storageRef = storage.ref();

    var path = '/photoPrompt/images/';
    var finalStorageRef = storageRef.child(path + photoFile.name);

    finalStorageRef.put(photoFile)
      .then(function(snapshot) {
        var imagePath = snapshot.a.downloadURLs[0];
        return imagePath;
      })
      .then(function(imagePath) {
        // add info to database
        const photoPromptRef = database.ref(`users/${user}/modules/${db_key}/photos/`);
        var newPhotoRef = photoPromptRef.push();
        newPhotoRef.set({
          name: photoFile.name,
          downloadUrl: imagePath,
          date: firebase.database.ServerValue.TIMESTAMP
        })
      })
      .then((snap) => {
        cb();
        dispatch(addPhotoForPhotoPromptFulfilledAction());
      })
      .catch((error) => {
        console.log(error);
        dispatch(addPhotoForPhotoPromptRejectedAction());
      });
  }
}

function addPhotoForPhotoPromptRequestedAction() {
  return {
    type: ActionTypes.AddPhotoForPhotoPromptRequested
  };
}

function addPhotoForPhotoPromptRejectedAction() {
  return {
    type: ActionTypes.AddPhotoForPhotoPromptRejected
  }
}

function addPhotoForPhotoPromptFulfilledAction(newPhotos) {
  return {
    type: ActionTypes.AddPhotoForPhotoPromptFulfilled,
    newPhotos
  };
}


export function deletePhotoFromPhotoPrompt(itemKey, db_key, user = 'testUser', cb) {
  return dispatch => {
    dispatch(deletePhotoFromPhotoPromptRequestedAction());
    const itemRef = database.ref(`users/${user}/modules/${db_key}/photos/${itemKey}`);

    // get the image file name
    itemRef.once('value')
    .then(snap => {
      var photoName = snap.val().name
      var storageRef = storage.ref();

      var path = '/photoPrompt/images/';
      var finalStorageRef = storageRef.child(path + photoName);
      finalStorageRef.delete();
    })
    .then(itemRef.remove())
    .then(() => {
      cb();
      dispatch(deletePhotoFromPhotoPromptFulfilledAction());
    })
    .catch((error) => {
      console.log(error);
      dispatch(deletePhotoFromPhotoPromptRejectedAction());
    });
  }
}

function deletePhotoFromPhotoPromptRequestedAction() {
  return {
    type: ActionTypes.DeletePhotoFromPhotoPromptRequested
  };
}

function deletePhotoFromPhotoPromptRejectedAction() {
  return {
    type: ActionTypes.DeletePhotoFromPhotoPromptRejected
  }
}

function deletePhotoFromPhotoPromptFulfilledAction(newItem) {
  return {
    type: ActionTypes.DeletePhotoFromPhotoPromptFulfilled
  };
}
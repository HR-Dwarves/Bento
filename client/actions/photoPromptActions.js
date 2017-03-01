// Action creators are grouped in the App.js component
// Add new action creators to the 'bundledActionCreators' using
// Object.assign so new action creators will be bound and passed down


import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();
const storage = firebaseApp.storage();

// export function getClocks(db_key, user = 'testUser') {
//   return dispatch => {

//     dispatch(getClocksRequestedAction());

//     return database.ref(`users/${user}/modules/${db_key}`).once('value', snap => {
//       const clocks = snap.val();
//       dispatch(getClocksFulfilledAction(clocks))
//     })
//     .catch((error) => {
//       console.log(error);
//       dispatch(getClocksRejectedAction());
//     });
//   }
// }

// function getClocksRequestedAction() {
//   return {
//     type: ActionTypes.GetClocksRequested
//   };
// }

// function getClocksRejectedAction() {
//   return {
//     type: ActionTypes.GetClocksRejected
//   }
// }

// function getClocksFulfilledAction(clocks) {
//   return {
//     type: ActionTypes.GetClocksFulfilled,
//     clocks
//   };
// }


export function addPhotoForPhotoPrompt(photoFile, db_key, user = 'testUser') {
  return dispatch => {
    dispatch(addPhotoForPhotoPromptRequestedAction());

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
          downloadUrl: imagePath
        })
      })
      .then((snap) => {
        dispatch(addPhotoForPhotoPromptFulfilledAction())
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

function addPhotoForPhotoPromptFulfilledAction() {
  return {
    type: ActionTypes.AddPhotoForPhotoPromptFulfilled
  };
}
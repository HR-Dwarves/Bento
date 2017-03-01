import actionTypes from '../actions/actionTypes';

// Every function should have three steps: requested, rejected and fulfilled
function photoprompt(state = {}, action = '') {
  switch(action.type) {
    case actionTypes.GetPhotosForPhotoPromptRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.GetPhotosForPhotoPromptRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting photos.',
      });
    }
    case actionTypes.GetPhotosForPhotoPromptFulfilled: {
      const { photos } = action.photos;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got photos.',
        photos
      });
      return newState;
    }
    case actionTypes.AddPhotoForPhotoPromptRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.AddPhotoForPhotoPromptRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in adding Photo.',
      });
    }
    case actionTypes.AddPhotoForPhotoPromptFulfilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'New Photo added.',
      });
      return newState;
    }
    default:
      return state;
  }
}

export default photoprompt;
const actionTypes = {

  GetDBRequested: 'GET_DB_REQUESTED',
  GetDBRejected: 'GET_DB_REJECTED',
  GetDBFulfilled: 'GET_DB_FULFILLED',

  SetDB: 'SET_DATABASE',

  DeleteModuleRequested: 'DELETE_MODULE_REQUESTED',
  DeleteModuleRejected: 'DELETE_MODULE_REJECTED',
  DeleteModuleFulfilled: 'DELETE_MODULE_FULFILLED',

  AuthenticateUser: 'AUTHENTICATE_USER',
  LogoutUser: 'LOGOUT_USER',

  AddNotification: 'ADD_NOTIFICATION',
  RemoveNotification: 'REMOVE_NOTIFICATION',

  GetListRequested: 'GET_LIST_REQUESTED',
  GetListRejected: 'GET_LIST_REJECTED',
  GetListFulfilled: 'GET_LIST_FULFILLED',

  AddToListRequested: 'ADD_TO_LIST_REQUESTED',
  AddToListRejected: 'ADD_TO_LIST_REJECTED',
  AddToListFulfilled: 'ADD_TO_LIST_FULFILLED',

  DeleteFromListRequested: 'DELETE_FROM_LIST_REQUESTED',
  DeleteFromListRejected: 'DELETE_FROM_LIST_REJECTED',
  DeleteFromListFulfilled: 'DELETE_FROM_LIST_FULFILLED',

  ToggleListStatusRequested: 'TOGGLE_LIST_STATUS_REQUESTED',
  ToggleListStatusRejected: 'TOGGLE_LIST_STATUS_REJECTED',
  ToggleListStatusFulfilled: 'TOGGLE_LIST_STATUS_FULFILLED',

  ChangeListNameRequested: 'CHANGE_LIST_STATUS_REQUESTED',
  ChangeListNameRejected: 'CHANGE_LIST_STATUS_REJECTED',
  ChangeListNameFulfilled: 'CHANGE_LIST_STATUS_FULFILLED',

  GetLayouts: 'GET_LAYOUTS',
  UpdateLayouts: 'UPDATE_LAYOUTS',

  GetHnRequested: 'GET_HN_REQUESTED',
  GetHnRejected: 'GET_HN_REJECTED',
  GetHnFulfilled: 'GET_HN_FULFILLED',

  UpdateStickyTextRequested: 'UPDATE_STICKY_TEXT_REQUESTED',
  UpdateStickyTextRejected: 'UPDATE_STICKY_TEXT_REJECTED',
  UpdateStickytextFulFilled: 'UPDATE_STICKY_TEXT_FULFILLED',

  GetClocksRequested: 'GET_CLOCKS_REQUESTED',
  GetClocksRejected: 'GET_CLOCKS_REJECTED',
  GetClocksFulfilled: 'GET_CLOCKS_FULFILLED',

  AddToClocksRequested: 'ADD_TO_CLOCKS_REQUESTED',
  AddToClocksRejected: 'ADD_TO_CLOCKS_REJECTED',
  AddToClocksFulfilled: 'ADD_TO_CLOCKS_FULFILLED',

  AddPhotoForPhotoPromptRequested: 'ADD_PHOTO_FOR_PHOTO_PROMPT_REQUESTED',
  AddPhotoForPhotoPromptRejected: 'ADD_PHOTO_FOR_PHOTO_PROMPT_REJECTED',
  AddPhotoForPhotoPromptFulfilled: 'ADD_PHOTO_FOR_PHOTO_PROMPT_FULFILLED',

  GetPhotosForPhotoPromptRequested: 'GET_PHOTOS_FOR_PHOTO_PROMPT_REQUESTED',
  GetPhotosForPhotoPromptRejected: 'GET_PHOTOS_FOR_PHOTO_PROMPT_REJECTED',
  GetPhotosForPhotoPromptFulfilled: 'GET_PHOTOS_FOR_PHOTO_PROMPT_FULFILLED',

  DeletePhotoFromPhotoPromptRequested: 'DELETE_PHOTO_FROM_PHOTO_PROMPT_REQUESTED',
  DeletePhotoFromPhotoPromptRejected: 'DELETE_PHOTO_FROM_PHOTO_PROMPT_REJECTED',
  DeletePhotoFromPhotoPromptFulfilled: 'DELETE_PHOTO_FROM_PHOTO_PROMPT_FULFILLED',

  ChangeBackgroundRequested: 'CHANGE_BACKGROUND_REQUESTED',
  ChangeBackgroundRejected: 'CHANGE_BACKGROUND_REJECTED',
  ChangeBackgroundFulfilled: 'CHANGE_BACKGROUND_FULFILLED',
};

export default actionTypes;
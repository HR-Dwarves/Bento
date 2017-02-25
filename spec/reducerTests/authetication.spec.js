// import * as ActionTypes from '../client/actions/actionTypes';
import AuthenticationReducer from '../../client/reducers/authentication';

describe('Authentication Reducer', () => {
  it('should be a function', () => {
    expect(typeof AuthenticationReducer).toBe('function');
  });

  it('should return an empty object on default', () => {
    expect(AuthenticationReducer()).toEqual({});
  });
});

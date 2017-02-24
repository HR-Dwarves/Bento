import * as ActionTypes from '../client/actions/actionTypes';
import * as AuthenticationActions from '../client/actions/authenticationActions';

describe('Authentication Actions', () => {
  describe('authenticateUser', () => {
    it('should be a function', () => {
      expect(typeof AuthenticationActions.authenticateUser).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof AuthenticationActions.authenticateUser()).toBe('function');
    });
  });

  describe('logoutUser', () => {
    it('should be a function', () => {
      expect(typeof AuthenticationActions.authenticateUser).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof AuthenticationActions.authenticateUser()).toBe('function');
    });
  });
});
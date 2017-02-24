// import * as ActionTypes from '../client/actions/actionTypes';
import * as Actions from '../client/actions/actionCreators';

describe('Action Creators', () => {
  describe('getDatabase', () => {
    it('should be a function', () => {
      expect(typeof Actions.getDatabase).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof Actions.getDatabase()).toBe('function');
    });
  });

  describe('setDatabase', () => {
    it('should be a function', () => {
      expect(typeof Actions.setDatabase).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof Actions.setDatabase()).toBe('function');
    });
  });

  describe('deleteModule', () => {
    it('should be a function', () => {
      expect(typeof Actions.deleteModule).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof Actions.deleteModule()).toBe('function');
    });
  });

  describe('getGeolocation', () => {
    it('should be a function', () => {
      expect(typeof Actions.getGeolocation).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof Actions.getGeolocation()).toBe('function');
    });
  });
});
import * as ActionTypes from '../client/actions/actionTypes';
import * as ClocksActions from '../client/actions/clocksActions';

describe('Clocks Actions', () => {
  describe('getClocks', () => {
    it('should be a function', () => {
      expect(typeof ClocksActions.getClocks).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ClocksActions.getClocks()).toBe('function');
    });
  });

  describe('addToClocks', () => {
    it('should be a function', () => {
      expect(typeof ClocksActions.addToClocks).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ClocksActions.addToClocks()).toBe('function');
    });
  });
});
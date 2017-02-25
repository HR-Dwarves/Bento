// import * as ActionTypes from '../client/actions/actionTypes';
import * as ListActions from '../../client/actions/listActions';

describe('List Actions', () => {
  describe('getList', () => {
    it('should be a function', () => {
      expect(typeof ListActions.getList).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ListActions.getList()).toBe('function');
    });
  });

  describe('addToList', () => {
    it('should be a function', () => {
      expect(typeof ListActions.addToList).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ListActions.addToList()).toBe('function');
    });
  });

  describe('deleteFromList', () => {
    it('should be a function', () => {
      expect(typeof ListActions.deleteFromList).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ListActions.deleteFromList()).toBe('function');
    });
  });

  describe('toggleListItemStatus', () => {
    it('should be a function', () => {
      expect(typeof ListActions.toggleListItemStatus).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ListActions.toggleListItemStatus()).toBe('function');
    });
  });

  describe('updateListOrder', () => {
    it('should be a function', () => {
      expect(typeof ListActions.updateListOrder).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof ListActions.updateListOrder()).toBe('function');
    });
  });
});
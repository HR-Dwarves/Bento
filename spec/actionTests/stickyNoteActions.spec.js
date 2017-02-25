// import * as ActionTypes from '../../client/actions/actionTypes';
import StickyNoteActions from '../../client/actions/stickyNoteActions';

describe('Sticky Note Actions', () => {
  describe('updateText', () => {
    it('should be a function', () => {
      var test = typeof StickyNoteActions;
      expect(test).toBe('function');
    });
  });
});
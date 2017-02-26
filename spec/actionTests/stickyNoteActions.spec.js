// import * as ActionTypes from '../../client/actions/actionTypes';
import * as StickyNoteActions from '../../client/actions/stickyNoteActions';

describe('Sticky Note Actions', () => {
  describe('updateText', () => {
    it('should be a function', () => {
      var test = typeof StickyNoteActions.updateText;
      expect(test).toBe('function');
    });
  });
});
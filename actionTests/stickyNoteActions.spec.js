import * as ActionTypes from '../client/actions/actionTypes';
import * as StickyNoteActions from '../client/actions/stickyNoteActions';

describe('Sticky Note Actions', () => {
  describe('updateText', () => {
    it('should be a function', () => {
      expect(typeof StickyNoteActions.updateText).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof StickyNoteActions.updateText()).toBe('function');
    });
  });
});
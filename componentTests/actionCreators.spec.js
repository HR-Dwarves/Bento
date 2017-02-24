// import * as ActionTypes from '../client/actions/actionTypes';
import * as Actions from '../client/actions/actionCreators';

describe('Action Creators', () => {
  it('should be a function', () => {
    expect(typeof Actions.getDatabase).toBe('function');
  });
});
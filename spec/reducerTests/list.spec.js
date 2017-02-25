import * as ActionTypes from '../client/actions/actionTypes';
import ListReducer from '../client/reducers/list';

describe('List Reducer', () => {
  it('should be a function', () => {
    expect(typeof ListReducer).toBe('function');
  });

  it('should return an empty object on default', () => {
    expect(ListReducer()).toEqual({});
  });
});
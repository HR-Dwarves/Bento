// import * as ActionTypes from '../client/actions/actionTypes';
import ClockReducer from '../../client/reducers/clocks';

describe('Clocks Reducer', () => {
  it('should be a function', () => {
    expect(typeof ClockReducer).toBe('function');
  });

  it('should return an empty object on default', () => {
    expect(ClockReducer()).toEqual({});
  });
});
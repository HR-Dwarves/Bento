// import * as ActionTypes from '../client/actions/actionTypes';
import DashboardReducer from '../../client/reducers/dashboard';

describe('Dashboard Reducer', () => {
  it('should be a function', () => {
    expect(typeof DashboardReducer).toBe('function');
  });

  it('should return an empty object on default', () => {
    expect(DashboardReducer()).toEqual({});
  });
});
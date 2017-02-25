import * as ActionTypes from '../client/actions/actionTypes';
import NewsFeedReducer from '../client/reducers/newsfeed';

describe('newsfeed Reducer', () => {
  it('should be a function', () => {
    expect(typeof NewsFeedReducer).toBe('function');
  });

  it('should return an empty object on default', () => {
    expect(NewsFeedReducer()).toEqual({});
  });
});
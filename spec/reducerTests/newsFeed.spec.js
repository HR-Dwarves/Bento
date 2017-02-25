// import ActionTypes from '../../client/actions/actionTypes';
import NewsFeedReducer from '../../client/reducers/newsfeed';

describe('newsfeed Reducer', () => {
  it('should be a function', () => {
    var test = typeof NewsFeedReducer;
    expect(test).toBe('function');
  });

  it('should return an empty object on default', () => {
    var test1 = NewsFeedReducer();
    expect(test1).toEqual({});
  });
});
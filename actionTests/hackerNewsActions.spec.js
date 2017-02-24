import * as ActionTypes from '../client/actions/actionTypes';
import * as HackerNewsActions from '../client/actions/hackerNewsActions';

describe('Hacker News Actions', () => {
  describe('getHnPosts', () => {
    it('should be a function', () => {
      expect(typeof HackerNewsActions.getHnPosts).toBe('function');
    });

    it('should return a function when passed in posts', () => {
      expect(typeof HackerNewsActions.getHnPosts([1])).toBe('function');
    });
  });

  describe('requestHnPosts', () => {
    it('should be a function', () => {
      expect(typeof HackerNewsActions.requestHnPosts).toBe('function');
    });

    it('should return a function', () => {
      expect(typeof HackerNewsActions.requestHnPosts()).toBe('function');
    });
  });
});
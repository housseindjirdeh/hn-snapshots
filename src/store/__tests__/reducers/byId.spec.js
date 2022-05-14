import Immutable from 'immutable';

import * as ACTIONS from 'store/actionTypes';
import byId from 'store/byId';

describe('byId reducer', () => {
  it('should return the initial state', () => {
    expect(byId(undefined, {})).toEqual(Immutable.Map());
  });

  it('should handle HACKER_NEWS_FETCH_SUCCESS', () => {
    const secondState = Immutable.Map(new Map([
      [
        1, Immutable.Map({
          id: 1,
          title: 'Interview with Mr. Money Mustache',
        }),
      ]]));

    expect(byId(Immutable.Map(), {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
      payload: {
        data: [
          {
            id: 1,
            title: 'Interview with Mr. Money Mustache',
          },
        ],
      },
    })).toEqual(secondState);

    expect(byId(secondState, {
      type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
      payload: {
        data: [
          {
            id: 2,
            title: 'React with TypeScript',
          },
        ],
      },
    })).toEqual(secondState.set(
      2,
      Immutable.Map({
        id: 2,
        title: 'React with TypeScript',
      }),
    ));
  });
});

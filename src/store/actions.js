import * as ACTIONS from './actionTypes';
import flattenComment from './flattenComments';

export function hackerCommentsFetchRequest(id) {
  return {
    type: ACTIONS.HACKER_COMMENTS_FETCH_REQUEST,
    payload: id,
  };
}

export function hackerCommentsFetchSuccess(data) {
  return {
    type: ACTIONS.HACKER_COMMENTS_FETCH_SUCCESS,
    payload: data,
  };
}

export function hackerCommentsFetchFailure(error) {
  return {
    type: ACTIONS.HACKER_COMMENTS_FETCH_FAILURE,
    payload: error,
    error: true,
  };
}

export function fetchHackerComments(id) {
  return function thunk(dispatch) {
    dispatch(hackerCommentsFetchRequest(id));

    return fetch(`https://api.hnpwa.com/v0/item/${id}.json`)
      .then(response =>
        response.json().then(data =>
          dispatch(hackerCommentsFetchSuccess({
            ...data,
            timeAgo: data.time_ago,
            comments: flattenComment(data).map(v => ({ ...v, timeAgo: v.time_ago })),
          }))))
      .catch(error => dispatch(hackerCommentsFetchFailure(error)));
  };
}

export function hackerNewsFetchRequest(type, page) {
  return {
    type: ACTIONS.HACKER_NEWS_FETCH_REQUEST,
    payload: {
      type,
      page,
    },
  };
}

export function hackerNewsFetchSuccess(type, page, data) {
  return {
    type: ACTIONS.HACKER_NEWS_FETCH_SUCCESS,
    payload: {
      type,
      page,
      data,
    },
  };
}

export function hackerNewsFetchFailure(error) {
  return {
    type: ACTIONS.HACKER_NEWS_FETCH_FAILURE,
    payload: error,
    error: true,
  };
}

export function fetchHackerNews(type, page = 1) {
  return function thunk(dispatch) {
    dispatch(hackerNewsFetchRequest(type, page));

    return fetch(`https://api.hnpwa.com/v0/${type}/${page}.json`)
      .then(response =>
        response.json()
          .then(data => data.map((v) => {
            const { comments_count: commentsCount, time_ago: timeAgo, ...rest } = v;
            return { ...rest, commentsCount, timeAgo };
          }))
          .then(data => dispatch(hackerNewsFetchSuccess(type, page, data))))
      .catch(error => dispatch(hackerNewsFetchFailure(error)));
  };
}

export function hackerUserFetchRequest(id) {
  return {
    type: ACTIONS.HACKER_USER_FETCH_REQUEST,
    payload: id,
  };
}

export function hackerUserFetchSuccess(data) {
  return {
    type: ACTIONS.HACKER_USER_FETCH_SUCCESS,
    payload: data,
  };
}

export function hackerUserFetchFailure(error) {
  return {
    type: ACTIONS.HACKER_USER_FETCH_FAILURE,
    payload: error,
    error: true,
  };
}

export function fetchHackerUser(id) {
  return function thunk(dispatch) {
    dispatch(hackerUserFetchRequest(id));

    return fetch(`https://api.hnpwa.com/v0/user/${id}.json`)
      .then(response => response.json().then(data => dispatch(hackerUserFetchSuccess(data))))
      .catch(error => dispatch(hackerUserFetchFailure(error)));
  };
}

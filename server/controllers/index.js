import express from "express";
import fetch from "node-fetch";
import serverRenderer from "../middleware/renderer";
import configureStore from "../../src/store/configureStore";
// import { setAsyncMessage } from "../../src/store/rootReducer";
import {
  hackerNewsFetchSuccess,
  hackerNewsFetchFailure,
} from "../../src/store/actions";

const router = express.Router();
const path = require("path");

const fetchPage = (page, type = "news") => {
  return fetch(`https://api.hnpwa.com/v0/${type}/${page}.json`, {
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });
};

const fetchHackerNews = () => (dispatch) => {
  return (
    Promise.all([
      fetchPage(1),
      fetchPage(2),
      fetchPage(3),
      fetchPage(4),
      fetchPage(5),
      fetchPage(6),
      fetchPage(7),
      fetchPage(8),
      fetchPage(9),
      fetchPage(10),
    ])
      .then((data) => {
        return data.flat().map((v) => {
          const {
            comments_count: commentsCount,
            time_ago: timeAgo,
            ...rest
          } = v;
          return { ...rest, commentsCount, timeAgo };
        });
      })
      .then((data) => dispatch(hackerNewsFetchSuccess('news', 1, data)))
      .catch((error) => dispatch(hackerNewsFetchFailure(error)))
  );
};

const actionIndex = (req, res, next) => {
  const store = configureStore();

  store.dispatch(fetchHackerNews()).then(() => {
    serverRenderer(store)(req, res, next);
  });
};

// root (/) should always serve our server rendered page
router.use("^/$", actionIndex);

// other static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, "..", "..", "build"), {
    maxAge: "30d",
  })
);

// any other route should be handled by react-router, so serve the index page
router.use("*", actionIndex);

export default router;

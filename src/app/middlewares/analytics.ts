import { Middleware } from "@reduxjs/toolkit";

export const analytics: Middleware = (store) => (next) => (action) => {
  if (!action.meta || !action.meta.analytics) {
    return next(action);
  }

  const { category } = action.meta.analytics;

  store.dispatch({
    type: "A-EVENT",
    payload: { category, action: action.type },
  });

  return next(action);
};

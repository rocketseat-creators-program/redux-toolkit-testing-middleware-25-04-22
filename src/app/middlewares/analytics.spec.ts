import { AnyAction } from "@reduxjs/toolkit";
import { analytics } from "./analytics";

// create mock sotre
const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };

  const next = jest.fn();

  const invoke = (action: AnyAction) => analytics(store)(next)(action);

  return { store, next, invoke };
};

describe("Analytics middleware", () => {
  it("should call next action", () => {
    const { next, invoke } = create();
    const action = { type: "test" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("should call next if action meta does not have analytics", () => {
    const { next, invoke } = create();
    const action = { type: "test", meta: {} };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("should dispatch an analytics event when action meta has analytics", () => {
    const { store, invoke } = create();
    const action = {
      type: "TEST",
      meta: { analytics: { category: "TEST" } },
    };
    invoke(action);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "A-EVENT",
      payload: { category: "TEST", action: "TEST" },
    });
  });
});

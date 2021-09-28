import authReducer from "../../reducers/auth.reducer";
import { LOG_IN, REQUEST_LOG_IN, LOG_OUT } from "../../types";

let authState = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
  err: null,
  isLoading: false,
};

let testToken = {
  token: "abcde",
  userName: "test",
};

test("should return the initial state", () => {
  expect(authReducer(authState, {})).toEqual(
    {
      isLoggedIn: false,
      token: null,
      userInfo: null,
      err: null,
      isLoading: false,
    },
  );
});

test("isLoggin in", () => {
  expect(
    authReducer(authState, {
      type: REQUEST_LOG_IN,
    })
  ).toEqual({
    ...authState,
    isLoading: true,
    err: null,
  });
});

test("Log in", () => {
  expect(
    authReducer(authState, {
      type: LOG_IN,
      payload: { token: testToken.token, userInfo: testToken.userName },
    })
  ).toEqual({
    ...authState,
    isLoading: false,
    token: testToken.token,
    userInfo: testToken.userName,
    isLoggedIn: true,
    err: null,
  });
});

test("Log Out", () => {
  expect(
    authReducer(authState, {
      type: LOG_OUT,
    })
  ).toEqual(authState);
});

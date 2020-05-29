import { put } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import { authActions } from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(authActions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expiresIn * 1000);
  yield put(authActions.logout());
}

export function* authUserSaga(action) {
  yield put(authActions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiUN8z_2yykxq_lU4OjAyXiE36HheLn1Q";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiUN8z_2yykxq_lU4OjAyXiE36HheLn1Q";
  }
  try {
    const response = yield axios.post(url, authData);
    yield localStorage.setItem("token", response.data.idToken);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    yield put(authActions.authSuccess(response));
    yield put(authActions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(authActions.autoFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(authActions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(
        authActions.authSuccess({ data: { idToken: token, localId: userId } })
      );

      yield put(
        authActions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(authActions.logout());
    }
  }
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Firebase } from "../../api/firebase";

import type { Dispatch, RootState } from "../../app/store";

type AuthState = {
  authMode: string | null;
  user: {
    role: string | null;
    id: string | null;
    token: string | null;
    refreshToken: string | null;
  };
  isAuthenticated: boolean;
  hasError: boolean;
  isLoading: boolean;
};
const initialState: AuthState = {
  authMode: "signUp", // signUp or signInWithPassword
  user: { role: null, id: null, token: null, refreshToken: null },
  isAuthenticated: false,
  hasError: false,
  isLoading: false,
};

type UserPayload = {
  userId: string | null;
  token: string | null;
  refreshToken: string | null;
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStarted(state) {
      state.isLoading = true;
      state.hasError = false;
    },

    authFailed(state) {
      state.isLoading = false;
      state.hasError = true;
    },

    authSucceed(state, action: PayloadAction<UserPayload>) {
      state.isLoading = false;
      state.hasError = false;

      state.user = {
        role: "user",
        id: action.payload.userId,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
      state.isAuthenticated = !!state.user.token;
    },

    authModeSwitched: (state) => {
      state.hasError = false;
      state.authMode =
        state.authMode === "signUp" ? "signInWithPassword" : "signUp";
    },

    guestLoggedIn: (state) => {
      state.hasError = false;
      state.user = {
        role: "guest",
        id: "guest",
        token: null,
        refreshToken: null,
      };
      state.isAuthenticated = !!state.user.token;
    },

    loggedOut: (state) => {
      state.user = {
        role: null,
        id: null,
        token: null,
        refreshToken: null,
      };
      state.isAuthenticated = !!state.user.token;
    },
  },
});

export const {
  authStarted,
  authSucceed,
  authFailed,
  authModeSwitched,
  guestLoggedIn,
  loggedOut,
} = authSlice.actions;
export default authSlice.reducer;

type Auth = {
  authMode: string | null;
  email: string;
  password: string;
};
export const tryAuth = async (user: Auth) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(authStarted());
    try {
      const { userId, token, expiresIn, refreshToken } = await Firebase.auth(
        user
      );
      dispatch(authSucceed({ userId, token, refreshToken }));
      storeUserToLocalStorage({ userId, token, expiresIn, refreshToken });
      dispatch(setRefreshTokenTimer(expiresIn, refreshToken)); // 1時間
    } catch (err: any) {
      dispatch(authFailed());
    }
  };
};

type Local = {
  userId: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
};
const storeUserToLocalStorage = (user: Local) => {
  const { userId, token, refreshToken, expiresIn } = user;
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
  const expirationDate: any = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("tokenExpiration", expirationDate);
  localStorage.setItem("refreshToken", refreshToken);
};

// トークン更新
// firebase生成の認証用トークンは有効期限があるため、タイマーを設定し自動的に更新
export let refreshTokenTimer: ReturnType<typeof setTimeout>;
const setRefreshTokenTimer = (
  expiresIn: number,
  currentRefreshToken: string
) => {
  return async (dispatch: Dispatch) => {
    refreshTokenTimer = setTimeout(async () => {
      try {
        const { userId, token, refreshToken } = await dispatch(
          await handleRefreshToken(currentRefreshToken)
        );
        dispatch(authSucceed({ userId, token, refreshToken }));
      } catch (error: any) {
        console.log(error.message);
      }
    }, +expiresIn * 1000);
  };
};

const handleRefreshToken = async (currentRefreshToken: string) => {
  return async (dispatch: Dispatch) => {
    clearTimeout(refreshTokenTimer);

    const responseData = await Firebase.refreshToken(currentRefreshToken);
    const userId = responseData.user_id;
    const token = responseData.id_token;
    const expiresIn: number = responseData.expires_in;
    const refreshToken = responseData.refresh_token;

    storeUserToLocalStorage({ userId, token, refreshToken, expiresIn });
    dispatch(setRefreshTokenTimer(expiresIn, refreshToken)); // 1時間
    return { loginMode: "user", userId, token, refreshToken };
  };
};

// オートログイン
export const tryAutoLogin = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const expiresIn = +tokenExpiration! - new Date().getTime();
  const refreshToken = localStorage.getItem("refreshToken")!;

  return async (dispatch: Dispatch, getState: () => RootState) => {
    if (tokenExpiration && expiresIn < 0) {
      dispatch(await handleRefreshToken(refreshToken));
    } else if (token && token !== "guest") {
      await dispatch(authSucceed({ userId, token, refreshToken }));
      dispatch(setRefreshTokenTimer(expiresIn, refreshToken));
    }
  };
};

// ログアウト
export const logout = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("theme");
    clearTimeout(refreshTokenTimer);

    dispatch(loggedOut());
  };
};

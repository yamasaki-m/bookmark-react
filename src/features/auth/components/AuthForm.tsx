import React, { useEffect, useCallback, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import type { InputTypes } from "../../../types/index";
import type { RootState } from "../../../app/store";
import {
  authModeSwitched,
  tryAuth,
  tryAutoLogin,
  guestLoggedIn,
} from "../authSlice";
import useInput from "../../../common/hooks/use-input";
import { MemoizedButton } from "../../../common/components/UI/Button";
import Card from "../../../common/components/UI/Card";
import { MemoizedInputField } from "../../../common/components/UI/InputField";

type AuthFormProps = {
  className?: string;
  email: InputTypes;
  password: InputTypes;
  isFormValid: boolean;
  authMode: string | null;
  hasAuthError: boolean;
  emailRef: any;

  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSwitchAuthModeClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onGuestLoginClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({
  className,
  email,
  password,
  isFormValid,
  authMode,
  hasAuthError,
  emailRef,

  onFormSubmit,
  onSwitchAuthModeClick,
  onGuestLoginClick,
}) => {
  return (
    <Card cardType="narrow" className={className}>
      <h2 className="title">{authMode === "signUp" ? "Sign Up" : "Log In"}</h2>

      <form className="form" onSubmit={(event) => onFormSubmit(event)}>
        <div className="form__body">
          <MemoizedInputField
            value={email.value}
            isValid={email.isValid}
            isValidating={email.isValidating}
            message={email.message}
            id="email"
            type="email"
            required
            label="メールアドレス"
            ref={emailRef}
            onChange={email.handleChange}
            onBlur={email.handleBlur}
          />
          <MemoizedInputField
            value={password.value}
            isValid={password.isValid}
            isValidating={password.isValidating}
            message={password.message}
            id="password"
            type="password"
            required
            label="パスワード(6文字以上)"
            onChange={password.handleChange}
            onBlur={password.handleBlur}
          />
        </div>

        {hasAuthError && (
          <p className="form__message invalid">
            認証に失敗しました。メールアドレスとパスワードをご確認ください
          </p>
        )}

        <div className="form__actions">
          <MemoizedButton
            className="primary rounded-sm"
            type="submit"
            disabled={!isFormValid}
          >
            {authMode === "signUp" ? "アカウント登録" : "ログイン"}
          </MemoizedButton>

          {authMode === "signUp" && (
            <MemoizedButton
              className="primary rounded-sm"
              type="button"
              onClick={onGuestLoginClick}
            >
              ゲストログイン
            </MemoizedButton>
          )}
        </div>
      </form>

      <p className="instead">
        <span className="instead__text">
          {authMode === "signUp"
            ? "アカウントをお持ちの方は"
            : "アカウントをお持ちでない方は"}
        </span>

        <span className="instead__switch" onClick={onSwitchAuthModeClick}>
          {authMode === "signUp" ? "ログイン" : "アカウント登録"}
        </span>
      </p>
    </Card>
  );
};

const StyledAuthForm = styled(AuthForm)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38rem;
  margin: 0 auto;

  > .title {
    margin-bottom: var(--space-28);
    font-family: "Segoe UI", "Arial", sans-serif;
    font-size: var(--text-xl);
    font-weight: 400;
    letter-spacing: 1px;
    text-align: center;
  }

  .form {
    width: 100%;

    &__body {
      display: flex;
      flex-direction: column;
      row-gap: var(--space-16);
      margin-bottom: var(--space-10);
    }

    &__actions {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: var(--space-10);
      margin-bottom: var(--space-10);
    }
  }

  .instead {
    text-align: center;

    &__text {
      font-size: var(--text-sm);
      letter-spacing: -1.1px;
    }

    &__switch {
      margin-left: var(--space-4);
      color: #148578;
      font-size: var(--text-sm);
      font-weight: bold;
      letter-spacing: -1.1px;
      cursor: pointer;
    }
  }
`;

const AuthFormContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const email = useInput("email");
  const password = useInput("password");
  const isFormValid = email.isValid && password.isValid;
  const authMode = useSelector((state: RootState) => state.auth.authMode);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const hasAuthError = useSelector((state: RootState) => state.auth.hasError);
  const emailRef = useRef<any>(null);

  useEffect(() => {
    const autoLogin = async () => {
      dispatch(await tryAutoLogin());
    };
    autoLogin();
    emailRef.current.focus();
  }, [dispatch]);

  useEffect(() => {
    isAuthenticated && history.push("/home");
  }, [history, isAuthenticated]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    dispatch(
      await tryAuth({
        authMode,
        email: email.value,
        password: password.value,
      })
    );
  };

  const handleGuestLoginClick = useCallback(async () => {
    dispatch(await guestLoggedIn());
    history.replace("/home");
  }, [dispatch, history]);

  const handleSwitchAuthModeClick = () => {
    dispatch(authModeSwitched());
  };

  return (
    <StyledAuthForm
      email={email}
      password={password}
      isFormValid={isFormValid}
      authMode={authMode}
      hasAuthError={hasAuthError}
      emailRef={emailRef}
      onSwitchAuthModeClick={handleSwitchAuthModeClick}
      onFormSubmit={handleFormSubmit}
      onGuestLoginClick={handleGuestLoginClick}
    />
  );
};

export default AuthFormContainer;

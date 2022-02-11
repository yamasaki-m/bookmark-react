import React from "react";

import styled from "styled-components";

import { respond } from "../../global-styles/media-query";
import backGroundImage from "../../assets/images/undraw_Login_re_4vu2.svg";
import { FadeAnimation } from "../../common/components/Animations";
import AuthForm from "./components/AuthForm";
import ToggleSwitch from "./components/ToggleSwitch";

type AuthProps = {
  className?: string;
};

const Auth: React.FC<AuthProps> = ({ className }) => {
  return (
    <FadeAnimation className={className}>
      <ToggleSwitch className="toggle-button" />
      <AuthForm />
    </FadeAnimation>
  );
};

const StyledAuth = styled(Auth)`
  position: relative;
  min-height: calc(100vh - 3rem);
  background-image: url(${backGroundImage});
  background-repeat: no-repeat;
  background-size: 30rem;
  background-position: right bottom;

  ${respond("phone")} {
    background-position: center bottom;
  }

  > .toggle-button {
    position: absolute;
    top: 5%;
    right: 10%;
  }
`;

const AuthContainer: React.FC = () => {
  return <StyledAuth />;
};

export default AuthContainer;

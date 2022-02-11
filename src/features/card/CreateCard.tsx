import React, { useEffect, useMemo, useRef } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import { addCard, linkAdded } from "./cardSlice";
import useInput from "../../common/hooks/use-input";
import { respond } from "../../global-styles/media-query";
import { FadeAnimation } from "../../common/components/Animations";
import Card from "../../common/components/UI/Card";
import { MemoizedInputField } from "../../common/components/UI/InputField";
import Button from "../../common/components/UI/Button";
import Icon from "../../common/components/UI/Icon";
import backGroundImage from "../../assets/images/undraw_form.svg";

const CreateCard = ({
  className,
  cardTitle,
  linkTitle,
  linkURL,
  cardIsValid,
  cardTitleRef,

  onFormSubmit,
}: any) => {
  const MemoizedSubmitButton = useMemo(() => {
    return (
      <Button
        className="primary rounded-sm"
        type="submit"
        disabled={!cardIsValid}
      >
        <Icon className="md">add</Icon>
      </Button>
    );
  }, [cardIsValid]);

  return (
    <FadeAnimation className={className}>
      <section className="create-card">
        <Card className="create-card__card" cardType="narrow">
          <form className="form" onSubmit={(event) => onFormSubmit(event)}>
            <div className="form__card-title">
              <MemoizedInputField
                value={cardTitle.value}
                isValid={cardTitle.isValid}
                isValidating={cardTitle.isValidating}
                message={cardTitle.message}
                id="cardTitle"
                type="text"
                placeholder="React"
                required
                label="カードタイトル"
                onChange={cardTitle.handleChange}
                onBlur={cardTitle.handleBlur}
                ref={cardTitleRef}
              />
            </div>

            <div className="form__link">
              <MemoizedInputField
                value={linkTitle.value}
                isValid={linkTitle.isValid}
                isValidating={linkTitle.isValidating}
                message={linkTitle.message}
                id="linkTitle"
                type="text"
                placeholder="React 公式"
                required
                label="リンクタイトル"
                onChange={linkTitle.handleChange}
                onBlur={linkTitle.handleBlur}
              />

              <MemoizedInputField
                value={linkURL.value}
                isValid={linkURL.isValid}
                isValidating={linkURL.isValidating}
                message={linkURL.message}
                id="linkURL"
                type="url"
                placeholder="https://ja.reactjs.org/"
                required
                label="リンクURL"
                onChange={linkURL.handleChange}
                onBlur={linkURL.handleBlur}
              />
            </div>

            <div className="form__submit-button-wrapper">
              {MemoizedSubmitButton}
            </div>
          </form>
        </Card>
      </section>
    </FadeAnimation>
  );
};

const StyledCreateCard = styled(CreateCard)`
  .create-card {
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 13rem);
    margin-top: 10rem;
    margin-bottom: var(--space-28);
    background-image: url(${backGroundImage});
    background-size: 30rem;
    background-repeat: no-repeat;
    background-position: right bottom;

    ${respond("phone")} {
      background-position: center bottom;
    }

    &__card {
      min-width: 38rem;
      height: max-content;

      ${respond("phone")} {
        max-width: 35rem;
      }
    }
  }

  .form {
    &__card-title {
      margin-bottom: var(--space-14);
    }

    &__link {
      display: flex;
      flex-direction: column;
      row-gap: var(--space-10);
      margin-bottom: var(--space-6);
    }

    &__submit-button-wrapper {
      text-align: center;
    }
  }
`;

const CreateCardContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cardTitle = { ...useInput("required") };
  const linkTitle = { ...useInput("required") };
  const linkURL = { ...useInput("url") };
  const cardIsValid = cardTitle.isValid && linkTitle.isValid && linkURL.isValid;
  const cardTitleRef = useRef<any>(null);

  useEffect(() => {
    cardTitleRef.current.focus();
  }, []);

  const onFormSubmit = async (event: any) => {
    event.preventDefault();

    const link = {
      id: generateID(),
      title: linkTitle.value,
      URL: linkURL.value,
      clickCount: 0,
    };

    const card = {
      id: generateID(),
      title: cardTitle.value,
      links: [],
      tags: [],
    };

    await dispatch(await addCard(card));
    await dispatch(linkAdded({ cardId: card.id, link }));
    postProcess();
  };

  const generateID = () => {
    return Math.random().toString(32).substring(2);
  };

  const postProcess = () => {
    cardTitle.reset();
    linkTitle.reset();
    linkURL.reset();

    history.push("/home");
  };

  return (
    <StyledCreateCard
      cardTitleRef={cardTitleRef}
      cardTitle={cardTitle}
      linkTitle={linkTitle}
      linkURL={linkURL}
      cardIsValid={cardIsValid}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default CreateCardContainer;

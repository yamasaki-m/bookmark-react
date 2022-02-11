import React from "react";

import styled from "styled-components";

import { respond } from "../../global-styles/media-query";
import { FadeAnimation } from "../../common/components/Animations";
import StoredCardList from "./components/StoredCardList";

type StoredCardsProps = {
  className?: string;
};

const StoredCards = React.memo<StoredCardsProps>(({ className }) => {
  return (
    <FadeAnimation className={className}>
      <section className="stored-cards">
        <StoredCardList />
      </section>
    </FadeAnimation>
  );
});

const StyledStoredCards = styled(StoredCards)`
  .stored-cards {
    min-height: calc(100vh - 14.8rem);
    margin: 9rem var(--space-6) var(--space-28);

    ${respond("tablet")} {
      margin: 14.4rem 0 var(--space-28);
    }
    ${respond("phone")} {
      margin: 14.4rem var(--space-10) 4rem;
    }
  }
`;

const StoredCardsContainer: React.FC = () => {
  // const dispatch = useDispatch();
  // const { id: userId, token } = useSelector(
  //   (state: RootState) => state.auth.user
  // );

  // useEffect(() => {
  //   const handleFetchCard = async () =>
  //     dispatch(await tryFetchCards({ userId, token }));

  //   handleFetchCard();
  // }, [dispatch, userId, token]);

  return <StyledStoredCards />;
};

export default StoredCardsContainer;

import {
  createSlice,
  createEntityAdapter,
  EntityState,
  EntityId,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

import { Firebase } from "../../api/firebase";

import type { Dispatch, RootState } from "../../app/store";
import { CardTypes } from "../../types";

type CardState = {
  cardsEntityState: EntityState<Card>;
  linksEntityState: EntityState<Link>;
  tagsEntityState: EntityState<Tag>;

  isLoading: boolean;
  didFetchSample: boolean;
  hasError: boolean;
};

type Card = CardTypes;

type Tag = {
  id: EntityId;
  tag: string;
};

type Link = {
  id: EntityId;
  title: string;
  URL: string;
  clickCount: number;
};

const cardsAdapter = createEntityAdapter<Card>();
const tagsAdapter = createEntityAdapter<Tag>();
const linksAdapter = createEntityAdapter<Link>();

const cardsInitialEntityState = cardsAdapter.getInitialState();
const tagsInitialEntityState = tagsAdapter.getInitialState();
const linksInitialEntityState = linksAdapter.getInitialState();

export const {
  selectIds: selectAllCardIds,
  selectById: selectCardById,
  selectAll: selectAllCards,
} = cardsAdapter.getSelectors(
  (state: RootState) => state.card.cardsEntityState
);

export const {
  selectIds: selectAllTagIds,
  selectById: selectTagById,
  selectAll: selectAllTags,
} = tagsAdapter.getSelectors((state: RootState) => state.card.tagsEntityState);

export const { selectIds: selectAllLinkIds, selectById: selectLinkById } =
  linksAdapter.getSelectors((state: RootState) => state.card.linksEntityState);

export const selectTagByIds = createSelector(
  (state: RootState) => state,
  (_: RootState, tagIds: EntityId[]): EntityId[] => tagIds,

  (state, ids: EntityId[]) => {
    let tags: any = {};
    for (const id of ids) {
      const newTag: any = selectTagById(state, id);
      tags = { ...tags, [id]: { ...newTag } };
    }
    return tags;
  }
);
export const selectLinkByIds = createSelector(
  (state: RootState) => state,
  (_: RootState, linkIds: EntityId[]): EntityId[] => linkIds,

  (state, ids: EntityId[]) => {
    let links: any = {};
    for (const id of ids) {
      const newLink: any = selectLinkById(state, id);
      links = { ...links, [id]: { ...newLink } };
    }
    return links;
  }
);

export const selectAllTagValues = createSelector(
  (state: RootState): any => selectAllTags(state),
  (tags: any) => {
    return Array.from(new Set(tags.map((tag: any) => tag.tag)));
  }
);
export const selectFilteredCardIds = createSelector(
  (state: RootState): any => state.filter.storedCheckedOptions,
  (state: RootState): any => selectAllCards(state),
  (state: RootState): any => selectAllTags(state),

  (options, cards, allTags): any => {
    const checkedTagObj = allTags.filter((tag: any) => {
      return options.some((option: any) => option === tag.tag);
    });
    const checkedTagIds = checkedTagObj.map((tag: any) => tag.id);
    const matchedTag = (tagId: any) => {
      return checkedTagIds.some((checkedTagId: any) => checkedTagId === tagId);
    };

    const filteredCards = cards.filter((card: any) =>
      card.tags.some(matchedTag)
    );
    const filteredCardIds = filteredCards.map((card: any) => card.id);

    return filteredCardIds ?? [];
  }
);
export const selectSortedLinkIds = createSelector(
  (_: RootState, linkIds: EntityId[]): EntityId[] => linkIds,
  (state: RootState, linkIds: EntityId[]): any =>
    selectLinkByIds(state, linkIds),

  (linkIds: EntityId[], links): any => {
    const sortedLinkIds = [...linkIds].sort(compareCount);

    function compareCount(current: any, prev: any) {
      return links[prev].clickCount - links[current].clickCount;
    }
    return sortedLinkIds;
  }
);

const initialState: CardState = {
  cardsEntityState: cardsInitialEntityState,
  linksEntityState: linksInitialEntityState,
  tagsEntityState: tagsInitialEntityState,

  isLoading: false,
  didFetchSample: false,
  hasError: false,
};

export const tryFetchCards = createAsyncThunk(
  "card/fetchCards",
  async ({ userId, token }: any, { rejectWithValue }) => {
    try {
      const responseData = await Firebase.fetchCard({ userId, token });
      return responseData;
    } catch (error: any) {
      return rejectWithValue({
        errorMessage: `${error.message} データを読み込めませんでした。`,
      });
    }
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    cardAdded(state, action: PayloadAction<Card>) {
      cardsAdapter.addOne(state.cardsEntityState, action.payload);
    },

    cardDeleted(
      state,
      { payload: { cardId } }: PayloadAction<{ cardId: EntityId }>
    ) {
      cardsAdapter.removeOne(state.cardsEntityState, cardId);
    },

    tagAdded(state, { payload }: PayloadAction<{ cardId: string; tag: any }>) {
      const { cardId, tag } = payload;

      tagsAdapter.addOne(state.tagsEntityState, tag);

      const currentTagIds = state.cardsEntityState.entities[cardId]?.tags || [];
      cardsAdapter.updateOne(state.cardsEntityState, {
        id: cardId,
        changes: { tags: [...currentTagIds, tag.id] },
      });
    },
    tagDeleted(
      state,
      { payload }: PayloadAction<{ cardId: string; tagId: string }>
    ) {
      const { cardId, tagId } = payload;

      tagsAdapter.removeOne(state.tagsEntityState, tagId);

      const currentTagIds = state.cardsEntityState.entities[cardId]?.tags || [];
      const newTagIds = currentTagIds.filter((id) => id !== tagId);
      cardsAdapter.updateOne(state.cardsEntityState, {
        id: cardId,
        changes: { tags: newTagIds },
      });
    },

    linkAdded(
      state,
      { payload }: PayloadAction<{ cardId: string; link: any }>
    ) {
      const { cardId, link } = payload;

      linksAdapter.addOne(state.linksEntityState, link);

      const currentLinkIds =
        state.cardsEntityState.entities[cardId]?.links || [];
      cardsAdapter.updateOne(state.cardsEntityState, {
        id: cardId,
        changes: { links: [...currentLinkIds, link.id] },
      });
    },

    linkEdited(state, { payload }: PayloadAction<{ link: any }>) {
      const { link } = payload;

      linksAdapter.updateOne(state.linksEntityState, {
        id: link.id,
        changes: { ...link },
      });
    },

    linkDeleted(
      state,
      { payload }: PayloadAction<{ cardId: string; linkId: string }>
    ) {
      const { cardId, linkId } = payload;

      linksAdapter.removeOne(state.linksEntityState, linkId);

      const currentLinkIds =
        state.cardsEntityState.entities[cardId]?.links || [];
      const newLinkIds = currentLinkIds.filter((id) => id !== linkId);
      cardsAdapter.updateOne(state.cardsEntityState, {
        id: cardId,
        changes: { links: newLinkIds },
      });
    },

    countIncremented(
      state,
      { payload: { linkId } }: PayloadAction<{ linkId: string }>
    ) {
      let currentCount: any =
        state.linksEntityState.entities[linkId]?.clickCount;

      linksAdapter.updateOne(state.linksEntityState, {
        id: linkId,
        changes: { clickCount: ++currentCount },
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(tryFetchCards.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(tryFetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;

      const responseData: any = action.payload;
      const cards = [];
      const links: any = [];
      const tags = [];

      for (const key in responseData) {
        const card: any = {
          index: +key,
          id: responseData[key].id,
          title: responseData[key].title,
          links: responseData[key].links.map(({ id }: any) => id),
          tags: responseData[key].options
            ? responseData[key].options.map(({ id }: any) => id)
            : [],
        };
        cards.push(card);
        links.push(responseData[key].links);
        responseData[key].options && tags.push(responseData[key].options);
      }

      cardsAdapter.setAll(state.cardsEntityState, cards);
      linksAdapter.setAll(state.linksEntityState, links.flat());
      tagsAdapter.setAll(state.tagsEntityState, tags.flat());
    });

    builder.addCase(tryFetchCards.rejected, (state, action: any) => {
      state.isLoading = false;
      state.hasError = true;

      console.log(action.payload.errorMessage);
    });
  },
});

export const {
  cardAdded,
  cardDeleted,
  tagAdded,
  tagDeleted,
  linkAdded,
  linkEdited,
  linkDeleted,
  countIncremented,
} = cardSlice.actions;
export default cardSlice.reducer;

export const addCard = async (newCard: Card) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(cardAdded(newCard));
  };
};

export const deleteCard = async (cardId: EntityId) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(cardDeleted({ cardId }));

    // const { id: userId, token } = getState().auth.user;
    // const newCards = getState().card.storedCards;
    // console.log({ userId, token, newCards });

    // Firebase.deleteCard({ userId, token, newCards });
  };
};

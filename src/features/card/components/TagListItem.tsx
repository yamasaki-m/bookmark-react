import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import { selectTagById, tagDeleted } from "../../../features/card/cardSlice";
import Button from "../../../common/components/UI/Button";
import Icon from "../../../common/components/UI/Icon";

const TagListItem = ({ tag, onClick }: any) => {
  return (
    <li className="tag-list__item" key={tag.id}>
      <span className="tag-list__tag">
        {tag.tag} |
        <Button className="default plain-xs" type="button" onClick={onClick}>
          <Icon className="xs">close</Icon>
        </Button>
      </span>
    </li>
  );
};

const TagListItemContainer: React.FC<any> = ({ cardId, tagId }) => {
  const dispatch = useDispatch();

  const tag: any = useSelector((state: RootState) =>
    selectTagById(state, tagId)
  );

  const handleDeleteTagClick = () => {
    dispatch(tagDeleted({ cardId, tagId }));
  };

  return <TagListItem tag={tag} onClick={handleDeleteTagClick} />;
};

export default TagListItemContainer;

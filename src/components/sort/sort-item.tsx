import React from 'react';
import classNames from 'classnames';

import {useActionCreators, useAppSelector} from '../../store/hooks';
import {TSortItem} from '../../types';
import {offersActions, offersSelectors} from '../../store/slices/offers';

type TOffersSortItem = {
  item: TSortItem;
  handleShowSort?: () => void;
}

export default function OffersSortItem({item, handleShowSort}: TOffersSortItem): React.JSX.Element {
  const activeSort = useAppSelector(offersSelectors.selectSortItem);
  const isActiveSortItem = item === activeSort;
  const {changeSortOffers} = useActionCreators(offersActions);

  const handleSortItemClick = () => {
    if (!isActiveSortItem) {
      changeSortOffers(item);
      if (handleShowSort) {
        handleShowSort();
      }
    }
  };

  return (
    <li
      className={classNames('places__option', {'places__option--active': isActiveSortItem})}
      onClick={handleSortItemClick}
    >
      {item.name}
    </li>
  );
}

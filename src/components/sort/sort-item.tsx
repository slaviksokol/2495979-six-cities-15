import React from 'react';
import classNames from 'classnames';

import {useAppDispatch, useAppSelector} from '../../store';
import {TSortItem} from '../../types';
import {offersActions, offersSelectors} from '../../store/reducer';

export default function OffersSortItem({item}: {item: TSortItem}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const activeSort = useAppSelector(offersSelectors.selectSortItem);
  const isActiveSortItem = item === activeSort;

  const handleSortItemClick = () => {
    if (!isActiveSortItem) {
      dispatch(offersActions.changeSortOffers(item));
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

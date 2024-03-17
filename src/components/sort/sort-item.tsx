import React from 'react';
import classNames from 'classnames';

import {useAppDispatch, useAppSelector} from '../../store';
import {selectSortItem} from '../../store/selector';
import {TSortItem} from '../../types';
import {changeSortOffers} from '../../store/action';

export default function OffersSortItem({item}: {item: TSortItem}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const activeSort = useAppSelector(selectSortItem);
  const isActiveSortItem = item === activeSort;

  const handleSortItemClick = () => {
    if (activeSort !== item) {
      dispatch(changeSortOffers(item));
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

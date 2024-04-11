import React, {useState} from 'react';
import classNames from 'classnames';

import {sortOptions} from './const';
import {useAppSelector} from '../../store/hooks';
import {offersSelectors} from '../../store/slices/offers';
import OffersSortItem from './sort-item';

export default function OffersSorting(): React.JSX.Element {
  const activeSort = useAppSelector(offersSelectors.selectSortItem);
  const [isShowSort, setIsShowSort] = useState<boolean>(false);

  const handleShowSort = () => {
    setIsShowSort(!isShowSort);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">
        Sort by
      </span>
      <span
        className="places__sorting-type"
        onClick={handleShowSort}
      >
        {activeSort.name}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', {'places__options--opened': isShowSort})}>
        {
          sortOptions.map((sort) => (
            <OffersSortItem
              key={sort.code}
              item={sort}
              handleShowSort={handleShowSort}
            />
          ))
        }
      </ul>
    </form>
  );
}

import {offersSlice} from './offers.ts';
import {CITIES, StatusLoading} from '../../const.ts';
import {sortOptions} from '../../components/sort/const.ts';
import {fetchOffersAction} from '../thunks/offers.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';

describe('offers slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.None,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.None,
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchOffersAction.pending" action', () => {
    const initialState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.Loading,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchOffersAction.fulfilled" action', () => {
    const offers = [makeFakeOffer()];
    const initialState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.Loading,
    };
    const expectedState = {
      city: CITIES[0],
      offers: offers,
      sort: sortOptions[0],
      statusLoading: StatusLoading.Success,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.fulfilled(offers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchOffersAction.rejected" action', () => {
    const initialState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.Loading,
    };
    const expectedState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.Failed,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should "changeCity" action', () => {
    const city = 'Amsterdam';
    const initialState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      city,
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.None,
    };

    const result = offersSlice.reducer(initialState, offersSlice.actions.changeCity(city));

    expect(result).toEqual(expectedState);
  });

  it('should "changeSortOffers" action', () => {
    const sort = {
      code: 'top_rated_first',
      name: 'Top rated first',
    };
    const initialState = {
      city: CITIES[0],
      offers: [],
      sort: sortOptions[0],
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      city: CITIES[0],
      offers: [],
      sort: sort,
      statusLoading: StatusLoading.None,
    };

    const result = offersSlice.reducer(initialState, offersSlice.actions.changeSortOffers(sort));

    expect(result).toEqual(expectedState);
  });
});

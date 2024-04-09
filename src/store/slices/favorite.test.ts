import {favoriteSlice} from './favorite.ts';
import {StatusLoading} from '../../const.ts';
import {changeFavoriteAction, fetchFavoriteAction} from '../thunks/favorite.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';

describe('Favorite Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      statusLoading: StatusLoading.None,
    };

    const result = favoriteSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      statusLoading: StatusLoading.None,
    };

    const result = favoriteSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchFavoriteAction.pending" action', () => {
    const initialState = {
      favorites: [],
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      favorites: [],
      statusLoading: StatusLoading.Loading,
    };

    const result = favoriteSlice.reducer(initialState, fetchFavoriteAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchFavoriteAction.fulfilled" action', () => {
    const favorites = [makeFakeOffer()];
    const initialState = {
      favorites: [],
      statusLoading: StatusLoading.Loading,
    };
    const expectedState = {
      favorites,
      statusLoading: StatusLoading.Success,
    };

    const result = favoriteSlice.reducer(initialState, fetchFavoriteAction.fulfilled(favorites, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchFavoriteAction.rejected" action', () => {
    const initialState = {
      favorites: [],
      statusLoading: StatusLoading.Loading,
    };
    const expectedState = {
      favorites: [],
      statusLoading: StatusLoading.Failed,
    };

    const result = favoriteSlice.reducer(initialState, fetchFavoriteAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "changeFavoriteAction.fulfilled" action', () => {
    const offer = makeFakeOffer();
    const initialState = {
      favorites: [],
      statusLoading: StatusLoading.Success,
    };
    const expectedState = {
      favorites: [offer],
      statusLoading: StatusLoading.Success,
    };

    const result = favoriteSlice.reducer(initialState, changeFavoriteAction.fulfilled(offer, 'offerId', {offerId: 'offerId', status: 1}));

    expect(result).toEqual(expectedState);
  });
});

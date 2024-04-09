import {StatusLoading} from '../../const.ts';
import {offerDetailSlice} from './offer-detail.ts';
import {fetchOfferDetailAction, fetchOffersNearbyAction} from '../thunks/offer-detail.ts';
import {makeFakeOfferDetail} from '../../utils/mocks.ts';

describe('Offer Detail', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};

    const expectedState = {
      statusLoading: StatusLoading.None,
    };

    const result = offerDetailSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      statusLoading: StatusLoading.None,
    };

    const result = offerDetailSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" with "fetchOfferDetailAction.pending" action', () => {
    const initialState = {
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      statusLoading: StatusLoading.Loading,
    };

    const result = offerDetailSlice.reducer(initialState, fetchOfferDetailAction.pending('id', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchOfferDetailAction.fulfilled" action', () => {
    const offer = makeFakeOfferDetail();
    const initialState = {
      statusLoading: StatusLoading.Loading,
    };
    const expectedState = {
      offer,
      statusLoading: StatusLoading.Success,
    };

    const result = offerDetailSlice.reducer(initialState, fetchOfferDetailAction.fulfilled(offer, 'id', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" with "fetchOfferDetailAction.rejected" action', () => {
    const initialState = {
      statusLoading: StatusLoading.Loading,
    };
    const expectedState = {
      statusLoading: StatusLoading.Failed,
    };

    const result = offerDetailSlice.reducer(initialState, fetchOfferDetailAction.rejected(null, 'id', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" with "fetchOffersNearbyAction.fullfilled" action', () => {
    const offersNearby = [makeFakeOfferDetail()];
    const initialState = {
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      statusLoading: StatusLoading.None,
      offersNearby,
    };

    const result = offerDetailSlice.reducer(initialState, fetchOffersNearbyAction.fulfilled(offersNearby, 'offerId', ''));

    expect(result).toEqual(expectedState);
  });
});

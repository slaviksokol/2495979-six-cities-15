import {userSlice} from './user.ts';
import {AuthStatus, StatusLoading} from '../../const.ts';
import {makeFakeUser} from '../../utils/mocks.ts';
import {checkAuthAction, loginAction, logoutAction} from '../thunks/user.ts';

describe('User Slice', () => {
  it ('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthStatus.Unknown,
      userData: null,
      statusLoading: StatusLoading.None,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthStatus.Unknown,
      userData: null,
      statusLoading: StatusLoading.None,
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const userData = makeFakeUser();
    const initialState = {
      authorizationStatus: AuthStatus.NoAuth,
      userData: null,
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      authorizationStatus: AuthStatus.Auth,
      userData: userData,
      statusLoading: StatusLoading.Success,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.fulfilled(userData, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthStatus.Auth,
      userData: null,
      statusLoading: StatusLoading.Success,
    };
    const expectedState = {
      authorizationStatus: AuthStatus.NoAuth,
      userData: null,
      statusLoading: StatusLoading.Failed,
    };

    const result = userSlice.reducer(initialState, checkAuthAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthStatus.NoAuth,
      userData: null,
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      authorizationStatus: AuthStatus.Auth,
      userData: null,
      statusLoading: StatusLoading.Success,
    };

    const result = userSlice.reducer(initialState, loginAction.fulfilled(undefined, '', { email: 'test@test.com', password: '123456i'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthStatus.Auth,
      userData: null,
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      authorizationStatus: AuthStatus.NoAuth,
      userData: null,
      statusLoading: StatusLoading.Failed,
    };

    const result = userSlice.reducer(initialState, loginAction.rejected(null, '', { email: 'test@test', password: '1'}));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthStatus.Auth,
      userData: null,
      statusLoading: StatusLoading.None,
    };
    const expectedState = {
      authorizationStatus: AuthStatus.NoAuth,
      userData: null,
      statusLoading: StatusLoading.Success,
    };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});

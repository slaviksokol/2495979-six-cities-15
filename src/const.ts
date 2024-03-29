export enum AppRoutes {
  Main='/',
  Login='/login',
  Favorites='/favorites',
  Offer='/offer',
  OfferId='/offer/:id',
  Error404='/*',
}

export enum AuthStatus {
  Auth='Auth',
  NoAuth='NoAuth',
  Unknown='Unknown',
}

export const maxNearOffers = 3;

export enum Endpoint {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export enum StatusLoading {
  None,
  Loading,
  Success,
  Failed,
}

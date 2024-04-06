export const MAX_NEAR_OFFERS = 3;
export const MAX_COMMENTS = 10;
export const MIN_TEXT_COMMENT_LENGTH: number = 50;
export const MAX_TEXT_COMMENT_LENGTH: number = 300;

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

export enum Endpoint {
  Offers = '/offers',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export enum StatusLoading {
  None,
  Loading,
  Success,
  Failed,
}

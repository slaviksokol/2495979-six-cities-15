export type TApartmentType = 'apartment' | 'room' | 'house' | 'hotel';

export type THost = {
  avatarUrl: string;
  name: string;
  isPro: boolean;
}

export type TLocationCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TCity = {
  name: string;
  location: TLocationCoordinates;
}

export type TOffer = {
  id: string;
  title: string;
  type: TApartmentType;
  price: number;
  previewImage: string;
  city: TCity;
  location: TLocationCoordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type TOfferDetail = TOffer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: string[];
  maxAdults: number;
}

export type TOffersByCity = {
  city: TCity;
  offers: TOffer[];
}

export type TSortItem = {
  code: string;
  name: string;
}

export type TAuthData = {
  email: string;
  password: string;
};

export type TUserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email?: string;
  token?: string;
};

export type TComment = {
  id: string;
  date: string;
  user: TUserData;
  comment: string;
  rating: number;
}

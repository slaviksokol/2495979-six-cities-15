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

export type TReview = {
  id: number;
  avatarUrl: string;
  name: string;
  rate: number;
  message: string;
  date: string;
}

export type TOffer = {
  id: string;
  title: string;
  type: TApartmentType;
  price: number;
  city: TCity;
  location: TLocationCoordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  previewImage: string;
  images: string[];
  maxAdults: number;
  reviews: TReview[];
}

export type TOffersByCity = {
  city: TCity;
  offers: TOffer[];
}

export type TSortItem = {
  code: string;
  name: string;
}

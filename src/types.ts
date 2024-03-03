type TApartmentType = 'apartment' | 'room' | 'house' | 'hotel';

type THost = {
  avatarUrl: string;
  name: string;
  isPro: boolean;
}

type TLocationCoordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type TCity = {
  name: string;
  location: TLocationCoordinates;
}

export type TOffer = {
  id: string;
  title: string;
  type: TApartmentType;
  price: number;
  city: TCity;
  location: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: string[];
  maxAdults: number;
}

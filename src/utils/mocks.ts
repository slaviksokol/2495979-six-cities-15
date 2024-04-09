import { internet, lorem, name } from 'faker';

import {TComment, TOffer, TOfferDetail, TUserData} from '../types.ts';

export const makeFakeOffer = (): TOffer => ({
  id: crypto.randomUUID(),
  city: {
    name: name.title(),
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 12,
    },
  },
  title: name.title(),
  type: 'room',
  price: Math.floor(Math.random() * 100) + 1,
  rating: Math.floor(Math.random() * 5) + 1,
  isFavorite: true,
  isPremium: false,
  previewImage: internet.url(),
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12,
  },
});

export const makeFakeOfferDetail = (): TOfferDetail => ({
  ...makeFakeOffer(),
  images: [internet.url()],
  bedrooms: Math.floor(Math.random() * 4) + 1,
  maxAdults: Math.floor(Math.random() * 10) + 1,
  goods: [lorem.word()],
  host: {
    name: name.title(),
    isPro: false,
    avatarUrl: internet.avatar(),
  },
  description: lorem.paragraph(),
});

export const makeFakeComment = (): TComment => ({
  id: crypto.randomUUID(),
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false,
  },
  comment: lorem.text(),
  rating: Math.floor(Math.random() * 5) + 1,
});

export const makeFakeUser = (): TUserData => ({
  name: name.title(),
  avatarUrl: internet.avatar(),
  isPro: false,
  email: internet.email(),
  token: 'secret'
});

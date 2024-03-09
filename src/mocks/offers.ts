import {TOffer} from '../types';
import {getRandomInt} from '../helper/func';

const cities = [
  {
    name: 'Moscow',
    id: 1,
    location: {
      latitude: 52.356654646,
      longitude: 4.6765648646,
      zoom: 5,
    }
  },
  {
    name: 'Sankt Petersburg',
    id: 2,
    location: {
      latitude: 52.356654646,
      longitude: 4.6765648646,
      zoom: 5,
    }
  },
  {
    name: 'Smolensk',
    id: 3,
    location: {
      latitude: 52.356654646,
      longitude: 4.6765648646,
      zoom: 5,
    }
  },
];

const createOffer = (index: number): TOffer => ({
  id: String(index),
  title: `Apartment ${String(index)}`,
  type: 'apartment',
  price: getRandomInt(100, 1000),
  city: cities[getRandomInt(0, 2)],
  location: 'here',
  isFavorite: !!getRandomInt(0, 1),
  isPremium: !!getRandomInt(0, 1),
  rating: getRandomInt(0, 5),
  description: 'desc',
  bedrooms: getRandomInt(1, 2),
  goods: [
    'Hearting'
  ],
  host: {
    avatarUrl: `https://source.unsplash.com/random/74x74/?user&sid=${String(index)}`,
    name: 'Host name',
    isPro: !!getRandomInt(0, 1),
  },
  images: [
    `https://source.unsplash.com/random/300×300?sig=${String(index)}1&apartment`,
    `https://source.unsplash.com/random/300×300?sig=${String(index)}2&apartment`,
    `https://source.unsplash.com/random/300×300?sig=${String(index)}3&apartment`,
  ],
  maxAdults: getRandomInt(1, 5),
});

export const generateOffers = (offersCount: number): TOffer[] => (
  Array.from(new Array(offersCount), (_, index): TOffer => createOffer(index))
);

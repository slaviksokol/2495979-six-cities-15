import {TCity, TComment, TOffer, TOffersByCity, TSortItem} from '../types';

export function getRatingWidth(rating: number): string {
  return `${rating * (100 / 5)}%`;
}

export function getOffersByCity(offers: TOffer[] | null): TOffersByCity[] {
  if (!offers) {
    return [];
  }

  const offersByCity: TOffersByCity[] = [];
  offers.forEach((offer) => {
    const cityIndex: number = offersByCity.findIndex((group) => group.city.name === offer.city.name);
    if (cityIndex !== -1) {
      offersByCity[cityIndex].offers.push(offer);
    } else {
      offersByCity.push({city: offer.city, offers: [offer]});
    }
  });

  return offersByCity;
}

export function getCitiesFromOffers(offers: TOffer[]): TCity[] {
  const cities: TCity[] = [];
  const offersByCity = getOffersByCity(offers);
  offersByCity.forEach((city) => {
    cities.push(city.city);
  });
  return cities;
}

export function getSortedOffers(offers: TOffer[], sortItem: TSortItem): TOffer[] {
  switch (sortItem.code) {
    case 'popular':
      return offers;
    case 'price_low_to_high':
      return offers.sort((a, b) => a.price - b.price);
    case 'price_high_to_low':
      return offers.sort((a, b) => b.price - a.price);
    case 'top_rated_first':
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}

export function getSortedComments(comments: TComment[]): TComment[] {
  if (!comments) {
    return [];
  }

  comments = [...comments].sort((a, b) => {
    const keyA = new Date(a.date),
      keyB = new Date(b.date);
    if (keyA > keyB) {
      return -1;
    }
    if (keyA < keyB) {
      return 1;
    }
    return 0;
  });

  return comments;
}

export function getRandomCity(cities: TCity[]): TCity {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

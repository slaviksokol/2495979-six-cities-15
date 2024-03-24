import {maxNearOffers} from '../const';
import {TCity, TLocationCoordinates, TOffer, TOffersByCity, TSortItem} from '../types';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomLocationByCity({location}: TCity): TLocationCoordinates {
  const minStepCoordinate: number = -0.02;
  const maxStepCoordinate: number = 0.02;
  const coordinates = location;
  coordinates.latitude += getRandomFloat(minStepCoordinate, maxStepCoordinate);
  coordinates.longitude += getRandomFloat(minStepCoordinate, maxStepCoordinate);
  return coordinates;
}

export function getRatingWidth(rating: number): string {
  return `${rating * (100 / 5)}%`;
}

export function getOffersByCity(offers: TOffer[]): TOffersByCity[] {
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

export function getNearOffers(offers: TOffer[], curOffer: TOffer): TOffer[] {
  const nearOffers = [];
  for (const offer of offers) {
    if (
      offer.city === curOffer.city
      && offer.id !== curOffer.id
      && nearOffers.length < maxNearOffers
    ) {
      nearOffers.push(offer);
    } else if (nearOffers.length === maxNearOffers) {
      break;
    }
  }
  return nearOffers;
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

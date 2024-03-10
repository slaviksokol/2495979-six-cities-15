import {TCity, TLocationCoordinates, TOffer, TOffersByCity} from '../types';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomLocationByCity({location}: TCity): TLocationCoordinates {
  const minStepCoordinate: number = -0.01;
  const maxStepCoordinate: number = 0.01;
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

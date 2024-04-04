import leaflet from 'leaflet';

export const DefaultCustomIcon = leaflet.icon({
  iconUrl: '../../../markup/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});
export const CurrentCustomIcon = leaflet.icon({
  iconUrl: '../../../markup/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

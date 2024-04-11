import React, {useEffect, useRef} from 'react';
import leaflet, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {TCity, TOffer} from '../../types';
import {currentCustomIcon, defaultCustomIcon} from './consts';
import useMap from './use-map';

type TMap = {
  city: TCity;
  className: string;
  offers: TOffer[];
  activeOffer: TOffer | null;
}

export default function Map({city, className, offers, activeOffer}: TMap): React.JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [map, activeOffer, city]);

  useEffect((): void => {
    if (map && offers) {
      offers.forEach((offer) => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude
          },
          {icon: activeOffer && offer.id === activeOffer.id ? currentCustomIcon : defaultCustomIcon}
        )
          .addTo(markerLayer.current);
      });
    }
  }, [map, offers, activeOffer]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    >
    </section>
  );
}

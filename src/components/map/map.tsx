import React, {useEffect, useRef} from 'react';
import useMap from './use-map';
import leaflet, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {TOffer} from '../../types';
import {currentCustomIcon, defaultCustomIcon} from './consts';
import {useAppSelector} from '../../store/hooks';
import {offersSelectors} from '../../store/slices/offers';

type TMap = {
  className: string;
  offers: TOffer[];
  activeOffer: TOffer | null;
}

export default function Map({className, offers, activeOffer}: TMap): React.JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const activeCity = useAppSelector(offersSelectors.selectCity);
  const map = useMap(mapRef, activeCity.location);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map && activeCity) {
      map.setView([activeCity.location.latitude, activeCity.location.longitude], activeCity.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [activeCity, map, activeOffer]);

  useEffect((): void => {
    if (map) {
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
      style={{ height: '631px' }}
      ref={mapRef}
    >
    </section>
  );
}

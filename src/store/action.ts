import {createAction} from '@reduxjs/toolkit';

import {TCity, TOffer} from '../types';

export const changeCity = createAction<TCity>('changeCity');
export const getOffers = createAction<TOffer[]>('getOffers');

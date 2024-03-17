import {createAction} from '@reduxjs/toolkit';

import {TCity, TOffer, TSortItem} from '../types';

export const changeCity = createAction<TCity>('changeCity');
export const getOffers = createAction<TOffer[]>('getOffers');
export const changeSortOffers = createAction<TSortItem>('changeSortOffers');

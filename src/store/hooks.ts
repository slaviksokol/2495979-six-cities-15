import {useMemo} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';

import {AppDispatch, State} from './state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

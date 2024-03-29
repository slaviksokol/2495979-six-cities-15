import React from 'react';

import ReviewList from './review-list';
import ReviewForm from './review-form';
import {AuthStatus} from '../../const';
import {useAppSelector} from '../../store/hooks';
import {userSelectors} from '../../store/slices/user';

export default function Reviews(): React.JSX.Element {
  const authorizationStatus = useAppSelector(userSelectors.selectAuthStatus);

  return (
    <>
      <ReviewList />
      {authorizationStatus === AuthStatus.Auth && <ReviewForm />}
      {authorizationStatus !== AuthStatus.Auth && <p>Only authorized users can leave comments</p>}
    </>
  );
}

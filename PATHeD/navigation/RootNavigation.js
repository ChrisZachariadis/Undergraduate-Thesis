import React from 'react';
import {Authenticated, NonAuthenticated} from './MainNavigation';
import {useRecoilState} from 'recoil';
import {userState} from '../features/recoil/atoms/User/userState';

const RootNavigation = () => {
  const [user, _] = useRecoilState(userState);
  // return user.loggedIn ? <Authenticated /> : <NonAuthenticated />;
  return true ? <Authenticated /> : <NonAuthenticated />;
};

export default RootNavigation;

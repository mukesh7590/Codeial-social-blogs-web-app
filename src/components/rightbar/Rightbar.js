import './rightbar.css';

import FriendsList from '../friendsList/FriendsList';

import React from 'react';

import { useAuth } from '../../hooks';

const Rightbar = () => {
  // const auth = useAuth();
  // console.log('auth user RightBAR =>', auth.user);
  return (
    <div className="containerLeftPart">
      <div className="rightbarTitle">Friends</div>
      <FriendsList />
    </div>
  );
};

export default Rightbar;

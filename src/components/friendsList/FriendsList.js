import { Link } from 'react-router-dom';

import styles from '../../styles/home.module.css';
import '../../styles/commonClass.css';
import './friendsList.css';
import { useAuth } from '../../hooks';

const FriendsList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user;

  return (
    <div className="friendListWrapper">
      {friends && friends.length === 0 && (
        <div className="noFriendText">NO friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <Link to={`/user/${friend.to_user._id}`}>
            <div className="friendListRow" key={`friend-${friend._id}`}>
              <img
                className="avatarImg"
                src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                alt=""
              />

              <div className="emailText">{friend.to_user.email}</div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default FriendsList;

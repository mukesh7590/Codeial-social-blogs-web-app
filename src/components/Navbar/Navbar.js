import { useAuth } from '../../hooks';
import SearchIcon from '@mui/icons-material/Search';

import './navbar.css';
import styles from '../../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchUsers } from '../../api';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      console.log('search =>', response.data);
      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ 'text-decoration': 'none' }}>
          <img
            className="logo"
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend..."
            className="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {results.length > 0 && (
            <div className={styles.searchResults}>
              <ul>
                {results.map((user) => (
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <Link to={`/user/${user._id}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                        alt=""
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/">
            <span className="topbarLink">Home</span>
          </Link>
          <Link to={`/user/${auth.user._id}`}>
            <span className="topbarLink">Profile</span>
          </Link>
          <Link to="settings">
            <span className="topbarLink">Setting</span>
          </Link>
        </div>
        <div className="topbarIcons">
          {auth.user && (
            <div className="profileContainer">
              <a href="/settings">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                  alt=""
                  className="topbarImg"
                />
              </a>
              <span className="topbarLink" onClick={auth.logout}>
                Sign Out
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications';

import styles from '../styles/setting.module.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const location = useLocation();
  console.log('location => ', location);

  const { user = {} } = location.state;
  console.log('user => ', user);
  // const user = {};

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add friend</button>

        <button className={`button ${styles.saveBtn}`}>Remove friend</button>
      </div>
    </div>
  );
};

export { UserProfile };

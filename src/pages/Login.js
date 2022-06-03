import { useState } from 'react';
import styles from '../styles/login.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const auth = useAuth();
  console.log('AUTH => ', auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return toast('Please enter both Email and Password', { type: 'error' });
    }

    const response = await auth.login(email, password);
    if (response.success) {
      toast('Successfully Loged in', { type: 'success' });
    } else {
      toast(response.message, { type: 'error' });
    }

    setLoggingIn(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in....' : 'Log In'}
        </button>

        <ToastContainer />
      </div>
    </form>
  );
};

export { Login };

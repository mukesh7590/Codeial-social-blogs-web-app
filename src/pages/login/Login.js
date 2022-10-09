import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
// import styles from '../styles/login.module.css';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const auth = useAuth();
  console.log('useAuth from login page => ', auth);

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

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Codeial</h3>
          <span className="loginDesc">
            Connect with coders and the world around you on Codeial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginForm" onSubmit={handleSubmit}>
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Paasword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="loginButtonContainer">
              <button className="loginButton" disabled={loggingIn}>
                {loggingIn ? 'Signing In....' : 'Sign In'}
              </button>{' '}
              <ToastContainer />
              <Link to="/register">
                <button className="loginRegisterButton">Sign Up </button>
              </Link>
            </div>
            <span className="loginForgot">Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>

  )  
}

export { Login };

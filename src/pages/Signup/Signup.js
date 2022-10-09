import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks';
import './signUp.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  // const { addToast } = useToasts();
  const auth = useAuth();
  // const history = useHistory();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast('Please fill all the fields', {
        type: 'error',
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast('Make sure password and confirm password matches', {
        type: 'error',
      });

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      // history.push('/login');
      navigate('/login');
      setSigningUp(false);

      toast('User registered successfully, please login now', {
        type: 'success',
      });
    } else {
      toast(response.message, {
        type: 'error',
      });
    }

    setSigningUp(false);
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
          <form className="signupForm" onSubmit={handleFormSubmit}>
            <input
              className="loginInput"
              placeholder="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="new-password"
            />

            <input
              className="loginInput"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
            />

            <input
              className="loginInput"
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="loginInput"
              placeholder="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="loginButtonContainer">
              <button className="loginButton" disabled={signingUp}>
                {signingUp ? 'Signing Up...' : 'Sign Up'}
              </button>

              <ToastContainer />

              <Link to="/login">
                <button className="loginRegisterButton">Sign In </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Signup };

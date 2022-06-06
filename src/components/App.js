// import { getPosts } from '../api';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const PrivateRoute = ({ children }) => {
  // const isAuthenticated = true;
  const auth = useAuth();
  if (auth.user) {
    return children;
  }

  return <Navigate to="/login" />;
};

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/register" element={<Signup />} />

          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="//user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

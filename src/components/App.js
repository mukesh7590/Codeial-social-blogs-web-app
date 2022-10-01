import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader } from './';
import { useAuth } from '../hooks';

// const PrivateRoute = ({ children }) => {
//   // const isAuthenticated = true;
//   const auth = useAuth();
//   if (auth.user) {
//     return children;
//   }

//   return <Navigate to="/login" />;
// };

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
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
          </Route>
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/user/:userId" element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

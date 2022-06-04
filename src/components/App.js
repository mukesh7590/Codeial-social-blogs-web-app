// import { getPosts } from '../api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Signup, Settings } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

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

          <Route exact path="/settings" element={<Settings />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

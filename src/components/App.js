import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const About = () => {
  return <h1>About page</h1>;
};

const UserInfo = () => {
  return <h1>user info</h1>;
};

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const auth = useAuth();
  // put useEffect into the Home component
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     // console.log('response =>  ', response);
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home posts={[]} />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/about" element={<About />} />

          <Route exact path="/user/:postId" element={<UserInfo />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

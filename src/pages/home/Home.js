import { PropTypes } from 'prop-types';

import { Post, Loader, CreatePost, Rightbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useAuth, usePosts } from '../../hooks';
import Navbar from '../../components/Navbar/Navbar';
import './home.css';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();
  const navigate = useNavigate();

  if (posts.loading) {
    return <Loader />;
  }

  return auth.user ? (
    <>
      <Navbar />

      <div className="homeContainer">
        {/* <Sidebar /> */}
        <div className="leftPart">
          <div className="feedWrapper">
            <CreatePost />
            {posts.data.map((post) => (
              <Post post={post} key={`post-${post._id}`} />
            ))}
          </div>
        </div>

        <div className="rightPart">
          <Rightbar />
        </div>
      </div>
    </>
  ) : (
    navigate('/login')
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default Home;

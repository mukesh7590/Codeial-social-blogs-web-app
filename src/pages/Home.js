import styles from '../styles/home.module.css';
// import { PropTypes } from 'prop-types';
import { Post, Loader, FriendsList, CreatePost } from '../components';
// import { useEffect, useState } from 'react';
// import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const posts = usePosts();

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

  // if (loading) {
  //   return <Loader />;
  // }

  if (posts.loading) {
    return <Loader />;
  }
  // console.log('posts =>', posts);
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>

      {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
export default Home;

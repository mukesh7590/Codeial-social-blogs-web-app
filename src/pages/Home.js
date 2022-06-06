import styles from '../styles/home.module.css';
// import { PropTypes } from 'prop-types';
import { Comment, Loader } from '../components';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // put useEffect into the Home component
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      // console.log('response =>  ', response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                alt="user-pic"
              />
              <div>
                {/* <span className={styles.postAuthor}>{post.user.name}</span> */}
                <Link
                  to={`/user/${post.user._id}`}
                  state={{
                    user: post.user,
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>

                {/* <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    state: {
                      user: post.user.name,
                    },
                  }}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link> */}

                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conetnt}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/134/134808.png"
                  alt="comments-icon"
                />
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };
export default Home;

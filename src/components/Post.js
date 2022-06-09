import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications';

import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
//   const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        console.log('Comment created successfully!');
        // addToast('Comment created successfully!', {
        //   appearance: 'success',
        // });
      } else {
        console.log('Comment NOT created yet!')
        // addToast(response.message, {
        //   appearance: 'error',
        // });
      }

      setCreatingComment(false);
    }
  };

  return (
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

        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              alt="likes-icon"
            />
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/134/134808.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>

        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;

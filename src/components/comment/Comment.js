import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './comment.css';
import styles from '../../styles/home.module.css';
import { useState } from 'react';
import { deletingComment, toggleLike } from '../../api';

import { usePosts } from '../../hooks';

const Comment = ({ comment, post }) => {
  const posts = usePosts();
  const [likes, setLikes] = useState(comment.likes.length);

  const handleCommentLikeClick = async () => {
    const response = await toggleLike(comment._id, 'Comment');

    if (response.success) {
      if (response.data.deleted) {
        console.log('Like Removed Successfully!');
        setLikes(likes - 1);
        // addToast('Comment created successfully!', {
        //   appearance: 'success',
        // });
      } else {
        console.log('Liked Successfully');
        setLikes(likes + 1);
        // addToast(response.message, {
        //   appearance: 'error',
        // });
      }
    } else {
      console.log('Error in the LIKE!');
      // addToast(response.message, {
      //   appearance: 'error',
      // });
    }
  };

  const handleCommentDelete = async () => {
    const commentID = comment._id;
    console.log('comment ki post =>', post.comments);
    const res = await deletingComment(comment._id);
    if (res.success) {
      posts.deleteComment(commentID, post);
      console.log('Comment Deleted successfully!');
    } else {
      console.log('Comment Not be deleted yet!');
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className="commentTopLeft">
        <span className="commentUsername">
          <Link
            className="link"
            to={`/user/${post.user._id}`}
            state={{
              user: post.user,
            }}
          >
            <div>
              <img
                className="commentProfileImg"
                src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                alt=""
              />
              <span className="commentTabLink">{comment.user.name}</span>
            </div>
          </Link>
        </span>
        <span className="commentDate">a minute ago</span>
      </div>

      {/* <div className={styles.postCommentContent}>{comment.content}</div> */}
      <div className="commentCenter">
        <span className="commentText">{comment.content}</span>
      </div>

      <div className="commentBottom">
        <div className="commentBottomLeft">
          <img
            className="commentLikeIcon"
            src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/like.png?raw=true"
            onClick={handleCommentLikeClick}
            alt=""
          />

          <span className="commentLikeCounter">{likes} people like it</span>
        </div>

        <div className="commentBottomRight">
          <img
            className="commentDeleteIcon"
            src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
            alt="comments-icon"
            onClick={handleCommentDelete}
          />
        </div>
      </div>

      {/* <div className="commentBottom">
        <span>
          <img
            className="likeIcon"
            src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/like.png?raw=true"
            onClick={handleCommentLikeClick}
            alt=""
          />
          <span>{likes} </span>
        </span>
        <button onClick={handleCommentDelete}>DELETE</button>
      </div> */}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;

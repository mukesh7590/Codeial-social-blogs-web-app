import PropTypes from 'prop-types';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import './comment.css';
import styles from '../../styles/home.module.css';
import { useState } from 'react';
import { deletingComment, toggleLike } from '../../api';
import { Button } from '@mui/material';
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
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <span className={styles.postCommentLikes}>22</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>

      <div className="commentBottom">
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

        {/* <span>
          <ReplyAllIcon /> <span>3</span>
        </span>
        <ReplyIcon /> */}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;

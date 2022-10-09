import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications';

import { createComment, toggleLike, fetchLikes } from '../../api';
import { usePosts } from '../../hooks';
import './post.css';
import styles from '../../styles/home.module.css';
import { MoreVert } from '@mui/icons-material';
import { Comment } from '../index';

const Post = ({ post }) => {
  const [commentToggle, setCommentToggle] = useState(false);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(post.likes.length);
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
        console.log('Comment NOT created yet!');
        // addToast(response.message, {
        //   appearance: 'error',
        // });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');
    setLikes(post.likes.length);
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

    // const response2 = await fetchLikes(post._id, 'POST');
  };

  return (
    <div className="post">
      <div className="postWrapper" key={`post-${post._id}`}>
        <div className="postTop">
          
          
          <div className="postTopLeft">
            <span className="postUsername">
              <Link className='link'
                to={`/user/${post.user._id}`}
                state={{
                  user: post.user,
                }}
              >
                <div>
                  <img
                    className="postProfileImg"
                    src="https://cdn-icons-png.flaticon.com/512/7669/7669149.png"
                    alt=""
                  />
                  <span className="tabLink">{post.user.name}</span>
                </div>
              </Link>
            </span>
            <span className="postDate">a minute ago</span>
          </div>








          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>




        <div className="postCenter">
          <span className="postText">{post.content}</span>
        </div>


        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/like.png?raw=true"
              onClick={handlePostLikeClick}
              alt=""
            />

            <span className="postLikeCounter">{likes} people like it</span>
          </div>

          <div className="postBottomRight">
            <img
              className="commentIcon"
              src="https://cdn-icons-png.flaticon.com/512/134/134808.png"
              alt="comments-icon"
            />
            <span
              className="postCommentText"
              onClick={() => setCommentToggle(!commentToggle)}
            >
              {post.comments.length} comments
            </span>
          </div>
        </div>

        <div className="postCommentBox">
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>
        {commentToggle ? (
          <div className="commentContainer">
            {post.comments.map((comment) => (
              <Comment
                comment={comment}
                post={post}
                key={`post-comment-${comment._id}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;

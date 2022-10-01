import { useState } from 'react';
import '../../styles/commonClass.css';

import { addPost } from '../../api';
import { usePosts } from '../../hooks';
import './createPost.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);

    const response = await addPost(post);

    if (response.success) {
      setPost('');
      // posts.addPostToState(response.data.post);
      console.log('Post created successfully');
      //   addToast('Post created successfully', {
      //     appearance: 'success',
      //   });
    } else {
      console.log('Post created NOT successfully');
      //   addToast(response.message, {
      //     appearance: 'error',
      //   });
    }
    setAddingPost(false);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="avatarImg"
            src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/person/1.jpeg?raw=true"
            alt=""
          />
          <textarea
            placeholder="What's in your mind ?"
            className="shareInput"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <button
            className="shareButton"
            onClick={handleAddPostClick}
            disabled={addingPost}
          >
            {addingPost ? 'Adding post...' : 'Add post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

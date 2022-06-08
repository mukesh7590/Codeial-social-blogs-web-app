import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    // do some checks
    const response = await addPost(post);

    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
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
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

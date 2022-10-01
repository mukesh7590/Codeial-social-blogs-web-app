import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  // console.log('body => ', body);
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  // console.log('token =====> ', token);
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // console.log(' customConfig.headers => ', customConfig.headers);
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  // console.log('Config => ', config);

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    // console.log('data =>    ', data.data);
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const getPosts = (page = 1, limit = 15) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const toggleLike = (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: 'POST',
  });
};

// FETCH LIKES - returning the empty array list so dont use this function
export const fetchLikes = (itemId, itemType) => {
  return customFetch(API_URLS.getLikes(itemId, itemType), {
    method: 'GET',
  });
};

export const createComment = async (content, postId) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id: postId,
      content,
    },
  });
};

// DELETE COMMENT
export const deletingComment = async (commentId) => {
  return customFetch(API_URLS.deleteComment(commentId), {
    method: 'DELETE',
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};

export const searchUsers = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: 'GET',
  });
};

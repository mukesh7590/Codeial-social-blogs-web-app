import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    // nkjnknknknk
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};

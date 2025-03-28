const fetchWithAuth = async (url, options = {}) => {
  // 默认配置，只需要设置 Content-Type
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    // 重要：添加 credentials 选项，确保请求会携带 cookies
    credentials: 'include'
  };

  // 合并选项
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await fetch(url, finalOptions);
    
    // 处理 401 未授权的情况
    if (response.status === 401) {
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
      return null;
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchWithAuth;
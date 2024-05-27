export const LoginUser = (data) => {
  return {
    url: 'api/user/login',
    method: 'POST',
    body: data,
  };
};

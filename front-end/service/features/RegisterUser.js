export const RegiterUser = (data) => {
  return {
    url: 'api/user/register',
    method: 'POST',
    body: data,
  };
};

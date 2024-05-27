export const createMood = (data) => {
  return {
    url: 'api/app/mood/create',
    method: 'POST',
    body: data,
  };
};

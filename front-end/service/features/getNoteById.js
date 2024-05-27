export const getNoteById = (id) => {
  return {
    url: `api/app/note/${id}`,
    method: 'GET',
  };
};

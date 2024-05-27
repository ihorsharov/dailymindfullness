export const deleteNote = (id) => {
  return {
    url: `api/app/notes/delete/${id}`,
    method: 'DELETE',
  };
};

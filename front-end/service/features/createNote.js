export const createNote = (data) => {
  return {
    url: 'api/app/add-note',
    method: 'POST',
    body: data,
  };
};

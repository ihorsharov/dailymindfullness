export const getWeeklyMoods = ({ startWeek, endWeek }) => {
  return {
    url: `api/app/mood/?start_date=${startWeek}&end_date=${endWeek}`,
    method: 'GET',
  };
};

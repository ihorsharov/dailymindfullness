export const getYearlyMoods = ({ startYear, endYear }) => {
  return {
    url: `api/app/mood-stats/?start_date=${startYear}&end_date=${endYear}`,
    method: 'GET',
  };
};

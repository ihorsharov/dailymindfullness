export const getMonthlyMoods = ({ startMonth, endMonth }) => {
  return {
    url: `api/app/mood-stats/?start_date=${startMonth}&end_date=${endMonth}`,
    method: 'GET',
  };
};

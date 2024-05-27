'use client';
import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import moment from 'moment';
import {
  useGetWeeklyMoodsQuery,
  useGetMonthlyMoodsQuery,
  useGetYearlyMoodsQuery,
} from '@/service/features/apiSlice';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const page = () => {
  moment.locale('uk');

  // chart with week

  let startOfWeek = moment().startOf('isoWeek');
  let startWeek = startOfWeek.format('YYYY-MM-DD');
  let endOfWeek = moment().endOf('isoWeek');
  let endWeek = endOfWeek.format('YYYY-MM-DD');
  const {
    data: moodsData,
    error: errorMoods,
    isLoading: isLoadingMoods,
  } = useGetWeeklyMoodsQuery({ startWeek, endWeek });
  if (errorMoods instanceof Error) {
    <div> Error : {errorMoods}</div>;
  }

  let dayNames = [];

  let currentDay = startOfWeek.clone();
  while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
    dayNames.push(currentDay.format('ddd'));
    currentDay.add(1, 'day');
  }

  // chart with month
  let startOfMonth = moment().startOf('month');
  let startMonth = startOfMonth.format('YYYY-MM-DD');
  let endOfMonth = moment().endOf('month');
  let endMonth = endOfMonth.format('YYYY-MM-DD');

  const {
    data: moodsMonthly,
    error: errorMonthly,
    isLoading: isLoadingMonthly,
  } = useGetMonthlyMoodsQuery({ startMonth, endMonth });

  const labelsMonthly = moodsMonthly?.map((item) => item.type_of_mood);
  const avgRatesMonthly = moodsMonthly?.map((item) => item.avg_rate);
  const colorsMonthly = moodsMonthly?.map((item) => item.color);

  let maxCountMood = moodsMonthly?.reduce((prev, current) =>
    prev.count > current.count ? prev : current
  );

  if (errorMonthly instanceof Error) {
    <div> Error : {errorMonthly}</div>;
  }

  // chart with year
  let startOfYear = moment().startOf('year');
  let startYear = startOfYear.format('YYYY-MM-DD');
  let endOfYear = moment().endOf('year');
  let endYear = endOfYear.format('YYYY-MM-DD');

  const {
    data: moodsYearly,
    error: errorYearly,
    isLoading: isLoadingYearly,
  } = useGetYearlyMoodsQuery({ startYear, endYear });

  if (errorYearly instanceof Error) {
    return <div>Error : {errorYearly}</div>;
  }
  let maxCountMoodYearly = moodsYearly?.reduce((prev, current) =>
    prev.count > current.count ? prev : current
  );
  const labelsYearly = moodsMonthly?.map((item) => item.type_of_mood);
  const avgRatesYearly = moodsMonthly?.map((item) => item.avg_rate);
  const colorsYearly = moodsMonthly?.map((item) => item.color);

  const dataBarRate = moodsData?.map((item) => item.rate);

  const backgroundColors = moodsData?.map((item) => item.color);

  const dataChartWeek = {
    labels: dayNames,
    datasets: [
      {
        label: '',
        data: dataBarRate,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const dataChartMonth = {
    labels: labelsMonthly,
    datasets: [
      {
        label: '',
        data: avgRatesMonthly,
        backgroundColor: colorsMonthly,
      },
    ],
  };
  const dataChartYear = {
    labels: labelsYearly,
    datasets: [
      {
        label: '',
        data: avgRatesYearly,
        backgroundColor: colorsYearly,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: '',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    spanGaps: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="flex justify-center">
      <div className="w-[80%] flex flex-col gap-[33px]">
        <div className="flex flex-row gap-[20px]">
          <div className="w-[100%] bg-[#EBF0F3] p-[32px] rounded-[40px]">
            <div className="flex flex-row justify-between items-center mb-[30px]">
              <h1 className="text-[24px] font-semibold">Статистика настрою</h1>
              <p className="text-[16px] font-normal bg-white rounded-[30px] p-[10px]">
                за тиждень
              </p>
            </div>
            {isLoadingMoods ? (
              <div className="flex justify-center items-center">Loading...</div>
            ) : (
              <>
                <Bar data={dataChartWeek} options={options}></Bar>
              </>
            )}
          </div>
          <div className="w-[100%] bg-[#EBF0F3] p-[32px] rounded-[40px]">
            <div className="flex flex-row justify-between items-center mb-[30px]">
              <h1 className="text-[24px] font-semibold">Статистика настрою</h1>
              <p className="text-[16px] font-normal bg-white rounded-[30px] p-[10px]">
                за місяць
              </p>
            </div>
            {isLoadingMonthly ? (
              <div>Loading....</div>
            ) : (
              <div className="flex flex-col justify-between">
                <div>
                  <Bar
                    className="h-[200px]"
                    data={dataChartMonth}
                    options={options}></Bar>
                </div>
                <div className="flex flex-row justify-center gap-[20px] ">
                  <h1 className="text-[16px] font-semibold flex flex-col gap-[10px]">
                    Найбільше емоцій типу:{' '}
                    <span
                      style={{ backgroundColor: maxCountMood?.color }}
                      className="rounded-[70px] py-[8px] px-[24px] text-center">
                      {maxCountMood?.type_of_mood}
                    </span>
                  </h1>
                  <h1 className="text-[16px] font-semibold flex flex-col gap-[10px]">
                    Середня інтенсивність емоцій:{' '}
                    <span
                      className="rounded-[70px] py-[8px] px-[24px] text-center"
                      style={{ backgroundColor: maxCountMood?.color }}>
                      {maxCountMood?.avg_rate}
                    </span>
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-[100%] bg-[#EBF0F3] p-[32px] rounded-[40px]">
          <div className="flex flex-row justify-between items-center mb-[30px]">
            <h1 className="text-[24px] font-semibold">Статистика настрою</h1>
            <p className="text-[16px] font-normal bg-white rounded-[30px] p-[10px]">
              за рік
            </p>
          </div>
          {isLoadingYearly ? (
            <div>Loading....</div>
          ) : (
            <div className="flex flex-row justify-between">
              <div>
                <Bar
                  className="h-[300px]"
                  data={dataChartYear}
                  options={options}></Bar>
              </div>
              <div className="flex flex-col justify-center gap-[30px] ">
                <h1 className="text-[24px] font-semibold">
                  Найбільше емоцій типу:{' '}
                  <span
                    className="rounded-[70px] py-[8px] px-[24px] ml-[5px] text-center"
                    style={{ backgroundColor: maxCountMoodYearly?.color }}>
                    {maxCountMoodYearly?.type_of_mood}
                  </span>
                </h1>
                <h1 className="text-[24px] font-semibold ">
                  Середня інтенсивність емоцій:
                  <span
                    className="rounded-[70px] py-[8px] px-[24px] ml-[5px] text-center"
                    style={{ backgroundColor: maxCountMoodYearly?.color }}>
                    {maxCountMoodYearly?.avg_rate}
                  </span>
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;

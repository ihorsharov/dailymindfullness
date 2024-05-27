'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import faceEmoji from '@/src/assets/emojis/GrinningFace.svg';
import meditation from '@/src/assets/emojis/Meditation.svg';
import openBook from '@/src/assets/emojis/OpenBook.svg';
import pencil from '@/src/assets/emojis/Pencil.svg';
import vector from '@/src/assets/other/arrow-up-right.svg';
import Sparkles from '@/src/assets/other/Sparkles.svg';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from "react-chartjs-2";
import { useGetAdviceQuery, useGetWeeklyMoodsQuery } from '@/service/features/apiSlice';
import moment from 'moment';


ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)





const HomePage = () => {

    moment.locale('uk');

    let startOfWeek = moment().startOf('isoWeek');
    let endOfWeek = moment().endOf('isoWeek');


    let dayNames = [];

    let currentDay = startOfWeek.clone();
    while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
        dayNames.push(currentDay.format('ddd'));
        currentDay.add(1, 'day');
    }


    let startWeek = startOfWeek.format('YYYY-MM-DD');
    let endWeek = endOfWeek.format('YYYY-MM-DD');



    const { data: moodsData, error: errorMoods, error: isLoadingMoods } = useGetWeeklyMoodsQuery({ startWeek, endWeek });
    const { data, error, isLoading } = useGetAdviceQuery();
    if (error instanceof Error) {
        <div> Error : {error}</div>
    }
    if (errorMoods instanceof Error) {
        <div> Error : {errorMoods}</div>
    }





    const dataBarRate = moodsData?.map(item => item.rate);
    const backgroundColors = moodsData?.map(item => item.color);

    const dataGraph1 = {
        labels: dayNames,
        datasets: [
            {
                label: '',
                data: dataBarRate,
                backgroundColor: backgroundColors,
            }
        ]
    }
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

    const Cards = [{
        id: 1,
        title: 'Додати настрій',
        emoji: faceEmoji,
        link: '/addMood',
        arrow: vector,
        BGcolor: 'bg-[#D6EEFF]'
    },
    {
        id: 2,
        title: 'Медитація',
        emoji: meditation,
        link: '/meditation',
        arrow: vector,
        BGcolor: 'bg-[#D6D2E9]'
    }, {
        id: 3,
        title: 'Навчання',
        emoji: openBook,
        link: '/studying',
        arrow: vector,
        BGcolor: 'bg-[#DAE9D2]'
    },
    {
        id: 4,
        title: 'Нотатки',
        emoji: pencil,
        link: '/notes',
        arrow: vector,
        BGcolor: 'bg-[#F9F4CC]'
    }];

    return (
        <div className=" flex flex-col justify-center items-center h-[100vh]">
            <div className=" flex flex-row gap-[15px]">
                {Cards.map((card) => (
                    <div className={` w-[295px] h-[295px] p-[20px] ${card.BGcolor} rounded-3xl flex flex-col justify-between`} key={card.id}>
                        <div className=''>
                            <h1 className='font'>{card.title}</h1>
                            <Image src={card.emoji} alt='emoji' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={card.link}>
                                <Image src={card.arrow} alt='arrow' />
                            </Link>
                        </div>
                    </div>
                ))
                }
            </div >
            <div className='flex flex-row gap-[15px] mt-[15px]'>
                <div className='max-w-[600px] bg-[#F2F1F6] rounded-3xl p-[20px] flex flex-col gap-[15px]'>
                    {isLoading ? (<div className='flex justify-center items-center'>Loading....</div>) :
                        (<>
                            <h1 className='text-2xl font-semibold'>Порада дня</h1>
                            <div className='flex flex-row items-center bg-white max-w-[340px] px-[18px] py-[8px]  justify-center rounded-full'>
                                <Image className="mr-[10px]" src={Sparkles} alt='Sparkles' />
                                <span className='text-lg font-[700]'>
                                    {data?.title}
                                </span>
                            </div>
                            <p className='font-normal text-base'>{data?.content}</p>
                        </>
                        )}
                </div>
                <div className='w-[600px] bg-[#F2F1F6] rounded-3xl p-[20px] flex flex-col gap-[34px]'>


                    <Link href={'/mood_statistics'} className=''>
                        <h1 className='text-2xl font-semibold'>Статистика настрою</h1>
                    </Link>
                    {isLoadingMoods ? (<div className='flex justify-center items-center'>Loading...</div>) : (
                        <>
                            <div>
                                <Bar data={dataGraph1} options={options}>
                                </Bar>
                            </div>
                        </>)}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

'use client'
import React, { useState } from 'react'
import headerImg from '@/src/assets/other/AddMoodHeader.png'
import Image from 'next/image'
import Link from 'next/link'
import { useCreateMoodMutation } from '@/service/features/apiSlice'
import { useRouter } from 'next/navigation'


const AddMood = () => {
    const [moodData, setMoodData] = useState({ type_of_mood: '', rate: '', date: '', color: '' })
    const [activeMoodId, setActiveMoodId] = useState(null);
    const [selectedBG, setSelectedBG] = useState('');
    const [selectedIntensity, setSelectedIntensity] = useState(null);



    const router = useRouter();

    const handleBackClick = (e) => {
        e.preventDefault();
        router.back();
    };

    const Mood = [
        {
            id: 1,
            title: 'Задоволення',
            descr: 'Насолода містить у собі як спокій, так і екстаз. Інтенсивність цих станів різна: Ми можемо відчувати м`який або сильний спокій, але можемо відчувати лише інтенсивний екстаз. Всі стани насолоди викликаються відчуттям зв`язку та/або чуттєвого задоволення.',
            bgColor: '#A9D992',
            intense: [{ id: 1, mood: 'Радість' }, { id: 2, mood: 'Полегшення' }, { id: 3, mood: 'Спокій' }, { id: 4, mood: 'Захоплення' }, { id: 5, mood: 'Екстаз' }]
        },
        {
            id: 2,
            title: 'Сум',
            descr: 'Сум містить у собі і розчарування, і відчай. Інтенсивність цих станів різна: Ми можемо відчувати легке або сильне розчарування, але можемо відчувати лише сильний відчай. Всі стани смутку викликаються відчуттям втрати.',
            bgColor: '#92CCD9',
            intense: [{ id: 1, mood: 'Розчарування' }, { id: 2, mood: 'Безпорадність' }, { id: 3, mood: 'Безнадійність' }, { id: 4, mood: 'Відчай' }, { id: 5, mood: 'Горе' }]
        },
        {
            id: 3,
            title: 'Злість',
            descr: 'Злість містить у собі і роздратування, і лють. Інтенсивність цих станів різна: Ми можемо відчувати легке або сильне роздратування, але можемо відчувати тільки сильну лють. Всі стани гніву викликаються відчуттям того, що нам заважають рухатися вперед.',
            bgColor: '#D99292',
            intense: [{ id: 1, mood: 'Розчарування' }, { id: 2, mood: 'Роздратування' }, { id: 3, mood: 'Образа' }, { id: 4, mood: 'Мстливість' }, { id: 5, mood: 'Лють' }]
        }, {
            id: 4,
            title: 'Страх',
            descr: 'Страх містить у собі і тривогу, і жах. Інтенсивність цих станів різна: Ми можемо відчувати легку або сильну тривогу, але можемо відчувати лише сильний жах. Усі стани страху викликаються відчуттям загрози шкоди.',
            bgColor: '#F6B536',
            intense: [{ id: 1, mood: 'Нервозність' }, { id: 2, mood: 'Страх' }, { id: 3, mood: 'Відчай' }, { id: 4, mood: 'Паніка' }, { id: 5, mood: 'Жах' }]
        }, {
            id: 5,
            title: 'Відраза',
            descr: 'Відраза містить у собі як неприязнь, так і огиду. Інтенсивність цих станів різна: Ми можемо відчувати легку або сильну неприязнь, але можемо відчувати лише сильну огиду. Всі стани відрази викликаються відчуттям того, що щось є токсичним.',
            bgColor: '#D9C992',
            intense: [{ id: 1, mood: 'Неприязнь' }, { id: 2, mood: 'Антипатія' }, { id: 3, mood: 'Огида' }, { id: 4, mood: 'Одраза' }, { id: 5, mood: 'Ненависть' }]
        },
    ]

    const [createMood] = useCreateMoodMutation();

    async function handleSubmit(e) {
        e.preventDefault();
        createMood(moodData)
            .unwrap()
            .then((res) => {
                console.log(res);
            });
        router.push('/Home');
    }

    const handleMoodClick = (id, bgColor, title) => {
        setActiveMoodId(activeMoodId === id ? null : id);
        setSelectedBG(bgColor);
        setMoodData({ ...moodData, type_of_mood: title, color: bgColor })
    }

    const handleIntensityClick = (intenseId) => {
        setSelectedIntensity(intenseId);
        setMoodData({ ...moodData, rate: intenseId })
    }

    return (
        <form onSubmit={handleSubmit}>
            <section className='flex justify-center'>
                <div className='flex flex-col  '>
                    <div className=''><Image className="w-[80vw]" src={headerImg} alt='HeaderImg' /></div>

                    <div className='w-[80vw] my-[30px] flex justify-start flex-col gap-3  '>
                        <div>
                            <h1 className='text-2xl font-semibold'>Оберіть тип емоції:</h1>
                            <ul className='flex flex-row gap-[10px]'>
                                {Mood.map((item) => (
                                    <li
                                        key={item.id}
                                        className={` text-xl font-medium py-[8px] px-[24px] rounded-full ${activeMoodId === item.id ? 'opacity-100 border-[2px] border-black' : 'opacity-50  '} cursor-pointer`}
                                        style={{ backgroundColor: item.bgColor }}
                                        onClick={() => handleMoodClick(item.id, item.bgColor, item.title)}

                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {activeMoodId !== null && (
                            <>
                                {activeMoodId === 1 && (
                                    <div className='max-w-[400px]'>
                                        <p className='text-base font-normal'>
                                            Насолода містить у собі як спокій, так і екстаз. Інтенсивність цих станів різна: Ми можемо відчувати м'який або сильний спокій, але можемо відчувати лише інтенсивний екстаз. Всі стани насолоди викликаються відчуттям зв'язку та/або чуттєвого задоволення.
                                        </p>
                                    </div>
                                )}

                                {activeMoodId === 2 && (
                                    <div className='max-w-[400px]'>
                                        <p className='text-base font-normal'>
                                            Сум містить у собі і розчарування, і відчай. Інтенсивність цих станів різна: Ми можемо відчувати легке або сильне розчарування, але можемо відчувати лише сильний відчай. Всі стани смутку викликаються відчуттям втрати.
                                        </p>
                                    </div>
                                )}

                                {activeMoodId === 3 && (
                                    <div className='max-w-[400px]'>
                                        <p className='text-base font-normal'>
                                            Злість містить у собі і роздратування, і лють. Інтенсивність цих станів різна: Ми можемо відчувати легке або сильне роздратування, але можемо відчувати тільки сильну лють. Всі стани гніву викликаються відчуттям того, що нам заважають рухатися вперед.
                                        </p>
                                    </div>
                                )}

                                {activeMoodId === 4 && (
                                    <div className='max-w-[400px]'>
                                        <p className='text-base font-normal'>
                                            Страх містить у собі і тривогу, і жах. Інтенсивність цих станів різна: Ми можемо відчувати легку або сильну тривогу, але можемо відчувати лише сильний жах. Усі стани страху викликаються відчуттям загрози шкоди.
                                        </p>
                                    </div>
                                )}

                                {activeMoodId === 5 && (
                                    <div className='max-w-[400px]'>
                                        <p className='text-base font-normal'>
                                            Відраза містить у собі як неприязнь, так і огиду. Інтенсивність цих станів різна: Ми можемо відчувати легку або сильну неприязнь, але можемо відчувати лише сильну огиду. Всі стани відрази викликаються відчуттям того, що щось є токсичним.
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <h2 className='text-2xl font-semibold'>Оберіть інтенсивність від от 1 до 5:</h2>
                                    <ul className='mt-2 flex flex-row gap-4'>
                                        {Mood.find(item => item.id === activeMoodId).intense.map((intenseItem) => (
                                            <li
                                                key={intenseItem.id}
                                                className={` px-4 py-2 border border-black rounded-full cursor-pointer `}
                                                onClick={() => handleIntensityClick(intenseItem.id)}
                                                style={{ backgroundColor: selectedIntensity === intenseItem.id ? selectedBG : 'transparent' }}
                                            >
                                                {intenseItem.id}-{intenseItem.mood}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        <div>

                        </div>

                        <div>
                            <h1 className='text-2xl font-semibold'>Дата заповнення:</h1>
                            <input className=" border border-black rounded-[10px] py-2 text-center w-[200px]" type="date" value={moodData.date} onChange={(e) => setMoodData({ ...moodData, date: e.target.value })} placeholder='Вкажіть дату' />
                        </div>

                        <div className='flex flex-row gap-2 text-center'>
                            <button type='submit' className='bg-[#00AFFF] text-white font-bold text-base w-[200px] px-4 py-2 rounded-lg'>Зберегти</button>

                            <button onClick={handleBackClick} className='text-base font-semibold border w-[200px] px-4 py-2 border-black rounded-lg'>Повернутися назад</button>
                        </div>
                    </div>
                </div>
            </section>
        </form >
    )
}

export default AddMood;
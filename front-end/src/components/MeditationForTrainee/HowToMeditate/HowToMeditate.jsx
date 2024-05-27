'use client'
import Image from 'next/image'
import React from 'react'
import howMeditate from '@/src/assets/meditationForTraineeImg/how-to-meditate.png'
import howMeditate2 from '@/src/assets/meditationForTraineeImg/how-to-meditate-2.png'
import { useRouter } from 'next/navigation';
import Link from 'next/link'




const HowToMeditate = () => {
    const router = useRouter();

    const handleBackClick = (e) => {
        e.preventDefault();
        router.back();
    };
    return (
        <div className=''>
            <h1 className='text-[32px] font-semibold mb-[15px]'>Як медитувати?</h1>
            <div className='flex flex-row items-center gap-[21px] mb-[50px]'>
                <div className='max-w-[600px]'>
                    <div className='flex flex-col gap-[16px]'>
                        <h1 className=' text-[24px] font-bold leading-[29.26px]'>Виберіть тихе місце, де вас не будуть<br /> відволікати</h1>
                        <p className='text-[20px] leading-[24.38px]'>Вимкніть телефон, телевізор та інші відволікаючі фактори. Якщо хочете увімкнути музику, виберіть що-небудь спокійне.</p>
                    </div>
                    <div className='flex flex-col gap-[26px] mb-[30px]'>
                        <h1 className=' text-[24px] font-bold'>Встановіть обмеження в часі</h1>
                        <p className='text-[20px] leading-[24.38px]'>Встановіть обмеження в часі. Поставте таймер. Для початку вам вистачить від 5 до 10 хвилин.</p>
                    </div>
                    <div className=' flex flex-col gap-[16px] mb-[20px]'>
                        <h1 className=' text-[24px] font-bold'>Створіть простір</h1>
                        <p className='text-[20px] leading-[24.38px]'>Крім вибору часу, вам також необхідно знайти місце<br />для практики. Воно не повинне мати якийсь<br /> особливий декор, але в ньому не має бути<br /> відволікаючих чинників.</p>
                    </div>
                    <div className=' flex flex-col gap-[26px]'>
                        <h1 className=' text-[24px] font-bold'>Встановіть обмеження в часі</h1>
                        <p className='text-[20px] leading-[24.38px]'>Встановіть обмеження в часі. Поставте таймер. Для початку вам вистачить від 5 до 10 хвилин.</p>
                    </div>
                </div>
                <div>
                    <Image src={howMeditate} alt='how-to-meditate' />
                </div>
            </div>
            <div className='flex flex-row items-center gap-[21px]'>
                <div>
                    <Image src={howMeditate2} alt='how-to-meditate-2' />
                </div>
                <div className='max-w-[600px] flex flex-col gap-[24px]'>
                    <div>
                        <h1 className='text-[24px] font-bold leading-[29.26px] mb-[16px]'>Зверніть увагу на своє тіло і влаштуйтеся зручніше</h1>
                        <p className='text-[20px] leading-[24.38px]'>
                            Ви можете сидіти, схрестивши ноги, на підлозі або на
                            стільці, якщо відчуваєте, що так буде зручно. Якщо ви не
                            можете сидіти на підлозі, це теж нормально. Знайдіть
                            стілець, на якому ви зможете сісти прямо, поставивши
                            обидві ноги на підлогу.
                        </p>
                    </div>
                    <div>
                        <h1 className='text-[24px] font-bold leading-[29.26px] mb-[16px]'>Зосередьтеся на своєму диханні</h1>
                        <p className='text-[20px] leading-[24.38px]'>
                            Спробуйте зробити глибокий вдих, а потім повільно
                            видихніть. Зверніть увагу на відчуття при кожному вдиху.
                            Коли ваш розум починає блукати, а це неминуче,
                            зверніть увагу на свої думки, а потім відпустіть їх.
                        </p>
                    </div>
                    <div>
                        <h1 className='text-[24px] font-bold leading-[29.26px] mb-[16px]'>Коли зазвучить ваш таймер, розплющіть очі</h1>
                        <p className='text-[20px] leading-[24.38px]'>
                            Проаналізуйте, як ви себе почуваєте після практики.
                            Якщо ви заклякли після сидіння, потягування може
                            допомогти вам розслабитися.</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-[16px] my-[40px] text-center'>
                <button
                    onClick={handleBackClick}
                    className="text-base font-semibold border  px-4 py-2 border-black rounded-lg">
                    Повернутися назад
                </button>
                <Link href={'/meditation'} className='bg-[#00AFFF] text-white font-bold text-base   px-4 py-2 rounded-lg'>Перейти до медитації</Link>
            </div>
        </div>
    )
}

export default HowToMeditate
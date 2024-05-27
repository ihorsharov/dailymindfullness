'use client'
import React from 'react';
import arrowRight from '@/src/assets/studyingImgs/arrow-right.svg';
import booksBG from '@/src/assets/studyingImgs/books.png';
import girlMeditate from '@/src/assets/studyingImgs/girlMeditate.png';
import sadSmile from '@/src/assets/studyingImgs/sadSmile.png';
import Link from 'next/link';
import Image from 'next/image';

const HeroPage = () => {
    const cards = [
        {
            id: 1,
            title: 'П`ять книг для ментального здоров`я',
            link: '/studying/5-books',
            arrow: arrowRight,
            bgImage: booksBG,
        },
        {
            id: 2,
            title: 'Медитація для початківців: техніки, з яких можна розпочати',
            link: '/studying/meditation-for-trainee',
            arrow: arrowRight,
            bgImage: girlMeditate,
        },
        {
            id: 3,
            title: '6 порад, як контролювати себе під час спалаху гніву',
            link: '/studying/6-advise-for-control',
            arrow: arrowRight,
            bgImage: sadSmile,
        },
    ]
    return (
        <section className='flex justify-center'>
            <div className='flex flex-row  gap-[20px] '>
                {cards.map((card) => (

                    <div key={card.id}
                        className='bg-cover bg-center w-[400px] h-[319px] p-[30px] rounded-[40px] flex flex-col justify-between'
                        style={{ backgroundImage: `url(${card.bgImage.src})` }}
                    >
                        <div>
                            <h1 className='text-3xl font-semibold text-white'>{card.title}</h1>
                        </div>
                        <div className='flex justify-end'>
                            <Link href={card.link}>
                                <Image src={card.arrow} alt='arrow' />
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    )
}

export default HeroPage
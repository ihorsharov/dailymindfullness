import Image from 'next/image'
import React from 'react'

import HeroImg from '@/src/assets/meditationForTraineeImg/HeroImg.png'

const Hero = () => {
    return (
        <div>
            <div>
                <h1 className='text-[48px] font-semibold leading-[58.51px]'>Медитація для початківців: техніки,<br /> з яких можна розпочати</h1>
            </div>
            <Image className='mt-[23px] mb-[50px]' src={HeroImg} alt='HeroImg' />
            <div>
                <p className='text-[19px] leading-[24.38px] mb-[24px]'>
                    Медитація – це потужний засіб для зняття і управління стресом і звичка, яка допоможе знайти душевний спокій.
                    Медитацію широко рекомендують як оздоровчу практику – і не дарма.
                </p>
                <div className=' text-[19px]'>
                    <p>Вона може допомогти:</p>
                    <ul className="list-disc ml-[30px] ">
                        <li>впоратися зі стресом,</li>
                        <li>полегшити головний біль,</li>
                        <li>при симптомах занепокоєння і депресії,</li>
                        <li>поліпшити самосвідомість,</li>
                        <li>відчути більше співчуття до себе та інших,</li>
                        <li>поліпшити уважність.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Hero
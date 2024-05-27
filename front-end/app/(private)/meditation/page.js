'use client';

import React, { useEffect, useRef, useState } from 'react';
import meditation_inspire from '../../../src/components/Audios/tile1_meditation_inspire.mp3';
import sleep_meditation from '../../../src/components/Audios/tile2_sleep_meditation.mp3';
import meditation_motivation from '../../../src/components/Audios/tile3_meditation_motivation.mp3';
import morning_meditation from '../../../src/components/Audios/tile4_morning_meditation.mp3';
import meditation_anxiety from '../../../src/components/Audios/tile5_meditation_anxiety .mp3';
import meditation_evening from '../../../src/components/Audios/tile6_meditation_evening.mp3';
import boy from '../../../src/assets/meditationImg/tile1.png';
import coala from '../../../src/assets/meditationImg/tile2.png';
import dreamBig from '../../../src/assets/meditationImg/tile3.png';
import grass from '../../../src/assets/meditationImg/tile4.png';
import dontPanic from '../../../src/assets/meditationImg/tile5.png';
import evening from '../../../src/assets/meditationImg/tile6.png';
import play from '../../../src/assets/meditationImg/play.svg';
import pause from '../../../src/assets/meditationImg/pause.svg';
import restart from '../../../src/assets/meditationImg/restart.svg';
import Image from 'next/image';

const page = () => {
  const [ID, setID] = useState(null);
  const audioList = [
    {
      id: 1,
      title: 'Медитація для натхнення',
      durationtime: '5 хвилин',
      url: new Audio(meditation_inspire),
      bg: boy.src,
    },
    {
      id: 2,
      title: 'Медитація для сну',
      durationtime: '15 хвилин',
      url: new Audio(sleep_meditation),
      bg: coala.src,
    },
    {
      id: 3,
      title: 'Медитація для мотивації',
      durationtime: '20 хвилин',
      url: new Audio(meditation_motivation),
      bg: dreamBig.src,
    },
    {
      id: 4,
      title: 'Ранкова медитація',
      url: new Audio(morning_meditation),
      durationtime: '8 хвилин',
      bg: grass.src,
    },
    {
      id: 5,
      title: 'Медитація для зменшення тривожності',
      url: new Audio(meditation_anxiety),
      durationtime: '12 хвилин',
      bg: dontPanic.src,
    },
    {
      id: 6,
      title: 'Вечірня медитація',
      url: new Audio(meditation_evening),
      durationtime: '20 хвилин',
      bg: evening.src,
    },
  ];
  return (
    <section className="flex flex-col justify-center">
      <div className="">
        <div className="flex justify-center">
          <h1>Медитація</h1>
        </div>
        <div className="flex justify-center gap-[20px] flex-wrap">
          {audioList.map((audio, index) => {
            return (
              <AudioComponents
                test={setID}
                currentActiveID={ID}
                key={audio.id}
                id={audio.id}
                title={audio.title}
                url={audio.url}
                durationtime={audio.durationtime}
                bg={audio.bg}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default page;

function AudioComponents({
  test,
  currentActiveID,
  id,
  title,
  url,
  durationtime,
  bg,
}) {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentAudio) {
      if (currentActiveID !== id) {
        currentAudio.pause();
      } else {
        currentAudio.currentTime = currentTime;
        currentAudio.play();
      }
    }
  }, [currentActiveID, id, currentAudio]);

  const playAudio = (url, id) => {
    test(id);
    if (audioRef.current) {
      setCurrentAudio(audioRef.current);
    }
    if (audioRef.current !== url) {
      const audioElement = url;
      setCurrentAudio(audioElement);
    }
  };

  const pauseAudio = (id, url) => {
    currentAudio.pause();
    setCurrentTime(currentAudio.currentTime);
  };

  const restartAudio = (id, url) => {
    currentAudio.currentTime = 0;
    currentAudio.play();
  };

  return (
    <div
      className="bg-cover bg-center w-full max-w-[400px] h-[295px] rounded-[40px] p-[20px]  flex flex-col justify-between"
      style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-col gap-3">
        <h2 className=" font-semibold text-2xl text-white">{title}</h2>
        <p className="text-white">{durationtime}</p>
      </div>
      <div className="flex flex-row justify-around">
        <button className="flex" onClick={() => playAudio(url, id)}>
          <Image src={play} alt="play"></Image>
        </button>
        <button className="flex" onClick={() => pauseAudio(id, url)}>
          <Image src={pause} alt="pause"></Image>
        </button>
        <button className="flex" onClick={() => restartAudio(id, url)}>
          <Image src={restart} alt="restart"></Image>
        </button>
      </div>
    </div>
  );
}

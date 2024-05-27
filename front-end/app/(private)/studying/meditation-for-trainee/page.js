import Hero from '@/src/components/MeditationForTrainee/Hero/Hero';
import HowToMeditate from '@/src/components/MeditationForTrainee/HowToMeditate/HowToMeditate';
import TypesOfMeditations from '@/src/components/MeditationForTrainee/TypesOfMeditations/TypesOfMeditations';
import React from 'react';

const page = () => {
  return (
    <section className="flex justify-center">
      <div className="w-[80%]">
        <Hero />
        <TypesOfMeditations />
        <HowToMeditate />
      </div>
    </section>
  );
};

export default page;

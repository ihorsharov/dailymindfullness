'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import { useGetNoteQuery } from '@/service/features/apiSlice';

import { useRouter } from 'next/navigation';

const noteDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading, error } = useGetNoteQuery(id);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error instanceof Error) {
    return <div>Error{error}</div>;
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <div className=" flex flex-col items-center">
      <button onClick={handleBackClick}>Go Back</button>
      <div className=" p-[20px]   bg-[#D6EEFF] rounded-[40px] flex flex-col justify-center  gap-[40px] ">
        <div className="flex flex-row  justify-around items-center">
          <p className="text-[18px] font-semibold">{data.date}</p>
          <p className="bg-white text-[#1E1E1E] text-[20px] font-medium px-[24px] py-[8px] rounded-[70px]">
            {data.category}
          </p>
        </div>
        <div className=" flex flex-col items-center">
          <p className="text-center font-[500] text-[20px]">{data.topic}</p>
          <p className="font-[500] max-w-[600px] text-[20px]">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default noteDetail;

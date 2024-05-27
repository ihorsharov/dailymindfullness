'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useCreateNoteMutation } from '@/service/features/apiSlice';
import { useRouter } from 'next/navigation';

const newNote = () => {
  const [noteData, setNoteData] = useState({
    date: '',
    topic: '',
    category: '',
    content: '',
  });
  const route = useRouter();
  const [createNote] = useCreateNoteMutation();

  const handleBackClick = (e) => {
    e.preventDefault();
    route.back();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    createNote(noteData)
      .unwrap()
      .then((res) => {
        console.log(res);
      });
    route.back();
  }
  return (
    <form onSubmit={handleSubmit}>
      <section className="flex justify-center">
        <div className="w-[80%] flex flex-col">
          <div className="flex flex-row  items-center gap-[88px] mb-[32px]">
            <div className="">
              <h1 className="text-[24px] font-semibold">Дата заповнення:</h1>
              <input
                className=" border border-black rounded-[10px] py-2 text-center w-[200px]"
                type="date"
                required
                value={noteData.date}
                onChange={(e) =>
                  setNoteData({ ...noteData, date: e.target.value })
                }
                placeholder="Вкажіть дату"
              />
            </div>
            <div>
              <h1 className="text-[24px] font-semibold">Категорія запису:</h1>
              <select
                value={noteData.category}
                onChange={(e) =>
                  setNoteData({ ...noteData, category: e.target.value })
                }
                required
                placeholder="Вкажіть тему:"
                className="border border-black rounded-[10px] py-3 text-center w-[200px]">
                <option>Вкажіть тему:</option>
                <option value="мрії">мрії</option>
                <option value="робота">робота</option>
                <option value="плани">плани</option>
                <option value="хобі">хобі</option>
                <option value="важлива подія">важлива подія</option>
                <option value="подорож">подорож</option>
              </select>
            </div>
          </div>
          <div className="mb-[32px]">
            <h1 className="text-[24px] font-semibold ">Тема:</h1>
            <input
              value={noteData.topic}
              onChange={(e) =>
                setNoteData({ ...noteData, topic: e.target.value })
              }
              required
              className="border border-black rounded-[10px] py-2 w-[400px] flex items-center text-center"
              placeholder="Думки під час прогулянки"
            />
          </div>
          <div>
            <h1 className="text-[24px] font-semibold">Текст запису:</h1>
            <textarea
              value={noteData.content}
              onChange={(e) =>
                setNoteData({ ...noteData, content: e.target.value })
              }
              required
              className="border border-black rounded-[10px]"
              rows="15"
              cols="80"
            />
          </div>
          <div className="flex flex-row gap-2 text-center">
            <button
              type="submit"
              className="bg-[#00AFFF] text-white font-bold text-base w-[200px] px-4 py-2 rounded-lg">
              Зберегти
            </button>

            <button
              onClick={handleBackClick}
              className="text-base font-semibold border w-[200px] px-4 py-2 border-black rounded-lg">
              Повернутися назад
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default newNote;

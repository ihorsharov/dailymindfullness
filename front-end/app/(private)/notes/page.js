'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import plus from '@/src/assets/notesImg/plus.svg';
import Link from 'next/link';
import trash from '@/src/assets/notesImg/trash.svg';
import {
  useDeleteNoteMutation,
  useGetAllNotesQuery,
} from '@/service/features/apiSlice';

const page = () => {
  const [notes, setNotes] = useState([]);
  const { data, isLoading, error } = useGetAllNotesQuery();
  const [deleteNoteByID] = useDeleteNoteMutation();
  useEffect(() => {
    if (data) {
      setNotes(data);
    }
  }, [data]);

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  async function deleteNote(id) {
    try {
      await deleteNoteByID(id).unwrap();
      setNotes(notes.filter((note) => note.id !== id)); 
      console.log('Note deleted successfully');
      alert('Нотатка видалена успішно!');
    } catch (error) {
      console.error('Failed to delete the note:', error);
    }
  }

  return (
    <section className="flex justify-center">
      <div className="w-[80%]">
        <div className="flex flex-row gap-[20px] flex-wrap justify-center">
          <Link
            href={'/notes/addNote'}
            className="w-[320px] h-[160px] bg-[#D6EEFF] rounded-[40px] flex flex-row justify-center items-center ">
            <h1 className="text-[24px] font-medium">
              Додати
              <br /> новий запис
            </h1>
            <Image src={plus} alt="plus" />
          </Link>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            notes?.map((note, index) => (
              <div
                key={index}
                className="w-[320px] h-[160px] bg-[#D6EEFF] rounded-[40px] flex flex-col justify-center gap-[40px] px-[10px] ">
                <div className="flex flex-row  gap-[15px] px-[15px] items-center justify-between">
                  <p className=" text-[16px] font-semibold">{note.date}</p>
                  <p className="bg-white text-[#1E1E1E] text-[18px] font-medium px-[24px] py-[8px] rounded-[70px]">
                    {note.category}
                  </p>
                  <button onClick={() => deleteNote(note.id)}>
                    <Image src={trash} alt="trachBTN" />
                  </button>
                </div>
                <Link href={`/notes/${note.id}`}>
                  <div className="text-center font-[500] text-[20px]">
                    <p>{note.topic}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default page;

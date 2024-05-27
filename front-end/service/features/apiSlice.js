import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RegiterUser } from './RegisterUser';
import { LoginUser } from './LoginUser';
import { getAdvice } from './getAdvice';
import { createNote } from './createNote';
import { getAllNotes } from './getAllNotes';
import { createMood } from './createMood';
import { getAllMoods } from './getAllMoods';
import { getNoteById } from './getNoteById';
import { getWeeklyMoods } from './getWeeklyMoods';
import { getYearlyMoods } from './getYearlyMoods';
import { getMonthlyMoods } from './getMonthlyMoods';
import { deleteNote } from './deleteNote';

export const apiData = createApi({
  reducerPath: 'apiData',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ['Notes', 'Moods'],
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => RegiterUser(data),
    }),
    userLogin: builder.mutation({
      query: (data) => LoginUser(data),
    }),
    createNote: builder.mutation({
      query: (data) => createNote(data),
      invalidatesTags: ['Notes'],
    }),
    createMood: builder.mutation({
      query: (data) => createMood(data),
      invalidatesTags: ['Moods'],
    }),
    deleteNote: builder.mutation({
      query: (id) => deleteNote(id),
      invalidatesTags: ['Notes'],
    }),
    getAdvice: builder.query({
      query: getAdvice,
    }),
    getNote: builder.query({
      query: (id) => getNoteById(id),
    }),
    getAllNotes: builder.query({
      query: getAllNotes,
      providesTags: ['Notes'],
    }),
    getAllMoods: builder.query({
      query: getAllMoods,
      providesTags: ['Moods'],
    }),
    getWeeklyMoods: builder.query({
      query: ({ startWeek, endWeek }) => getWeeklyMoods({ startWeek, endWeek }),
      providesTags: ['Moods'],
    }),
    getMonthlyMoods: builder.query({
      query: ({ startMonth, endMonth }) =>
        getMonthlyMoods({ startMonth, endMonth }),
      providesTags: ['Moods'],
    }),
    getYearlyMoods: builder.query({
      query: ({ startYear, endYear }) => getYearlyMoods({ startYear, endYear }),
      providesTags: ['Moods'],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useCreateNoteMutation,
  useCreateMoodMutation,
  useDeleteNoteMutation,
  useGetAllNotesQuery,
  useGetAdviceQuery,
  useGetAllMoodsQuery,
  useGetNoteQuery,
  useGetWeeklyMoodsQuery,
  useGetMonthlyMoodsQuery,
  useGetYearlyMoodsQuery,
} = apiData;

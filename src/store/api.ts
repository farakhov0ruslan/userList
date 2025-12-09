import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, CreateUserDto, UpdateUserDto } from '../types/user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com'
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<User, CreateUserDto>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              draft.unshift(createdUser);
            })
          );
        } catch {}
      },
    }),
    updateUser: builder.mutation<User, UpdateUserDto>({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      async onQueryStarted({ id, ...userData }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              const index = draft.findIndex((user) => user.id === id);
              if (index !== -1) {
                draft[index] = updatedUser;
              }
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation
} = usersApi;

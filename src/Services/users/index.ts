import { API } from "../base";

export interface User {
    id?: number,
    // username: string,
    password: string,
    email: string,
    name: string
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `Users/${id}`,
    }),
    getAllUsers: build.query<User[], void>({
      query: () => `Users`,
    }),
    getUserByEmail: build.query<User[], string>({
      query: (email) => `Users?email=${email}`
    }),
    addUser: build.mutation<User, User>({
      query: user => ({
        url: '/Users/new',
        method: 'POST',
        body: user
      })
    })
  }),
  overrideExisting: true,
});

export const { 
  useLazyGetUserQuery,
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useAddUserMutation
} = userApi;

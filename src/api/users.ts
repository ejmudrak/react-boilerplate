import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client, Resource } from 'api';

/*
Endpoint: /users
Methods: fetch, create, delete

Leverages test API endpoints via https://reqres.in/
*/

// Fetches data from the server
export const useUsersQuery = () => {
  const params = {};

  /* useQuery params:
   1) A unique key: we're using an array with both a string and the query parameters
   2) A function that returns a promise, either:
    a) resolving the data
    b) throwing an error
  */
  return useQuery<[], Error>([Resource.Users, params], () =>
    // The returned payload from this test API has a nested `data` key
    client.get(Resource.Users, { params }).then(({ data: resultData }: any) => {
      return resultData.data;
    })
  );
};

// export const useCreateUsersMutation = () => {
//   const queryClient = useQueryClient();
//   const params = {};
//   return useMutation<{ data: [] }, Error>(
//     ({ first_name, last_name, email, avatar }: any) =>
//       client
//         .post(
//           Resource.Users,
//           { first_name, last_name, email, avatar },
//           { params }
//         )
//         .then(({ data }: any) => data),
//     {
//       onSuccess: (result) => {
//         queryClient.setQueryData([Resource.Users, params], result);
//       },
//     }
//   );
// };

// export const useDeleteUsersMutation = (id: number) => {
//   const queryClient = useQueryClient();
//   const params = { id };
//   return useMutation<{ data: [] }, Error>(
//     () =>
//       client.delete(Resource.Users, { params }).then(({ data }: any) => data),
//     {
//       onSuccess: () => {
//         queryClient.setQueryData([Resource.Users, params], { data: null });
//       },
//     }
//   );
// };

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
  return useQuery<User[], Error>([Resource.Users, params], () =>
    // The returned payload from this test API has a nested `data` key
    client.get(Resource.Users, { params }).then(({ data: resultData }: any) => {
      return resultData.data;
    })
  );
};

interface NewUser {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

interface CreateUserPayload {
  name: string;
  job: string;
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const params = {};

  // We add `CreateUserPayload` to the return types of useMutation so that we can use it on the `mutationFn`
  return useMutation<NewUser, Error, CreateUserPayload>(
    (newData: CreateUserPayload) =>
      client
        .post(Resource.Users, newData, { params })
        .then(({ data }: any) => data),
    {
      onSuccess: (result) => {
        const previousData =
          queryClient.getQueryData<User[]>([Resource.Users, params]) || [];

        // This test API kinda stinks, let's format the data for consistency
        const first_name = result.name.split(' ')[0];
        const last_name = result.name.split(' ')[1];

        const newFormattedData = [
          {
            id: result.id,
            first_name,
            last_name,
            email: '',
            avatar: '',
          },
        ];

        // We use the existing, cached data to add the new user
        queryClient.setQueryData(
          [Resource.Users, params],
          [...previousData, ...newFormattedData]
        );
      },
    }
  );
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const params = {};

  // We add `number` to the return types of useMutation so that we can use it on the `mutationFn`
  return useMutation<{}, Error, number>(
    (id: number) =>
      client
        .delete(Resource.Users, { params: { ...params, id } })
        .then(() => id), // return the id that we deleted
    {
      // We use the existing, cached data to remove the id that has been deleted
      onSuccess: (_, id) => {
        const previousData =
          queryClient.getQueryData<User[]>([Resource.Users, params]) || [];

        queryClient.setQueryData(
          [Resource.Users, params],
          previousData.filter((u) => u.id !== id)
        );
      },
    }
  );
};

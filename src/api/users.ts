import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client, Resource } from 'api';

export const useUsersQuery = () => {
  const params = {};
  return useQuery<{ data: [] }, Error>(
    [Resource.Users, params],
    () => client.get(Resource.Users, { params }).then(({ data }: any) => data)
  );
};

export const useCreateUsersMutation = () => {
  const queryClient = useQueryClient();
  const params = {};
  return useMutation<{ data: [] }, Error>(
    () =>
      client.post(Resource.Users, null, { params }).then(({ data }: any) => data),
    {
      onSuccess: result => {
        queryClient.setQueryData([Resource.Users, params], result);
      },
    }
  );
};

export const useDeleteUsersMutation = () => {
  const queryClient = useQueryClient();
  const params = {};
  return useMutation<{ data: [] }, Error>(
    () => client.delete(Resource.Users, { params }).then(({ data }: any) => data),
    {
      onSuccess: () => {
        queryClient.setQueryData([Resource.Users, params], { data: null });
      },
    }
  );
};

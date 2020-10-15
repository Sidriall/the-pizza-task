import useSWR from 'swr';
import fetcher from 'lib/fetch';

export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

/*
export function useUser(id: string) {
  const { data } = useSWR(`/api/users/${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return data?.user;
}
 */

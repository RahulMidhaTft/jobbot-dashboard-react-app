import { useQuery } from "react-query";

export const useAxiosQuery = (queryKey, queryFn, queryConfig = {}) => {
  const res = useQuery(
    queryKey,
    async () => {
      const res = await queryFn(queryKey[1]);
      return {
        data: res.data,
        headers: res.headers,
      };
    },
    {
      onError: (err) => {
        console.error(err);
      },
      ...queryConfig,
    }
  );

  return {
    ...res,
    data: res.data?.data,
    headers: res.data?.headers,
  };
};

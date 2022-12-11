import { useMutation } from "react-query";

export const useAxiosMutation = (mutationFn, mutationConfig = {}) =>
  useMutation(mutationFn, {
    onError: (err) => {
      console.log(err);
    },
    ...mutationConfig,
  });

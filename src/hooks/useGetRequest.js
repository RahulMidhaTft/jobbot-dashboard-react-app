import { useEffect, useState } from "react";
import axios from "../api/axios";

const useGetRequest = (endpoint) => {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getDashboardData = async () => {
      try {
        const response = await axios.get(endpoint, {
          signal: controller.signal,
        });
        isMounted && setResponseData(response.data);
      } catch (error) {
        console.log("Error from useGetRequest");
        console.log(error);
      }
    };

    getDashboardData().then(() => {
      setIsLoading(false);
    });

    return () => {
      setIsLoading(true);
      isMounted = false;
      controller.abort();
    };
  }, [endpoint]);

  return { isLoading, responseData };
};

export default useGetRequest;

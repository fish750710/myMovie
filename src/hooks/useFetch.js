import { useState, useEffect, useRef, useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, option) => {
    setIsLoading(true);
    try {
      return await fetch(url, option).then((res) => res.json());
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {}, []);

  return { sendRequest, isLoading, error };
};

export default useFetch;

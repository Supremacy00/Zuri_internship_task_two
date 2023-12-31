import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could Not Fetch The Data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data.results);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }, 1000);
   
  }, [url]);

  return { data, isLoading, error};
};

export default useFetch;

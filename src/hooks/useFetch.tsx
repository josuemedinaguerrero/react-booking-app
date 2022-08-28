import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url: string) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<boolean>(false);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         try {
            const res = await axios.get(url);
            setData(res.data);
         } catch (error) {
            setError(true);
         }
         setLoading(false);
      };
      fetchData();
   }, [url]);

   const reFetch = async () => {
      setLoading(true);
      try {
         const res = await axios.get(url);
         setData(res.data);
      } catch (error) {
         setError(true);
      }
      setLoading(false);
   };

   return { data, loading, error, reFetch };
};

export default useFetch;

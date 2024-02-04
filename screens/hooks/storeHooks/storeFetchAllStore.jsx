import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAllStores = async () => {
  try {
    const res = await axios.get('https://silent257-001-site1.etempurl.com/api/Stores/GetAll');
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const useFetchAllStores = () => {
  const storeFetch = useQuery(['allStores'], fetchAllStores);
  const { data: stores, isLoading } = storeFetch;
  return {
    stores,
    isLoading,
  };
};


export { useFetchAllStores };

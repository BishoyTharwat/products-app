import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from '../services/productsApi';

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
};

export const useProductsQuery = ({ searchTerm, selectedCategory, page, limit, skip, token }) => {
  return useQuery({
    queryKey: ['products', searchTerm, selectedCategory, page],
    queryFn: () => fetchProducts({ searchTerm, selectedCategory, limit, skip, token }),
    keepPreviousData: true,
    staleTime: 5000
  });
};
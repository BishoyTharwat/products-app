import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../services/productsApi';

export const useProduct = (productId, token) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId, token),
    enabled: !!productId && !!token,
  });
};

const BASE_URL = 'https://dummyjson.com';

export const fetchProductById = async (productId, token) => {
  const res = await fetch(`${BASE_URL}/auth/products/${productId}`, {
    headers: { 
      'Authorization': `Bearer ${token}` 
    }
  });

  if (!res.ok) {
    throw new Error('Could not recover product definition data parameters');
  }

  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/category-list`);
  return res.json();
};

export const fetchProducts = async ({ searchTerm, selectedCategory, limit, skip, token }) => {
  let url = `${BASE_URL}/auth/products?limit=${limit}&skip=${skip}`;
  
  if (searchTerm) {
    url = `${BASE_URL}/auth/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;
  } else if (selectedCategory) {
    url = `${BASE_URL}/auth/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch data source metrics');
  return res.json();
};
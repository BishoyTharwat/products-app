import { useCategoriesQuery, useProductsQuery } from '../hooks/useProducts';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function ProductList({ 
    onSelectProduct, 
    token,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage 
}) {
 
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Fetch Categories List
  const { data: categories } = useCategoriesQuery();

  // Query configuration 
  const { data, isLoading, error } = useProductsQuery({
    searchTerm,
    selectedCategory,
    page,
    limit: ITEMS_PER_PAGE,
    skip,
    token
  });

  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (error) return (
    <div className="text-center py-12 text-red-600 bg-red-50 rounded-lg p-6 max-w-lg mx-auto mt-8">
      Error: {error.message}.
      <br />
      Log In using the demo credentials to access the product catalogue and detailed views.
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setSelectedCategory(''); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="relative min-w-50">
          <SlidersHorizontal className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setSearchTerm(''); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading States */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-xl p-4 h-80 border border-gray-100" />
          ))}
        </div>
      ) : (
        <>
          {/* Main Grid Render */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.products?.map((product) => (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col group"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">{product.title}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md font-medium">★ {product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm mt-6">
              <button
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
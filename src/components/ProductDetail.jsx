import { useProduct } from '../hooks/useProduct';
import { ArrowLeft, ShoppingBag, ShieldCheck, RefreshCw } from 'lucide-react';

export default function ProductDetail({ productId, onBack, token }) {
  const { data: product, isLoading, error } = useProduct(productId, token);

  if (isLoading) {
    return <div className="text-center py-24 animate-pulse text-indigo-600 font-medium">Loading product item metrics...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-12 text-red-500">Error rendering detailed interface data parameters.</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-5xl mx-auto">
      <div className="p-4 border-b border-gray-100">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to product catalogue
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="w-full h-full object-contain" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((img, idx) => (
              <div key={idx} className="aspect-square bg-gray-50 border rounded-lg overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <span className="px-2.5 py-1 text-xs font-semibold tracking-wide uppercase text-indigo-700 bg-indigo-50 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-sm text-gray-500">Brand: <span className="font-medium text-gray-800">{product.brand || 'Generic'}</span> | SKU: {product.sku}</p>
            
            <div className="flex items-center gap-4 py-2">
              <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
              {product.discountPercentage && (
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <hr className="border-gray-100" />
            <h3 className="font-semibold text-gray-800 text-sm">Product Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-8 space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>{product.warrantyInformation || 'Standard verification guidelines apply'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <RefreshCw className="h-4 w-4 text-blue-600" />
              <span>{product.returnPolicy || '30 days structural policy safety returns'}</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors">
              <ShoppingBag className="h-5 w-5" /> Add item to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
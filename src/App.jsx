import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { LogOut, LayoutGrid } from 'lucide-react';

// Caching Configuration (5 minutes)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function DashboardContent() {
  const { user, token, logout } = useAuth();
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedProductId(null); setSearchTerm(''); setSelectedCategory(''); setPage(1); }}>
              <LayoutGrid className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">Products Store</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-gray-400">{user?.email}</span>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProductId ? (
          <ProductDetail 
            productId={selectedProductId} 
            token={token}
            onBack={() => setSelectedProductId(null)} 
          />
        ) : (
          <ProductList 
            token={token}
            onSelectProduct={(id) => setSelectedProductId(id)} 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            page={page}
            setPage={setPage}
          />
        )}
      </main>
    </div>
  );
}

function MainAppLayout() {
  const { token, loading } = useAuth();
  const [authView, setAuthView] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (token) {
    return <DashboardContent />;
  }

  return authView === 'login' ? (
    <Login onSwitchToRegister={() => setAuthView('register')} />
  ) : (
    <Register onSwitchToLogin={() => setAuthView('login')} />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainAppLayout />
      </AuthProvider>
    </QueryClientProvider>
  );
}
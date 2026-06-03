// src/pages/AdminPage.jsx
import { useEffect, useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import AdminContactsTab from './AdminContactsTab';
import AdminProductsTab from './AdminProductsTab';
import AdminCategoriesTab from './AdminCategoriesTab';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // State quản lý tab
  const [activeTab, setActiveTab] = useState('contacts');

  // Lắng nghe trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (err) {
      setError('Email hoặc mật khẩu không chính xác!');
      console.error(err);
    }
  };

  // Loading hiển thị cho việc lấy trạng thái user
  if (authLoading) {
      return (
        <div className="flex justify-center items-center py-20 min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
        </div>
      );
  }

  // View: Trang Đăng Nhập
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          
          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-bold text-[#1a365d] mb-2 uppercase tracking-wide">Quản Trị Viên</h1>
            <p className="text-gray-500">Vui lòng đăng nhập bằng Email Admin</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email đăng nhập</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-gray-50 focus:bg-white"
                placeholder="Nhập email..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-gray-50 focus:bg-white"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-[#1a365d] hover:bg-[#1a365d]/90 text-white font-bold py-3 mt-4 px-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
    );
  }

  // View: Dashboard sau khi đăng nhập
  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#1a365d] uppercase tracking-wide border-l-4 border-amber-500 pl-4">
            Bảng Điều Khiển
        </h1>
        <button 
          onClick={async () => {
              await signOut(auth);
              setEmail('');
              setPassword('');
          }}
          className="text-red-500 hover:text-white font-medium px-6 py-2 hover:bg-red-500 rounded-full shadow-sm border border-red-200 transition-all w-max border-opacity-50"
        >
          Đăng xuất
        </button>
      </div>

      {/* Điều hướng Tabs */}
      <div className="flex gap-2 sm:gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        <button 
           onClick={() => setActiveTab('contacts')} 
           className={`pb-3 px-2 sm:px-4 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${activeTab === 'contacts' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500 hover:text-amber-500'}`}
        >
           Khách Hàng Liên Hệ
        </button>
        <button 
           onClick={() => setActiveTab('products')} 
           className={`pb-3 px-2 sm:px-4 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${activeTab === 'products' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500 hover:text-amber-500'}`}
        >
           Quản Lý Sản Phẩm
        </button>
        <button 
           onClick={() => setActiveTab('categories')} 
           className={`pb-3 px-2 sm:px-4 text-sm sm:text-base font-bold transition-all whitespace-nowrap ${activeTab === 'categories' ? 'text-amber-600 border-b-2 border-amber-500' : 'text-gray-500 hover:text-amber-500'}`}
        >
           Danh Mục
        </button>
      </div>

      {/* Hiển thị Tab tương ứng */}
      {activeTab === 'contacts' && <AdminContactsTab />}
      {activeTab === 'products' && <AdminProductsTab />}
      {activeTab === 'categories' && <AdminCategoriesTab />}
      
    </div>
  );
}
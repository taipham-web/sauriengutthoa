// src/App.jsx
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import Pages
import Home from './pages/Home'; 
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/Product/ProductsPage';
import ProductDetails from './pages/Product/ProductDetailsPage';
import HandbookPage from './pages/Handbook/HandbookPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/Admin/AdminPage';

// Import Handbook Sub-pages
import PreservationGuidePage from './pages/Handbook/PreservationGuidePage';
import NutritionGuidePage from './pages/Handbook/NutritionGuidePage';
import CulinaryGuidePage from './pages/Handbook/CulinaryGuidePage';
import SelectionGuidePage from './pages/Handbook/SelectionGuidePage';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/ScrollToTop';
// import SEO from './components/SEO'; // Bạn đã import nhưng chưa dùng, mình tạm comment lại

// ----------------------------------------------------------------------
// 1. TẠO KHUNG GIAO DIỆN KHÁCH HÀNG (Có Header, Footer)
// ----------------------------------------------------------------------
const ClientLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Các trang như Home, About, Product sẽ hiển thị ở đây */}
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
};

// ----------------------------------------------------------------------
// 2. TẠO TRANG LỖI 404 (Bẫy những kẻ rình mò gõ sai link)
// ----------------------------------------------------------------------
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-7xl font-black text-green-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Trang bạn tìm kiếm không tồn tại hoặc đã bị ẩn.</p>
      <a href="/" className="px-6 py-3 bg-green-800 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
        Quay về Trang chủ
      </a>
    </div>
  );
};

// ----------------------------------------------------------------------
// COMPONENT CHÍNH
// ----------------------------------------------------------------------
function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-20 md:pb-0 relative animate-fade-in transition-opacity duration-1000 opacity-100">
      <ScrollToTop />
      
      <Routes>
        {/* ========================================== */}
        {/* LUỒNG 1: DÀNH CHO KHÁCH HÀNG (Dùng ClientLayout) */}
        {/* ========================================== */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/san-pham/:id" element={<ProductDetails />} />
          <Route path="/cam-nang" element={<HandbookPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          
          {/* Kiến thức */}
          <Route path="/kien-thuc/bao-quan-sau-rieng" element={<PreservationGuidePage />} />
          <Route path="/kien-thuc/dinh-duong-sau-rieng" element={<NutritionGuidePage />} />
          <Route path="/kien-thuc/am-thuc-sau-rieng" element={<CulinaryGuidePage />} />
          <Route path="/kien-thuc/chon-sau-rieng" element={<SelectionGuidePage />} />

          {/* BẪY 404: Bắt tất cả các link khách gõ bậy (Ví dụ: /admin, /login) */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ========================================== */}
        {/* LUỒNG 2: DÀNH CHO ADMIN (Tuyệt mật) */}
        {/* ========================================== */}
        {/* - Đã thay đổi đường dẫn từ "/admin" thành "/he-thong-kho-ut-thoa-2026"
          - Thêm /* ở đuôi để AdminPage có thể điều hướng các trang con bên trong
          - Không bọc trong ClientLayout, nên Admin sẽ có toàn quyền dùng thiết kế riêng 
        */}
        <Route path="/quan-ly-kho-2026/*" element={<AdminPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
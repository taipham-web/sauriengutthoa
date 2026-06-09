// src/App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Import Components (giữ import đồng bộ — nhẹ, render ngay)
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/ScrollToTop';

// ── PERF-03: Route-based Code Splitting ────────────────────────────────────────
// Dùng React.lazy để tách bundle — mỗi trang chỉ tải khi cần
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/Product/ProductsPage'));
const ProductDetails = lazy(() => import('./pages/Product/ProductDetailsPage'));
const HandbookPage = lazy(() => import('./pages/Handbook/HandbookPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/Admin/AdminPage'));

// Handbook Sub-pages
const PreservationGuidePage = lazy(() => import('./pages/Handbook/PreservationGuidePage'));
const NutritionGuidePage = lazy(() => import('./pages/Handbook/NutritionGuidePage'));
const CulinaryGuidePage = lazy(() => import('./pages/Handbook/CulinaryGuidePage'));
const SelectionGuidePage = lazy(() => import('./pages/Handbook/SelectionGuidePage'));

// ── SEC-01: Admin path từ biến môi trường (không hardcode) ────────────────────
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || 'dashboard';

// ── Loading spinner dùng chung cho Suspense ───────────────────────────────────
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]" aria-label="Đang tải trang">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
  </div>
);

// ----------------------------------------------------------------------
// 1. KHUNG GIAO DIỆN KHÁCH HÀNG (Có Header, Footer)
// ----------------------------------------------------------------------
const ClientLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
};

// ----------------------------------------------------------------------
// 2. TRANG LỖI 404 (Bẫy những kẻ rình mò gõ sai link)
// ----------------------------------------------------------------------
const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>404 — Trang không tìm thấy | Sầu Riêng Út Thoa</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-7xl font-black text-green-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Trang bạn tìm kiếm không tồn tại hoặc đã bị ẩn.</p>
        <a href="/" className="px-6 py-3 bg-green-800 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
          Quay về Trang chủ
        </a>
      </div>
    </>
  );
};

// ----------------------------------------------------------------------
// COMPONENT CHÍNH
// ----------------------------------------------------------------------
function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-20 md:pb-0 relative animate-fade-in transition-opacity duration-1000 opacity-100">
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ========================================== */}
          {/* LUỒNG 1: DÀNH CHO KHÁCH HÀNG */}
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

            {/* BẪY 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ========================================== */}
          {/* LUỒNG 2: DÀNH CHO ADMIN (SEC-01: path từ .env) */}
          {/* ========================================== */}
          <Route path={`/${ADMIN_PATH}/*`} element={<AdminPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
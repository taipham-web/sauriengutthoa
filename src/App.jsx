// src/App.jsx
import { lazy, Suspense, Component } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Import Components (giữ import đồng bộ — nhẹ, render ngay)
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ScrollToTop from './components/ScrollToTop';

// ── Route-based Code Splitting ─────────────────────────────────────────────────
// Mỗi trang được tách thành chunk riêng → chỉ tải khi user cần
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

// ── Admin path từ biến môi trường (không hardcode) ────────────────────────────
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || 'dashboard';

// ── Loading spinner dùng chung cho Suspense ───────────────────────────────────
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]" aria-label="Đang tải trang">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
  </div>
);

// ── ErrorBoundary: Bắt lỗi JavaScript runtime, tránh màn hình trắng ──────────
//
// GIẢI THÍCH: React.Suspense chỉ xử lý trạng thái "đang chờ" (loading).
// Nếu một chunk lazy-loaded ném ra lỗi runtime (Firebase timeout, lỗi JS...),
// Suspense KHÔNG bắt được → toàn bộ app bị crash → màn hình trắng.
// ErrorBoundary giải quyết vấn đề này: nó "bẫy" lỗi và hiển thị fallback UI.
// Lưu ý: ErrorBoundary phải là Class Component (React chưa có hook tương đương).
//
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để render fallback UI ở lần render tiếp theo
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log lỗi ra console để debug (có thể gửi lên Sentry nếu cần)
    console.error('[App ErrorBoundary] Lỗi không xử lý được:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#FAFAFA]">
          <div className="text-6xl mb-4">🌿</div>
          <h1 className="text-3xl font-bold text-green-900 mb-3">Ôi, có lỗi xảy ra!</h1>
          <p className="text-gray-500 mb-2 max-w-md">
            Trang web gặp sự cố nhỏ. Bạn hãy thử tải lại hoặc quay về trang chủ nhé.
          </p>
          <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-100 px-3 py-1 rounded">
            {this.state.error?.message || 'Unknown error'}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Tải lại trang
            </button>
            <a
              href="/"
              className="px-6 py-3 bg-green-800 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              Về Trang Chủ
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Khung giao diện khách hàng (có Header, Footer) ───────────────────────────
const ClientLayout = () => (
  <>
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <MobileBottomNav />
  </>
);

// ── Trang lỗi 404 ─────────────────────────────────────────────────────────────
const NotFoundPage = () => (
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

// ── COMPONENT CHÍNH ───────────────────────────────────────────────────────────
function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-20 md:pb-0 relative animate-fade-in transition-opacity duration-1000 opacity-100">
      <ScrollToTop />

      {/*
        ErrorBoundary bọc bên ngoài Suspense:
        - Suspense  → xử lý trạng thái loading (lazy chunks đang tải)
        - ErrorBoundary → xử lý lỗi runtime nếu chunk bị lỗi sau khi tải
      */}
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── LUỒNG KHÁCH HÀNG ── */}
            <Route element={<ClientLayout />}>
              <Route path="/"                                 element={<Home />} />
              <Route path="/gioi-thieu"                       element={<AboutPage />} />
              <Route path="/san-pham"                         element={<ProductsPage />} />
              <Route path="/san-pham/:id"                     element={<ProductDetails />} />
              <Route path="/cam-nang"                         element={<HandbookPage />} />
              <Route path="/lien-he"                          element={<ContactPage />} />
              <Route path="/kien-thuc/bao-quan-sau-rieng"     element={<PreservationGuidePage />} />
              <Route path="/kien-thuc/dinh-duong-sau-rieng"   element={<NutritionGuidePage />} />
              <Route path="/kien-thuc/am-thuc-sau-rieng"      element={<CulinaryGuidePage />} />
              <Route path="/kien-thuc/chon-sau-rieng"         element={<SelectionGuidePage />} />
              <Route path="*"                                 element={<NotFoundPage />} />
            </Route>

            {/* ── LUỒNG ADMIN (path từ .env) ── */}
            <Route path={`/${ADMIN_PATH}/*`} element={<AdminPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
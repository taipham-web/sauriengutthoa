// src/App.jsx
import { useState, useEffect } from 'react';
import ProductsPage from './pages/Product/ProductsPage';
import AboutPage from './pages/AboutPage';
import ProductDetails from './pages/Product/ProductDetailsPage';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/Admin/AdminPage';
import Home from './pages/Home'; // Đã chuyển Hero thành Home
import MobileBottomNav from './components/MobileBottomNav';
import PreservationGuidePage from './pages/Handbook/PreservationGuidePage';
import NutritionGuidePage from './pages/Handbook/NutritionGuidePage';
import CulinaryGuidePage from './pages/Handbook/CulinaryGuidePage';
import SelectionGuidePage from './pages/Handbook/SelectionGuidePage';
import HandbookPage from './pages/Handbook/HandbookPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // DH Foods style fast load, delay 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d2b18] transition-opacity duration-1000">
        <div className="flex flex-col items-center animate-pulse">
          {/* Logo Út Thoa */}
          <img
            src="/logo.jpg"
            alt="Út Thoa Logo"
            className="w-32 md:w-48 h-32 md:h-48 object-cover rounded-full shadow-2xl mb-8 border-4 border-[#134024]"
            onError={(e) => e.target.style.display = 'none'}
          />

          <div className="text-center">
            <h1 className="text-white text-3xl md:text-5xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase">
              Út Thoa
            </h1>
            <p className="text-amber-500 text-xs md:text-sm tracking-[0.4em] md:tracking-[0.5em] uppercase mt-4 font-medium">
              Durian
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-20 md:pb-0 relative animate-fade-in transition-opacity duration-1000 opacity-100">
      <ScrollToTop />
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* Định nghĩa đường dẫn cho Trang Chủ */}
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/san-pham/:id" element={<ProductDetails />} />
          <Route path="/cam-nang" element={<HandbookPage />} />
          {/* Đường dẫn trang Liên Hệ */}
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/kien-thuc/bao-quan-sau-rieng" element={<PreservationGuidePage />} />
          <Route path="/kien-thuc/dinh-duong-sau-rieng" element={<NutritionGuidePage />} />
          <Route path="/kien-thuc/am-thuc-sau-rieng" element={<CulinaryGuidePage />} />
          <Route path="/kien-thuc/chon-sau-rieng" element={<SelectionGuidePage />} />

          {/* Đường dẫn trang Admin */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default App;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = () => {
  const { currentUser, loading } = useAuth();

  // 1. Chờ Firebase kiểm tra (tránh bị đá văng oan khi tải trang)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // 2. Không có ai đăng nhập -> Đẩy vào bẫy 404
  if (!currentUser) {
    return <Navigate to="/404" replace />;
  }

  // 3. Đã đăng nhập (chắc chắn là Admin) -> Mở cửa
  return <Outlet />;
};

export default AdminRoute;
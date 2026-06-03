import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';

export default function AdminContactsTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "contact_requests"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa yêu cầu liên hệ này? Hành động này không thể hoàn tác.')) {
      try {
        await deleteDoc(doc(db, "contact_requests", id));
        fetchRequests(); // Refresh data
      } catch (error) {
        console.error("Lỗi xóa liên hệ:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead className="bg-[#1a365d] text-white uppercase text-xs font-bold">
          <tr>
            <th className="p-4 rounded-tl-xl">Ngày gửi</th>
            <th className="p-4">Họ tên</th>
            <th className="p-4">Điện thoại</th>
            <th className="p-4">Email</th>
            <th className="p-4">Nội dung</th>
            <th className="p-4 rounded-tr-xl w-24">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {requests.map((item) => (
            <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
              <td className="p-4 text-sm text-gray-500 font-medium">
                {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('vi-VN') : ''}
              </td>
              <td className="p-4 font-bold text-gray-900">{item.name}</td>
              <td className="p-4 text-gray-700">{item.phone}</td>
              <td className="p-4 text-gray-700">{item.email}</td>
              <td className="p-4 text-gray-600 italic">"{item.message}"</td>
              <td className="p-4">
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors border border-red-200"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {requests.length === 0 && <p className="p-10 text-center text-gray-400">Chưa có yêu cầu liên hệ nào.</p>}
    </div>
  );
}

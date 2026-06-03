import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';

export default function AdminCategoriesTab() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Lấy toàn bộ danh mục mà không dùng orderBy của Firestore 
      // để tránh việc các document không có trường 'createdAt' bị ẩn đi.
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sắp xếp phía client
      data.sort((a, b) => {
        const getTime = (timestamp) => {
          if (!timestamp) return 0;
          if (typeof timestamp.toMillis === 'function') return timestamp.toMillis();
          if (timestamp.seconds) return timestamp.seconds * 1000;
          return new Date(timestamp).getTime() || 0;
        };
        return getTime(a.createdAt) - getTime(b.createdAt); // Tăng dần (cũ nhất lên trước)
      });
      
      setCategories(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Xử lý Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mở form thêm mới
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '' });
    setShowForm(true);
  };

  // Mở form sửa
  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name || '',
      slug: category.slug || ''
    });
    setShowForm(true);
  };

  // Xóa danh mục
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này? Lưu ý: Các sản phẩm thuộc danh mục này có thể bị ảnh hưởng phần hiển thị.')) {
      try {
        await deleteDoc(doc(db, "categories", id));
        fetchCategories(); // Refresh
      } catch (error) {
        console.error("Lỗi xóa danh mục:", error);
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        const categoryRef = doc(db, "categories", editingId);
        await updateDoc(categoryRef, {
            ...formData,
            updatedAt: serverTimestamp()
        });
      } else {
        // Add
        await addDoc(collection(db, "categories"), {
            ...formData,
            createdAt: serverTimestamp()
        });
      }
      setShowForm(false);
      fetchCategories();
    } catch (error) {
       console.error("Lỗi lưu danh mục:", error);
       alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="mt-6">
      {!showForm ? (
        <>
          <div className="flex justify-end mb-4">
            <button 
              onClick={handleAddNew}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              + Thêm Danh Mục
            </button>
          </div>
          
          {loading ? (
             <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
             </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#1a365d] text-white uppercase text-xs font-bold">
                  <tr>
                    <th className="p-4 rounded-tl-xl">Tên Danh Mục (Hiển thị)</th>
                    <th className="p-4">Đường dẫn gốc (Slug)</th>
                    <th className="p-4 rounded-tr-xl w-48">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">{item.name}</td>
                      <td className="p-4 text-gray-600 font-mono text-sm bg-gray-50 rounded-md inline-block my-2">{item.slug}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors border border-blue-200">Sửa</button>
                            <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors border border-red-200">Xóa</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {categories.length === 0 && <p className="p-10 text-center text-gray-400">Chưa có danh mục nào. Hãy ấn nút thêm phía trên.</p>}
            </div>
          )}
        </>
      ) : (
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a365d] uppercase">{editingId ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">✕ Hủy</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục (Tên hiển thị) *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500" placeholder="VD: Sầu Riêng Nguyên Trái" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn gốc (Slug) *</label>
                    <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500" placeholder="VD: nguyen-trai" />
                    <p className="text-xs text-gray-500 mt-2 italic">Slug là chuỗi không dấu, viết liền có gạch ngang, dùng để phân loại. Tránh thay đổi liên tục.</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-200">Hủy</button>
                    <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-md">{editingId ? 'Cập Nhật' : 'Lưu Danh Mục'}</button>
                </div>
            </form>
         </div>
      )}
    </div>
  );
}

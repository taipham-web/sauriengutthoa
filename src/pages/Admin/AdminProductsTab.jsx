import { useEffect, useState } from 'react';
import { db, storage } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminProductsTab() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // State form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'nguyen-trai',
    desc: '',
    imgSrc: '',
    badge: '',
    isOutOfStock: false
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch song song cả 2 collection để tối ưu tốc độ và tránh lỗi chéo
      const [productsRes, categoriesRes] = await Promise.allSettled([
        getDocs(collection(db, "products")),
        getDocs(collection(db, "categories"))
      ]);

      if (productsRes.status === 'fulfilled') {
        const data = productsRes.value.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => {
          const getTime = (timestamp) => {
            if (!timestamp) return 0;
            if (typeof timestamp.toMillis === 'function') return timestamp.toMillis();
            if (timestamp.seconds) return timestamp.seconds * 1000;
            return new Date(timestamp).getTime() || 0;
          };
          return getTime(b.createdAt) - getTime(a.createdAt);
        });
        setProducts(data);
      } else {
        console.error("Lỗi lấy dữ liệu sản phẩm:", productsRes.reason);
      }

      if (categoriesRes.status === 'fulfilled') {
        const cats = categoriesRes.value.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(cats);
      } else {
        console.error("Lỗi lấy dữ liệu danh mục:", categoriesRes.reason);
      }

    } catch (error) {
      console.error("Lỗi chung khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý Input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file); 
    formData.append("upload_preset", "saurieng_upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/db8rfxhrc/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      console.log("Upload thành công, link ảnh là:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      throw error; // Ném lỗi để handleImageUpload bắt và hiển thị
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const url = await uploadImageToCloudinary(file);
      if (url) {
        setFormData(prev => ({ ...prev, imgSrc: url }));
        alert("Tải ảnh lên thành công!");
      } else {
        alert("Không thể tải ảnh lên Cloudinary.");
      }
    } catch (error) {
      console.error("Lỗi upload ảnh chi tiết:", error);
      alert("Không thể tải ảnh: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'nguyen-trai', desc: '', imgSrc: '', badge: '', isOutOfStock: false });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      category: product.category || 'nguyen-trai',
      desc: product.desc || '',
      imgSrc: product.imgSrc || '',
      badge: product.badge || '',
      isOutOfStock: product.isOutOfStock || false
    });
    setShowForm(true);
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchData(); // Refresh
      } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);
      }
    }
  };

  // Nhanh chóng bật/tắt trạng thái hết hàng
  const handleToggleStock = async (product) => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        isOutOfStock: !product.isOutOfStock,
        updatedAt: serverTimestamp()
      });
      fetchData();
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Lỗi khi cập nhật trạng thái sản phẩm.");
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        const productRef = doc(db, "products", editingId);
        await updateDoc(productRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        // Add
        await addDoc(collection(db, "products"), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi lưu sản phẩm:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  // Tính toán dữ liệu phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              + Thêm Sản Phẩm
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#1a365d] text-white uppercase text-xs font-bold">
                  <tr>
                    <th className="p-4 rounded-tl-xl w-24">Hình ảnh</th>
                    <th className="p-4">Tên sản phẩm</th>
                    <th className="p-4">Danh mục</th>
                    <th className="p-4">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                      <td className="p-4">
                        <img src={item.imgSrc || "/durian.jpg"} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200" onError={e => { e.target.onerror = null; e.target.src = '/durian.jpg'; }} />
                      </td>
                      <td className="p-4 font-bold text-gray-900">
                        {item.name}
                        {item.isOutOfStock && <span className="ml-2 px-2 py-1 text-[10px] bg-red-100 text-red-600 rounded-md uppercase tracking-wider">Hết hàng</span>}
                      </td>
                      <td className="p-4 text-gray-600">
                        {categories.find(c => c.slug === item.category)?.name || item.category}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">Sửa</button>
                          <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">Xóa</button>
                          <button
                            onClick={() => handleToggleStock(item)}
                            className={`px-3 py-1 rounded transition-colors ${item.isOutOfStock ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
                          >
                            {item.isOutOfStock ? 'Mở bán' : 'Báo hết'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && <p className="p-10 text-center text-gray-400">Chưa có sản phẩm nào. Hãy ấn nút thêm phía trên.</p>}

              {/* Giao diện Phân trang */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center py-4 gap-2 border-t border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Trước
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sau
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1a365d] uppercase">{editingId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">✕ Hủy</button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500" placeholder="VD: Sầu Riêng Ri6" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 bg-white">
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh sản phẩm *</label>
                <div className="flex gap-2 mb-2">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                  <label htmlFor="imageUpload" className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center w-full md:w-auto">
                    {uploadingImage ? '⏳ Đang tải ảnh lên...' : '📷 Tải ảnh từ máy'}
                  </label>
                </div>
                <input required type="text" name="imgSrc" value={formData.imgSrc} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500" placeholder="Hoặc dán URL ảnh trực tiếp vào đây" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nhãn dán (Badge - Tùy chọn)</label>
                <input type="text" name="badge" value={formData.badge} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500" placeholder="VD: Bán chạy, Đặc sản..." />
              </div>
              <div className="flex items-center mt-2 p-3 bg-red-50 rounded-lg border border-red-100">
                <input type="checkbox" id="isOutOfStock" name="isOutOfStock" checked={formData.isOutOfStock} onChange={handleChange} className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                <label htmlFor="isOutOfStock" className="ml-3 block text-sm font-medium text-red-700">Tạm hết hàng (Dừng bán)</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn *</label>
                <textarea required name="desc" value={formData.desc} onChange={handleChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 resize-none" placeholder="Nhập mô tả sản phẩm..."></textarea>
              </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">Hủy</button>
              <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors">{editingId ? 'Cập Nhật' : 'Lưu Sản Phẩm'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function AdminProductsTab() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

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
    images: [],   // ← Mảng lưu nhiều ảnh gallery
    badge: '',
    isOutOfStock: false
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.allSettled([
        getDocs(collection(db, "products")),
        getDocs(collection(db, "categories"))
      ]);

      if (productsRes.status === 'fulfilled') {
        const data = productsRes.value.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => {
          const getTime = (t) => {
            if (!t) return 0;
            if (typeof t.toMillis === 'function') return t.toMillis();
            if (t.seconds) return t.seconds * 1000;
            return new Date(t).getTime() || 0;
          };
          return getTime(b.createdAt) - getTime(a.createdAt);
        });
        setProducts(data);
      }

      if (categoriesRes.status === 'fulfilled') {
        setCategories(categoriesRes.value.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // ─── Upload 1 ảnh lên Cloudinary ─────────────────────────────────────────────
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "saurieng_upload");
    const res = await fetch("https://api.cloudinary.com/v1_1/db8rfxhrc/image/upload", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error.message);
    return json.secure_url;
  };

  // ─── Upload ảnh đại diện chính ───────────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      // Tự động thêm ảnh chính vào images[] nếu chưa có
      setFormData(prev => ({
        ...prev,
        imgSrc: url,
        images: prev.images.includes(url) ? prev.images : [url, ...prev.images],
      }));
    } catch (err) {
      alert("Lỗi tải ảnh: " + err.message);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // ─── Upload NHIỀU ảnh phụ vào gallery ────────────────────────────────────────
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setFormData(prev => {
        // Gộp ảnh mới, loại bỏ trùng lặp
        const merged = [...new Set([...prev.images, ...urls])];
        return { ...prev, images: merged };
      });
    } catch (err) {
      alert("Lỗi tải ảnh gallery: " + err.message);
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  // ─── Xóa 1 ảnh khỏi gallery ──────────────────────────────────────────────────
  const handleRemoveGalleryImg = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(u => u !== urlToRemove),
      // Nếu xóa ảnh chính, xóa imgSrc luôn
      imgSrc: prev.imgSrc === urlToRemove ? '' : prev.imgSrc,
    }));
  };

  // ─── Chọn ảnh gallery làm ảnh đại diện chính ─────────────────────────────────
  const handleSetMainImg = (url) => {
    setFormData(prev => ({ ...prev, imgSrc: url }));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'nguyen-trai', desc: '', imgSrc: '', images: [], badge: '', isOutOfStock: false });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      category: product.category || 'nguyen-trai',
      desc: product.desc || '',
      imgSrc: product.imgSrc || '',
      images: product.images || (product.imgSrc ? [product.imgSrc] : []),
      badge: product.badge || '',
      isOutOfStock: product.isOutOfStock || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchData();
      } catch (error) {
        console.error("Lỗi xóa:", error);
      }
    }
  };

  const handleToggleStock = async (product) => {
    try {
      await updateDoc(doc(db, "products", product.id), {
        isOutOfStock: !product.isOutOfStock,
        updatedAt: serverTimestamp()
      });
      fetchData();
    } catch (error) {
      alert("Lỗi cập nhật trạng thái.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        // Đảm bảo images[] luôn có ảnh chính
        images: formData.images.length > 0
          ? formData.images
          : formData.imgSrc ? [formData.imgSrc] : [],
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), { ...payload, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, "products"), { ...payload, createdAt: serverTimestamp() });
      }
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi lưu sản phẩm:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="mt-6">
      {!showForm ? (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddNew}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              + Thêm Sản Phẩm
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent" />
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#1a365d] text-white uppercase text-xs font-bold">
                  <tr>
                    <th className="p-4 rounded-tl-xl w-24">Hình ảnh</th>
                    <th className="p-4">Tên sản phẩm</th>
                    <th className="p-4">Danh mục</th>
                    <th className="p-4">Ảnh gallery</th>
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
                        {item.isOutOfStock && <span className="ml-2 px-2 py-1 text-[10px] bg-red-100 text-red-600 rounded-md uppercase">Hết hàng</span>}
                      </td>
                      <td className="p-4 text-gray-600">
                        {categories.find(c => c.slug === item.category)?.name || item.category}
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-gray-500">
                          {item.images?.length > 0 ? `${item.images.length} ảnh` : '1 ảnh'}
                        </span>
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
              {products.length === 0 && <p className="p-10 text-center text-gray-400">Chưa có sản phẩm nào.</p>}

              {totalPages > 1 && (
                <div className="flex justify-center items-center py-4 gap-2 border-t border-gray-100 bg-gray-50/50">
                  <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Trước</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                      {page}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Sau</button>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Tên + Danh mục */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500"
                  placeholder="VD: Sầu Riêng Ri6 Nguyên Trái" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                <select required name="category" value={formData.category} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 bg-white">
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: Badge + Out of stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nhãn dán (Badge - Tùy chọn)</label>
                <input type="text" name="badge" value={formData.badge} onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500"
                  placeholder="VD: Bán chạy, Đặc sản..." />
              </div>
              <div className="flex items-center mt-6 p-3 bg-red-50 rounded-lg border border-red-100">
                <input type="checkbox" id="isOutOfStock" name="isOutOfStock" checked={formData.isOutOfStock} onChange={handleChange}
                  className="w-5 h-5 text-red-600 rounded border-gray-300" />
                <label htmlFor="isOutOfStock" className="ml-3 text-sm font-medium text-red-700">Tạm hết hàng (Dừng bán)</label>
              </div>
            </div>

            {/* Row 3: Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn *</label>
              <textarea required name="desc" value={formData.desc} onChange={handleChange} rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 resize-none"
                placeholder="Nhập mô tả sản phẩm..." />
            </div>

            {/* ─── PHẦN ẢNH ─── */}
            <div className="border border-dashed border-gray-300 rounded-xl p-5 space-y-4 bg-gray-50">
              <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">📸 Quản lý hình ảnh</h3>

              {/* Upload ảnh đại diện chính */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh đại diện chính <span className="text-red-500">*</span>
                  <span className="ml-2 font-normal text-gray-400">(Hiện trong danh sách sản phẩm)</span>
                </label>
                <div className="flex gap-3 items-center flex-wrap">
                  <label htmlFor="imageUpload" className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-medium">
                    {uploadingImage ? '⏳ Đang tải...' : '📷 Tải ảnh chính'}
                  </label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                  <input type="text" name="imgSrc" value={formData.imgSrc} onChange={handleChange}
                    className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-amber-500 text-sm"
                    placeholder="Hoặc dán URL ảnh đại diện..." />
                </div>
                {formData.imgSrc && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={formData.imgSrc} alt="preview" className="w-16 h-16 object-cover rounded-lg border-2 border-amber-400" />
                    <span className="text-xs text-amber-600 font-bold">✓ Ảnh đại diện</span>
                  </div>
                )}
              </div>

              {/* Upload ảnh gallery phụ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh gallery (nhiều ảnh)
                  <span className="ml-2 font-normal text-gray-400">(Hiện trong trang chi tiết sản phẩm)</span>
                </label>
                <label htmlFor="galleryUpload" className="cursor-pointer inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors text-sm font-medium">
                  {uploadingGallery ? '⏳ Đang tải ảnh lên...' : '🖼️ Thêm ảnh gallery (chọn nhiều)'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple                   // ← Cho phép chọn nhiều file cùng lúc
                  onChange={handleGalleryUpload}
                  className="hidden"
                  id="galleryUpload"
                />
                <p className="text-xs text-gray-400 mt-1">Giữ Ctrl (Windows) hoặc Cmd (Mac) để chọn nhiều ảnh cùng lúc.</p>
              </div>

              {/* Xem trước gallery */}
              {formData.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Gallery hiện tại ({formData.images.length} ảnh) — Bấm ⭐ để đặt làm ảnh đại diện, bấm ✕ để xóa:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={url}
                          alt={`gallery-${idx}`}
                          className={`w-20 h-20 object-cover rounded-lg border-2 transition-colors ${formData.imgSrc === url ? 'border-amber-400' : 'border-gray-200'}`}
                          onError={e => { e.target.onerror = null; e.target.src = '/durian.jpg'; }}
                        />
                        {/* Badge ảnh chính */}
                        {formData.imgSrc === url && (
                          <span className="absolute bottom-0 left-0 right-0 bg-amber-400 text-white text-[9px] text-center font-bold py-0.5 rounded-b-lg">CHÍNH</span>
                        )}
                        {/* Buttons xuất hiện khi hover */}
                        <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          {formData.imgSrc !== url && (
                            <button type="button" onClick={() => handleSetMainImg(url)}
                              title="Đặt làm ảnh đại diện"
                              className="bg-amber-400 text-white text-xs rounded px-1 py-0.5 hover:bg-amber-500">
                              ⭐
                            </button>
                          )}
                          <button type="button" onClick={() => handleRemoveGalleryImg(url)}
                            title="Xóa ảnh này"
                            className="bg-red-500 text-white text-xs rounded px-1 py-0.5 hover:bg-red-600">
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">Hủy</button>
              <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors">
                {editingId ? 'Cập Nhật Sản Phẩm' : 'Lưu Sản Phẩm'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

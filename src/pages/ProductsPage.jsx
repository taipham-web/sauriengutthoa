// src/pages/ProductsPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

// ─── Mock data ────────────────────────────────────────────────────────────────
const productsData = [
    { id: 1, name: "Sầu Riêng Ri6 Nguyên Trái", category: "nguyen-trai", price: "120.000đ / kg", priceNum: 120000, desc: "Cơm vàng, hạt lép, vị ngọt đậm đà, béo ngậy đặc trưng.", imgSrc: "/ri6.jpg", badge: "Bán chạy" },
    { id: 2, name: "Sầu Riêng Monthong Nguyên Trái", category: "nguyen-trai", price: "135.000đ / kg", priceNum: 135000, desc: "Sầu riêng Thái cơm dày, ráo, vị ngọt thanh.", imgSrc: "/monthong.jpg", badge: "" },
    { id: 3, name: "Sầu Riêng Chuồng Bò Nguyên Trái", category: "nguyen-trai", price: "110.000đ / kg", priceNum: 110000, desc: "Vị nhẫn đắng nhẹ đặc biệt, cơm mềm tan trong miệng.", imgSrc: "/chuongbo.jpg", badge: "Đặc sản" },
    { id: 4, name: "Ri6 Tách Múi Sẵn", category: "tach-mui", price: "350.000đ / hộp 1kg", priceNum: 350000, desc: "Múi to, đều, vàng ươm. Tiện lợi thưởng thức ngay.", imgSrc: "/ri6-tach.jpg", badge: "Tiện lợi" },
    { id: 5, name: "Monthong Tách Múi", category: "tach-mui", price: "380.000đ / hộp 1kg", priceNum: 380000, desc: "Múi ráo, thịt dày. Phù hợp làm quà biếu tặng.", imgSrc: "/monthong-tach.jpg", badge: "" },
    { id: 6, name: "Sầu Riêng Cấp Đông Nguyên Trái", category: "cap-dong", price: "Liên hệ báo giá", priceNum: 0, desc: "Cấp đông nguyên trái công nghệ hiện đại, chuẩn xuất khẩu.", imgSrc: "/cap-dong-trai.jpg", badge: "Xuất khẩu" },
    { id: 7, name: "Thịt Sầu Riêng Xay (Bure)", category: "cap-dong", price: "Liên hệ báo giá", priceNum: 0, desc: "Nguyên liệu cho quán chè, tiệm bánh, kem sầu riêng.", imgSrc: "/sau-rieng-xay.jpg", badge: "Sỉ & Lẻ" },
];

// Danh sách giống sầu riêng để lọc
const VARIETIES = [
    { key: 'ri6', label: 'Ri6' },
    { key: 'monthong', label: 'Monthong (Thái)' },
    { key: 'chuong-bo', label: 'Chuồng Bò' },
    { key: 'musang-king', label: 'Musang King' },
];
const VARIETY_KEYWORDS = {
    'ri6': ['ri6', 'ri 6'],
    'monthong': ['monthong', 'thái', 'thai', 'dona'],
    'chuong-bo': ['chuồng bò', 'chuong bo'],
    'musang-king': ['musang king'],
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProductsPage() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [products, setProducts] = useState(productsData);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // ── Filter states ──
    const [selectedCategories, setSelectedCategories] = useState([]); // slugs
    const [selectedVarieties, setSelectedVarieties] = useState([]); // keys
    const [sortOrder, setSortOrder] = useState('newest'); // newest | price-asc | price-desc
    const [currentPage, setCurrentPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle
    const itemsPerPage = 6;

    // ── Fetch data ──
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = collection(db, 'products');
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => {
                    const d = doc.data();
                    return {
                        id: doc.id, ...d,
                        priceNum: parsePriceNum(d.price),
                    };
                });
                data.sort((a, b) => {
                    const tA = a.createdAt?.toMillis?.() ?? 0;
                    const tB = b.createdAt?.toMillis?.() ?? 0;
                    return tB - tA;
                });
                if (data.length > 0) setProducts(data);

                const cQ = query(collection(db, 'categories'), orderBy('createdAt', 'asc'));
                const cSnap = await getDocs(cQ);
                setCategories(cSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error('Lỗi lấy dữ liệu:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Reset page on any filter change
    useEffect(() => { setCurrentPage(1); }, [selectedCategories, selectedVarieties, sortOrder, searchQuery]);

    // ── Filter & sort ──
    const filteredProducts = useMemo(() => {
        let list = products.filter(p => {
            // Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!p.name.toLowerCase().includes(q) && !(p.desc || '').toLowerCase().includes(q)) return false;
            }
            // Category
            if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
            // Variety
            if (selectedVarieties.length > 0) {
                const nameLower = p.name.toLowerCase();
                const match = selectedVarieties.some(v =>
                    (VARIETY_KEYWORDS[v] || []).some(kw => nameLower.includes(kw))
                );
                if (!match) return false;
            }
            return true;
        });

        // Sort
        if (sortOrder === 'best-seller') {
            const normalize = (str) => (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            list = [...list].sort((a, b) => {
                const aBest = normalize(a.badge).includes('ban chay') || normalize(a.badge).includes('hot') ? 1 : 0;
                const bBest = normalize(b.badge).includes('ban chay') || normalize(b.badge).includes('hot') ? 1 : 0;
                return bBest - aBest;
            });
        }
        if (sortOrder === 'out-of-stock') {
            const normalize = (str) => (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            list = [...list].sort((a, b) => {
                const aOut = a.isOutOfStock || normalize(a.badge).includes('chay hang') || normalize(a.badge).includes('het hang') ? 1 : 0;
                const bOut = b.isOutOfStock || normalize(b.badge).includes('chay hang') || normalize(b.badge).includes('het hang') ? 1 : 0;
                return bOut - aOut;
            });
        }
        return list;
    }, [products, searchQuery, selectedCategories, selectedVarieties, sortOrder]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleCategory = (slug) =>
        setSelectedCategories(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);

    const toggleVariety = (key) =>
        setSelectedVarieties(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedVarieties([]);
        setSortOrder('newest');
    };

    const hasActiveFilter = selectedCategories.length > 0 || selectedVarieties.length > 0;

    // Category display names
    const getCatName = (slug) => {
        if (slug === 'nguyen-trai') return t('categoryWhole') || 'Sầu riêng nguyên trái';
        if (slug === 'tach-mui') return t('categoryPeeled') || 'Sầu riêng tách múi';
        if (slug === 'cap-dong') return t('categoryFrozen') || 'Sầu riêng cấp đông';
        return categories.find(c => c.slug === slug)?.name || slug;
    };

    // Build sidebar category list
    const sidebarCategories = categories.length > 0
        ? categories
        : [
            { id: 'nguyen-trai', slug: 'nguyen-trai' },
            { id: 'tach-mui', slug: 'tach-mui' },
            { id: 'cap-dong', slug: 'cap-dong' },
        ];

    return (
        <div className="bg-gray-50 min-h-screen font-sans pt-16 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* ── Page header ── */}
                <div className="text-center py-12">
                    <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2">{t('shopLabel')}</p>
                    <h1 className="text-4xl md:text-5xl font-black text-[#1a365d] uppercase tracking-wide mb-3">
                        {t('productsTitle')}
                    </h1>
                    <p className="text-gray-500 text-base max-w-xl mx-auto">{t('productsSubtitle')}</p>
                    <div className="w-14 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded mx-auto mt-5"></div>
                </div>

                {/* ── Mobile: open sidebar button ── */}
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <button
                        onClick={() => setSidebarOpen(o => !o)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1a365d] shadow-sm"
                    >
                        <span>⚙</span> {t('filterLabel')} {hasActiveFilter && <span className="bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5">{selectedCategories.length + selectedVarieties.length}</span>}
                    </button>
                    <p className="text-gray-400 text-sm">{filteredProducts.length} {t('productCount')}</p>
                </div>

                {/* ── Main layout: sidebar + grid ── */}
                <div className="flex gap-6 items-start">

                    {/* ──── Sidebar ──── */}
                    <aside className={`
                        flex-shrink-0 w-60 flex-col gap-4
                        ${sidebarOpen ? 'flex' : 'hidden'} md:flex
                        fixed md:sticky top-20 left-0 md:left-auto z-40 md:z-auto
                        h-screen md:h-auto overflow-y-auto md:overflow-visible
                        bg-gray-50 md:bg-transparent p-4 md:p-0
                        shadow-2xl md:shadow-none
                    `}>
                        {/* Close on mobile */}
                        <div className="flex justify-between items-center md:hidden mb-1">
                            <span className="font-bold text-[#1a365d]">{t('filterLabel')}</span>
                            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 text-xl">✕</button>
                        </div>

                        {/* Danh mục */}
                        <SidebarCard title={t('categoryLabel')}>
                            <ul className="space-y-2.5">
                                {sidebarCategories.map(c => (
                                    <li key={c.id}>
                                        <label className="flex items-start gap-2.5 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(c.slug)}
                                                onChange={() => toggleCategory(c.slug)}
                                                className="w-5 h-5 rounded border-gray-300 accent-green-800 cursor-pointer flex-shrink-0 mt-0.5"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-[#1a365d] transition-colors">
                                                {getCatName(c.slug)}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </SidebarCard>

                        {/* Giống sầu riêng */}
                        <SidebarCard title={t('varietyLabel')}>
                            <ul className="space-y-2.5">
                                {VARIETIES.map(v => (
                                    <li key={v.key}>
                                        <label className="flex items-start gap-2.5 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedVarieties.includes(v.key)}
                                                onChange={() => toggleVariety(v.key)}
                                                className="w-5 h-5 rounded border-gray-300 accent-green-800 cursor-pointer flex-shrink-0 mt-0.5"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-[#1a365d] transition-colors">{v.label}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </SidebarCard>

                        {/* Reset */}
                        {hasActiveFilter && (
                            <button
                                onClick={resetFilters}
                                className="w-full py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                ✕ {t('clearFilter')}
                            </button>
                        )}
                    </aside>

                    {/* Mobile overlay */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/30 z-30 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    {/* ──── Main content ──── */}
                    <div className="flex-1 min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
                            <p className="text-gray-500 text-sm">
                                {searchQuery
                                    ? <>{t('searchResultFor')} <strong className="text-[#1a365d]">"{ searchQuery}"</strong>: </>
                                    : ''}
                                <strong className="text-gray-700">{filteredProducts.length}</strong> {t('productCount')}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-sm">{t('sortLabel')}</span>
                                <select
                                    value={sortOrder}
                                    onChange={e => setSortOrder(e.target.value)}
                                    className="border border-gray-200 rounded-lg text-sm text-gray-700 bg-white px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 shadow-sm"
                                >
                                    <option value="newest">{t('sortNewest')}</option>
                                    <option value="best-seller">{t('sortBestSeller')}</option>
                                    <option value="out-of-stock">{t('sortOutOfStock')}</option>
                                </select>
                            </div>
                        </div>

                        {/* Loading */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                                <div className="text-5xl mb-3">🔍</div>
                                <p className="text-gray-400 text-base">{t('noProducts') || 'Không tìm thấy sản phẩm phù hợp.'}</p>
                                {hasActiveFilter && (
                                    <button onClick={resetFilters} className="mt-4 px-4 py-2 text-sm font-semibold text-amber-600 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors">
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* Product grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {currentProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm text-lg"
                                        >‹</button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${currentPage === page
                                                    ? 'bg-[#1a365d] text-white shadow-md scale-110'
                                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a365d] hover:text-[#1a365d] shadow-sm'
                                                    }`}
                                            >{page}</button>
                                        ))}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm text-lg"
                                        >›</button>
                                    </div>
                                )}
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} / {filteredProducts.length} sản phẩm
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parsePriceNum(priceStr) {
    if (!priceStr) return 0;
    const match = priceStr.replace(/\./g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
}

// ─── Sidebar Card ─────────────────────────────────────────────────────────────
function SidebarCard({ title, children }) {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-[#1a365d] mb-3 pb-2.5 border-b border-gray-100 uppercase tracking-wider">
                {title}
            </h3>
            {children}
        </div>
    );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }) {
    const { t } = useTranslation();
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                    src={product.imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1596450514735-37330528246a?w=600&q=80'; }}
                />
                {/* Badge (Khung tròn mặt trời) */}
                {!product.isOutOfStock && product.badge && (
                    <div className="absolute top-3 left-3 z-20 flex items-center justify-center w-14 h-14 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                        {/* Mặt trời quay */}
                        <svg className="absolute inset-0 w-full h-full text-red-600 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0 L59.8 13.3 L75 6.7 L76.9 23.1 L93.3 25 L86.7 40.2 L100 50 L86.7 59.8 L93.3 75 L76.9 76.9 L75 93.3 L59.8 86.7 L50 100 L40.2 86.7 L25 93.3 L23.1 76.9 L6.7 75 L13.3 59.8 L0 50 L13.3 40.2 L6.7 25 L23.1 23.1 L25 6.7 L40.2 13.3 Z" />
                        </svg>
                        {/* Nội dung text */}
                        <span className="relative z-10 text-white text-[10px] font-black uppercase text-center leading-[1.15] max-w-[44px] drop-shadow-sm break-words">
                            {product.badge}
                        </span>
                    </div>
                )}
                {/* Out of stock overlay */}
                {product.isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <span className="bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-4 py-1.5 rounded-lg shadow">
                            {t('outOfStockLabel') || 'Hết hàng'}
                        </span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-grow text-center">
                <h4 className="font-bold text-[#1a365d] text-base mb-1.5 line-clamp-2 min-h-[44px] flex items-center justify-center leading-snug">
                    {product.name}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-grow mb-4">
                    {product.desc}
                </p>
                {product.isOutOfStock ? (
                    <div className="w-full border-2 border-gray-200 text-gray-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-not-allowed">
                        {t('outOfStockBtn') || 'Hết hàng'}
                    </div>
                ) : (
                    <a
                        href="https://zalo.me/0349323539"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#1a365d] hover:bg-[#2a4a7f] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md hover:shadow-lg inline-block"
                    >
                        {t('contactForPrice') || 'Liên hệ báo giá'}
                    </a>
                )}
            </div>
        </div>
    );
}
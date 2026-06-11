import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db } from '../../config/firebase';
import { doc, getDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import SEO from '../../components/SEO';
import ProductCard from './ProductCard';
import VarietyInfoCard from '../../components/VarietyInfoCard';

const SITE_URL = 'https://sauriengutthoa.vn';

// ─── Mock data dùng làm fallback ──────────────────────────────────────────────
const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Sầu Riêng Ri6 Nguyên Trái',
        category: 'nguyen-trai',
        variety: 'ri6',
        price: 'Liên hệ báo giá',
        desc: 'Cơm vàng, hạt lép, vị ngọt đậm đà, béo ngậy đặc trưng. Lựa chọn số 1 của khách hàng miền Tây.',
        imgSrc: '/ri6.jpg',
        images: ['/ri6.jpg', '/ri6-tach.jpg', '/vuon.jpg'],
        badge: 'Bán chạy',
        origin: 'Bến Tre, Việt Nam',
        weight: 'Nguyên trái (2-5kg)',
        shelf: '3-5 ngày (chưa mở)',
        storage: 'Nơi thoáng mát hoặc ngăn mát',
    },
    {
        id: '2',
        name: 'Sầu Riêng Monthong Nguyên Trái',
        category: 'nguyen-trai',
        variety: 'monthong',
        price: 'Liên hệ báo giá',
        desc: 'Sầu riêng Thái cơm dày, ráo, vị ngọt thanh, mùi thơm nhẹ không quá gắt.',
        imgSrc: '/monthong.jpg',
        images: ['/monthong.jpg', '/monthong-tach.jpg'],
        badge: '',
        origin: 'Tiền Giang, Việt Nam',
        weight: 'Nguyên trái (2-5kg)',
        shelf: '3-5 ngày (chưa mở)',
        storage: 'Nơi thoáng mát hoặc ngăn mát',
    },
    {
        id: '3',
        name: 'Sầu Riêng Chuồng Bò Nguyên Trái',
        category: 'nguyen-trai',
        variety: 'chuong-bo',
        price: 'Liên hệ báo giá',
        desc: 'Vị nhẫn đắng nhẹ đặc biệt, cơm mềm tan trong miệng, dành cho người sành ăn.',
        imgSrc: '/chuongbo.jpg',
        images: ['/chuongbo.jpg'],
        badge: 'Đặc sản',
        origin: 'Bến Tre, Việt Nam',
        weight: 'Nguyên trái (2-4kg)',
        shelf: '3-5 ngày (chưa mở)',
        storage: 'Nơi thoáng mát hoặc ngăn mát',
    },
    {
        id: '4',
        name: 'Ri6 Tách Múi Sẵn',
        category: 'tach-mui',
        variety: 'ri6',
        price: 'Liên hệ báo giá',
        desc: 'Múi to, đều, vàng ươm. Được tách sẵn, tiện lợi thưởng thức ngay không cần chờ đợi.',
        imgSrc: '/ri6-tach.jpg',
        images: ['/ri6-tach.jpg', '/ri6.jpg'],
        badge: 'Tiện lợi',
        origin: 'Bến Tre, Việt Nam',
        weight: 'Hộp 1kg',
        shelf: '3-5 ngày (bảo quản lạnh)',
        storage: 'Ngăn mát tủ lạnh (4-8°C)',
    },
    {
        id: '5',
        name: 'Monthong Tách Múi',
        category: 'tach-mui',
        variety: 'monthong',
        price: 'Liên hệ báo giá',
        desc: 'Múi ráo, thịt dày. Phù hợp làm quà biếu tặng hoặc dùng trong gia đình.',
        imgSrc: '/monthong-tach.jpg',
        images: ['/monthong-tach.jpg', '/monthong.jpg'],
        badge: '',
        origin: 'Tiền Giang, Việt Nam',
        weight: 'Hộp 1kg',
        shelf: '3-5 ngày (bảo quản lạnh)',
        storage: 'Ngăn mát tủ lạnh (4-8°C)',
    },
    {
        id: '6',
        name: 'Sầu Riêng Cấp Đông Nguyên Trái',
        category: 'cap-dong',
        price: 'Liên hệ báo giá',
        desc: 'Cấp đông nguyên trái công nghệ hiện đại, chuẩn xuất khẩu. Giữ nguyên hương vị tươi ngon.',
        imgSrc: '/cap-dong-trai.jpg',
        images: ['/cap-dong-trai.jpg'],
        badge: 'Xuất khẩu',
        origin: 'Bến Tre, Việt Nam',
        weight: 'Nguyên trái (2-5kg)',
        shelf: '6-12 tháng (trong ngăn đá)',
        storage: 'Ngăn đá tủ lạnh (-18°C)',
    },
    {
        id: '7',
        name: 'Thịt Sầu Riêng Xay (Bure)',
        category: 'cap-dong',
        price: 'Liên hệ báo giá',
        desc: 'Nguyên liệu lý tưởng cho quán chè, tiệm bánh, kem sầu riêng. Bán sỉ và lẻ.',
        imgSrc: '/sau-rieng-xay.jpg',
        images: ['/sau-rieng-xay.jpg'],
        badge: 'Sỉ & Lẻ',
        origin: 'Bến Tre, Việt Nam',
        weight: 'Túi 1kg / 5kg',
        shelf: '6-12 tháng (trong ngăn đá)',
        storage: 'Ngăn đá tủ lạnh (-18°C)',
    },
];

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1596450514735-37330528246a?w=800&q=80';

// ── CODE-02: Helper tránh duplicate fallback logic ─────────────────────────────
const getMockFallback = (id) => {
    const mock = MOCK_PRODUCTS.find(p => String(p.id) === String(id));
    if (!mock) return { product: null, related: [] };
    return {
        product: mock,
        related: MOCK_PRODUCTS.filter(p => String(p.id) !== String(id)).slice(0, 5),
    };
};

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState('');

    // ── CODE-01: useEffect với isMounted flag — tránh memory leak ─────────────
    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            setLoading(true);
            try {
                // 1. Thử lấy từ Firebase trước
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (!isMounted) return;

                if (docSnap.exists()) {
                    const data = { id: docSnap.id, ...docSnap.data() };
                    setProduct(data);
                    setActiveImg(data.imgSrc || data.image || FALLBACK_IMG);

                    // Lấy sản phẩm liên quan từ Firebase
                    const relQ = query(collection(db, 'products'), limit(6));
                    const relSnap = await getDocs(relQ);
                    if (!isMounted) return;
                    const related = relSnap.docs
                        .map(d => ({ id: d.id, ...d.data() }))
                        .filter(p => p.id !== id)
                        .slice(0, 5);
                    setRelatedProducts(related);
                } else {
                    // 2. Fallback: tìm trong mock data
                    const { product: mock, related } = getMockFallback(id);
                    setProduct(mock);
                    setActiveImg(mock?.imgSrc || FALLBACK_IMG);
                    setRelatedProducts(related);
                }
            } catch {
                // 3. Lỗi mạng/Firebase → dùng mock data
                if (!isMounted) return;
                const { product: mock, related } = getMockFallback(id);
                setProduct(mock);
                setActiveImg(mock?.imgSrc || FALLBACK_IMG);
                setRelatedProducts(related);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (id) fetchProduct();

        // Cleanup function — tránh state update trên unmounted component
        return () => { isMounted = false; };
    }, [id]);

    // ── Loading state ──────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]" aria-label={t('pdLoading')}>
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
                    <p className="text-on-surface-variant text-sm">{t('pdLoading')}</p>
                </div>
            </div>
        );
    }

    // ── Not found state ─────────────────────────────────────────
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
                <div className="text-6xl" aria-hidden="true">🔍</div>
                <h1 className="text-2xl font-bold text-on-background">{t('pdNotFound')}</h1>
                <p className="text-on-surface-variant">{t('pdNotFoundDesc')}</p>
                <Link to="/san-pham" className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity">
                    {t('pdBackToProducts')}
                </Link>
            </div>
        );
    }

    // ── Image list (main + thumbnails nếu có) ─────────────────────────────────
    const images = product.images?.length > 0
        ? product.images
        : [product.imgSrc || product.image || FALLBACK_IMG];

    const productImgSrc = product.imgSrc || product.image || FALLBACK_IMG;

    return (
        <>
            {/* SEO-03: Truyền product prop để kích hoạt Product JSON-LD Schema */}
            <SEO
                title={product.name}
                description={product.desc}
                image={productImgSrc}
                url={`${SITE_URL}/san-pham/${product.id}`}
                type="product"
                product={product}
            />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 py-12">
                {/* Breadcrumb */}
                <nav aria-label={t('pdBreadcrumb')} className="flex items-center gap-2 text-on-surface-variant text-sm mb-8 flex-wrap">
                    <Link className="hover:text-primary transition-colors" to="/">{t('home')}</Link>
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">chevron_right</span>
                    <Link className="hover:text-primary transition-colors" to="/san-pham">{t('products')}</Link>
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">chevron_right</span>
                    <span className="font-bold text-on-background line-clamp-1">
                        {lang !== 'vi' && product[`name_${lang}`] ? product[`name_${lang}`] : product.name}
                    </span>
                </nav>

                {/* Product Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
                    {/* Left: Images */}
                    <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
                        {/* Main image — PERF-01: không lazy (above the fold), PERF-02: width/height */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-surface-container-highest">
                            <img
                                key={activeImg}
                                alt={product.name}
                                src={activeImg}
                                width={800}
                                height={600}
                                fetchpriority="high"
                                decoding="async"
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                            />
                            {/* Badge */}
                            {product.badge && (
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-sm uppercase tracking-wider font-bold shadow-md">
                                        {product.badge}
                                    </span>
                                </div>
                            )}
                            {/* Out of stock overlay */}
                            {product.isOutOfStock && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="bg-white text-red-600 font-bold text-lg px-6 py-3 rounded-lg">Hết hàng</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails — PERF-01: lazy load, PERF-02: width/height */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3" role="list" aria-label="Ảnh sản phẩm">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        role="listitem"
                                        onClick={() => setActiveImg(img)}
                                        aria-label={`Xem ảnh ${idx + 1} của ${product.name}`}
                                        aria-pressed={activeImg === img}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${activeImg === img ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} — ảnh ${idx + 1}`}
                                            width={200}
                                            height={200}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover"
                                            onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col pt-2">
                        {/* Category tag */}
                        <div className="flex gap-2 mb-3">
                            <span className="inline-block px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-xs font-bold uppercase tracking-wider">
                                {product.category === 'nguyen-trai' ? t('categoryWhole')
                                    : product.category === 'tach-mui' ? t('categoryPeeled')
                                    : product.category === 'cap-dong' ? t('categoryFrozen')
                                    : t('productsTitle')}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-on-background mb-4">
                            {lang !== 'vi' && product[`name_${lang}`] ? product[`name_${lang}`] : product.name}
                        </h1>

                        {/* Price */}
                        {product.price && (
                            <p className="text-2xl font-bold text-amber-600 mb-4">{product.price}</p>
                        )}

                        <p className="text-base text-on-surface-variant mb-8 leading-relaxed">{product.desc}</p>

                        {/* Thông tin chi tiết */}
                        <div className="bg-surface-container-low rounded-xl p-6 mb-8 border border-surface-variant">
                            <h3 className="text-lg font-bold mb-4 text-on-surface">{t('pdDetailInfo')}</h3>
                            <ul className="flex flex-col gap-3 text-sm text-on-surface-variant">
                                <li className="flex justify-between border-b border-surface-variant pb-2">
                                    <span className="font-bold">{t('pdOrigin')}:</span>
                                    <span>{product.origin || 'Bến Tre, Việt Nam'}</span>
                                </li>
                                <li className="flex justify-between border-b border-surface-variant pb-2">
                                    <span className="font-bold">{t('pdWeight')}:</span>
                                    <span>{product.weight || product.price}</span>
                                </li>
                                <li className="flex justify-between border-b border-surface-variant pb-2">
                                    <span className="font-bold">{t('pdShelf')}:</span>
                                    <span>{product.shelf || '3-5 ngày (bảo quản lạnh)'}</span>
                                </li>
                                <li className="flex justify-between pb-2">
                                    <span className="font-bold">{t('pdStorage')}:</span>
                                    <span>{product.storage || 'Ngăn mát tủ lạnh (4-8°C)'}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-auto">
                            <a
                                href="https://zalo.me/0349323539"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t('pdContactAria', { name: lang !== 'vi' && product[`name_${lang}`] ? product[`name_${lang}`] : product.name })}
                                className="w-full bg-[#1A365D] hover:bg-[#122643] text-white font-bold uppercase tracking-wide py-4 px-8 rounded transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined" aria-hidden="true">call</span>
                                {t('pdContactBtn')}
                            </a>
                            <p className="text-center text-sm text-on-surface-variant mt-4">{t('pdQualityNote')}</p>
                        </div>
                    </div>
                </div>

                {/* Variety Info Card */}
                {product.variety && <VarietyInfoCard varietyId={product.variety} />}

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <section aria-label={t('pdRelated')}>
                        <div className="flex justify-between items-end mb-8 border-t border-surface-variant pt-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-on-background">{t('pdRelated')}</h2>
                            <Link className="text-sm text-primary hover:underline font-bold hidden md:block" to="/san-pham">
                                {t('pdViewAll')}
                            </Link>
                        </div>
                        {/* PERF-01: ProductCard bên trong nên dùng loading="lazy" */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                        <Link className="text-sm text-primary hover:underline font-bold block text-center mt-6 md:hidden" to="/san-pham">
                            {t('pdViewAllMobile')}
                        </Link>
                    </section>
                )}
            </main>
        </>
    );
}

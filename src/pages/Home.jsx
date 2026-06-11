import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Camera, ShieldCheck, Leaf } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { db } from '../config/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

// ─── STATIC FALLBACK DATA ────────────────────────────────────────────────────
const STATIC_PRODUCTS = [
    { id: 1, imgSrc: '/ri6.jpg', name: 'Sầu Riêng Ri6', desc: 'Cơm vàng, hạt lép, vị ngọt đậm đà, béo ngậy đặc trưng. Lựa chọn số 1 của khách hàng.', badge: 'Bán Chạy' },
    { id: 2, imgSrc: '/monthong.jpg', name: 'Sầu Riêng Monthong', desc: 'Sầu riêng Thái cơm dày, ráo, vị ngọt thanh, mùi thơm nhẹ nhàng không quá gắt.', badge: 'Mới Nhất' },
    { id: 3, imgSrc: '/chuongbo.jpg', name: 'Sầu Riêng Chuồng Bò', desc: 'Vị nhẫn đắng nhẹ đặc biệt, cơm mềm tan trong miệng, dành cho người sành ăn.', badge: '' },
];

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1596450514735-37330528246a?w=800&q=80';
const ORCHARD_IMG = '/vuon.webp';

// SEO-04: LocalBusiness JSON-LD Schema — hiển thị Knowledge Panel trên Google
const LOCAL_BUSINESS_SCHEMA = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Vựa Sầu Riêng Út Thoa',
    image: 'https://sauriengutthoa.vn/logo.jpg',
    description: 'Vựa sầu riêng Út Thoa chuyên cung cấp sầu riêng Ri6, Monthong chất lượng cao, chín cây tự nhiên từ Bến Tre. Bao ăn 1 đổi 1.',
    url: 'https://sauriengutthoa.vn',
    telephone: '+84349323539',
    priceRange: 'Liên hệ báo giá',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Tân Thạnh, Tân Thiềng',
        addressLocality: 'Chợ Lách',
        addressRegion: 'Bến Tre',
        addressCountry: 'VN',
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '20:00',
    },
    sameAs: [
        'https://www.facebook.com/sauriengutthoa',
        'https://zalo.me/0349323539',
    ],
});

export default function Home() {
    const { t } = useTranslation();
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // CODE-01: isMounted flag tránh memory leak khi unmount trong lúc fetch
    useEffect(() => {
        let isMounted = true;
        const fetchLatest = async () => {
            try {
                const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(3));
                const snap = await getDocs(q);
                if (!isMounted) return;
                const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                setLatestProducts(data.length > 0 ? data : STATIC_PRODUCTS);
            } catch {
                if (isMounted) setLatestProducts(STATIC_PRODUCTS);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchLatest();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="font-sans">
            <SEO
                title={t('header.home', { defaultValue: 'Trang Chủ' })}
                description="Vựa sầu riêng Út Thoa chuyên cung cấp sỉ và lẻ các loại sầu riêng Ri6, Monthong Thái cắt tại vườn. Bao sượng, bao ăn 1 đổi 1."
                image="/vuon.jpg"
                url="https://sauriengutthoa.vn"
            />
            {/* SEO-04: LocalBusiness schema cho Google Knowledge Panel */}
            <Helmet>
                <script type="application/ld+json">{LOCAL_BUSINESS_SCHEMA}</script>
            </Helmet>

            {/* ── HERO SECTION ── */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#faf9f6]">
                {/* decorative blobs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/4 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 z-10">
                    {/* Left text */}
                    <div className="space-y-8">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase shadow-sm">
                            {t('heroLatest')}
                        </span>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1a3d24] uppercase leading-[1.15] tracking-tight">
                            Tinh Hoa Vàng <br />
                            <span className="text-[#c9a227]">Từ Đất Mẹ</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 max-w-lg font-medium leading-relaxed">
                            {t('heroLatestDesc')}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="https://zalo.me/0349323539"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Đặt hàng sầu riêng qua Zalo"
                                className="bg-gradient-to-r from-[#7e5700] to-[#ffb300] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-amber-400/30 hover:scale-105 transition-transform"
                            >
                                {t('orderNow')}
                            </a>
                            <Link
                                to="/gioi-thieu"
                                className="px-10 py-4 rounded-full font-bold text-lg border-2 border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                {t('about')}
                            </Link>
                        </div>
                    </div>

                    {/* Right image — PERF-01: fetchpriority="high" vì là LCP image, PERF-02: width/height */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute -top-16 -right-16 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
                        <img
                            src="/durian.webp"
                            alt="Sầu riêng cao cấp Ri6 Út Thoa"
                            width={800}
                            height={600}
                            fetchpriority="high"
                            decoding="async"
                            className="relative z-10 w-full max-h-[600px] object-cover rounded-[2rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700"
                            onError={e => { e.target.src = FALLBACK_IMG; }}
                        />
                    </div>
                </div>
            </section>

            {/* ── BRAND STORY ── */}
            <section className="py-28 bg-[#f4f3f1]">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        {/* image side */}
                        <div className="md:col-span-5 order-2 md:order-1">
                            <div className="relative">
                                {/* PERF-01: lazy load vì below-fold, PERF-02: width/height */}
                                <img
                                    src={ORCHARD_IMG}
                                    alt="Vườn sầu riêng Út Thoa tại Bến Tre"
                                    width={600}
                                    height={750}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl"
                                    onError={e => { e.target.src = FALLBACK_IMG; }}
                                />
                                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-[220px]">
                                    <p className="text-[#7e5700] font-extrabold text-4xl italic">10+</p>
                                    <p className="text-sm font-medium text-gray-500 mt-1">{t('heroExperience')}</p>
                                </div>
                            </div>
                        </div>
                        {/* text side */}
                        <div className="md:col-span-7 order-1 md:order-2 space-y-7">
                            <div className="w-20 h-1 bg-[#7e5700] rounded-full" />
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a3d24] uppercase leading-tight tracking-tight">
                                {t('heroBrandJourney')}
                            </h2>
                            <div className="space-y-5 text-lg text-gray-500 leading-relaxed">
                                <p>{t('aboutP1')}</p>
                                <p>{t('aboutP2')}</p>
                            </div>
                            <Link
                                to="/gioi-thieu"
                                className="inline-flex items-center gap-2 text-[#7e5700] font-bold text-lg group hover:gap-4 transition-all"
                            >
                                {t('aboutUs')}
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── LATEST HARVEST PRODUCTS ── */}
            <section className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex justify-between items-end mb-14">
                        <div className="space-y-3">
                            <span className="text-[#7e5700] font-bold text-xs uppercase tracking-widest">{t('heroLatest')}</span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a3d24] uppercase tracking-tight">{t('heroFeaturedTitle')}</h2>
                            <p className="text-gray-500">{t('heroFeaturedSubtitle')}</p>
                        </div>
                        <Link
                            to="/san-pham"
                            className="hidden md:inline-flex items-center gap-2 text-[#7e5700] font-bold border-2 border-[#7e5700] px-6 py-3 rounded-full hover:bg-[#7e5700] hover:text-white transition-colors"
                        >
                            {t('heroViewAll')} →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20" aria-label="Đang tải sản phẩm">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-500 border-t-transparent" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {latestProducts.map(product => (
                                <EditorialProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12 md:hidden">
                        <Link
                            to="/san-pham"
                            className="inline-block bg-[#1a365d] text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-blue-900 transition-colors shadow-lg"
                        >
                            {t('heroViewAll')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section className="py-20 bg-[#e9e8e5]">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <WhyCard icon={<Camera className="w-10 h-10" aria-hidden="true" />} title={t('why1Title')} desc={t('why1Desc')} color="bg-blue-100 text-blue-700" />
                        <WhyCard icon={<ShieldCheck className="w-10 h-10" aria-hidden="true" />} title={t('why2Title')} desc={t('why2Desc')} color="bg-amber-100 text-amber-700" />
                        <WhyCard icon={<Leaf className="w-10 h-10" aria-hidden="true" />} title={t('why3Title')} desc={t('why3Desc')} color="bg-green-100 text-green-700" />
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ─── EDITORIAL PRODUCT CARD ───────────────────────────────────────────────── */
function EditorialProductCard({ product }) {
    const { t } = useTranslation();
    const BADGE_COLORS = {
        'Bán Chạy': 'bg-green-600',
        'Mới Nhất': 'bg-[#7e5700]',
    };
    const badgeColor = BADGE_COLORS[product.badge] || 'bg-red-500';

    return (
        <div className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-gray-100">
            <div className="relative overflow-hidden rounded-xl mb-5 bg-gray-100">
                {/* PERF-01: lazy, PERF-02: width/height */}
                <img
                    src={product.imgSrc}
                    alt={product.name}
                    width={600}
                    height={288}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1596450514735-37330528246a?w=600&q=80'; }}
                />
                {!product.isOutOfStock && product.badge && (
                    <div className={`absolute top-4 left-4 ${badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight`}>
                        {product.badge}
                    </div>
                )}
                {product.isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <span className="bg-red-600 text-white font-bold px-5 py-2 rounded-xl text-lg -rotate-12 border-2 border-white uppercase tracking-widest shadow-2xl">
                            {t('outOfStockLabel')}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow space-y-3">
                <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-grow">{product.desc}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-[#7e5700]">
                        {t('contactForPrice')}
                    </span>
                    {product.isOutOfStock ? (
                        <span className="bg-gray-200 text-gray-500 text-xs font-bold px-4 py-2 rounded-full cursor-not-allowed">
                            {t('outOfStockBtn')}
                        </span>
                    ) : (
                        <a
                            href="https://zalo.me/0349323539"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Liên hệ đặt hàng ${product.name} qua Zalo`}
                            className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7e5700] to-[#ffb300] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform text-lg"
                        >
                            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── WHY CARD ─────────────────────────────────────────────────────────────── */
function WhyCard({ icon, title, desc, color }) {
    return (
        <div className="flex flex-col items-center text-center space-y-4 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-20 h-20 rounded-full ${color} flex items-center justify-center text-4xl shadow-inner`}>
                {icon}
            </div>
            <h3 className="font-bold text-xl text-gray-900">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}
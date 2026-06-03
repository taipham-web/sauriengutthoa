import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }) {
    const { t } = useTranslation();
    const productUrl = `/san-pham/${product.id}`;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">

            {/* ── Phần ảnh (có hiệu ứng hover overlay) ── */}
            <Link to={productUrl} className="relative aspect-[4/3] bg-gray-100 overflow-hidden block">
                {/* Ảnh sản phẩm — scale nhẹ + làm mờ khi hover */}
                <img
                    src={product.imgSrc || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1596450514735-37330528246a?w=600&q=80'; }}
                />

                {/* Overlay hover — hiện cho tất cả sản phẩm (kể cả hết hàng) */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <span className="text-white font-bold text-sm tracking-widest translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Nhấn để xem →
                    </span>
                </div>

                {/* Badge (Khung tròn mặt trời) */}
                {!product.isOutOfStock && product.badge && (
                    <div className="absolute top-3 left-3 z-30 flex items-center justify-center w-14 h-14 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                        <svg className="absolute inset-0 w-full h-full text-red-600 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0 L59.8 13.3 L75 6.7 L76.9 23.1 L93.3 25 L86.7 40.2 L100 50 L86.7 59.8 L93.3 75 L76.9 76.9 L75 93.3 L59.8 86.7 L50 100 L40.2 86.7 L25 93.3 L23.1 76.9 L6.7 75 L13.3 59.8 L0 50 L13.3 40.2 L6.7 25 L23.1 23.1 L25 6.7 L40.2 13.3 Z" />
                        </svg>
                        <span className="relative z-10 text-white text-[10px] font-black uppercase text-center leading-[1.15] max-w-[44px] drop-shadow-sm break-words">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Out of stock overlay */}
                {product.isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none bg-black/30">
                        <span className="bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-4 py-1.5 rounded-lg shadow">
                            {t('outOfStockLabel', { defaultValue: 'Hết hàng' })}
                        </span>
                    </div>
                )}
            </Link>

            {/* ── Body ── */}
            <div className="p-5 flex flex-col flex-grow text-center">
                <Link to={productUrl} className="block mb-1.5 min-h-[44px] flex items-center justify-center">
                    <h4 className="font-bold text-[#1a365d] hover:text-green-700 text-base line-clamp-2 leading-snug transition-colors">
                        {product.name}
                    </h4>
                </Link>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-grow mb-4">
                    {product.desc}
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                    {product.isOutOfStock ? (
                        <div className="w-full border-2 border-gray-200 text-gray-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-not-allowed">
                            {t('outOfStockBtn', { defaultValue: 'Hết hàng' })}
                        </div>
                    ) : (
                        <a
                            href="https://zalo.me/0349323539"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#1a365d] hover:bg-[#2a4a7f] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md hover:shadow-lg inline-block"
                            onClick={e => e.stopPropagation()}
                        >
                            {t('contactForPrice', { defaultValue: 'Liên hệ báo giá' })}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

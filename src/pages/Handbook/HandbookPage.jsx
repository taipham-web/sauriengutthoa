// src/pages/HandbookPage.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';

export default function HandbookPage() {
    const { t } = useTranslation();

    return (
        <div className="bg-[#FAFAFA] min-h-screen font-sans pt-24 pb-16">
            <SEO 
                title={t('handbookTitle', { defaultValue: 'Cẩm Nang Sầu Riêng' })} 
                description="Tổng hợp những kiến thức, mẹo chọn sầu riêng, cách bảo quản và các món ăn ngon từ sầu riêng Út Thoa."
            />
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm md:text-base mb-4 block">
                        {t('handbook')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1c1a] uppercase tracking-tight mb-6">
                        {t('handbookTitle')}
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                        {t('handbookSubtitle')}
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-8 rounded-full"></div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Featured Article */}
                    <Link to="/kien-thuc/chon-sau-rieng" className="col-span-1 lg:col-span-7 group cursor-pointer relative overflow-hidden rounded-3xl shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/90"></div>
                        <img 
                            alt="Choosing Durian" 
                            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" 
                            src="/cach_chon_sr.webp"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4">{t('article1Tag')}</span>
                            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{t('article1Title')}</h3>
                            <p className="text-gray-200 line-clamp-2">{t('article1Desc')}</p>
                        </div>
                    </Link>

                    {/* Side Articles */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                        {/* Article 1 - Links to real page */}
                        <Link to="/kien-thuc/bao-quan-sau-rieng" className="flex gap-6 items-center group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                                <img 
                                    alt="Storing Durian" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    src="./anh_sr.webp"
                                />
                            </div>
                            <div>
                                <span className="text-green-600 text-xs font-bold uppercase tracking-wider mb-2 block">{t('article2Tag')}</span>
                                <h4 className="text-lg font-bold text-[#1a1c1a] mb-2 group-hover:text-amber-600 transition-colors">{t('article2Title')}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{t('article2Desc')}</p>
                            </div>
                        </Link>

                        {/* Article 2 */}
                        <Link to="/kien-thuc/dinh-duong-sau-rieng" className="flex gap-6 items-center group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-orange-50 flex items-center justify-center">
                                <img 
                                    alt="Nutrition" 
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 opacity-90 mix-blend-multiply" 
                                    src="./anh_sr2.webp"
                                />
                            </div>
                            <div>
                                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 block">{t('article3Tag')}</span>
                                <h4 className="text-lg font-bold text-[#1a1c1a] mb-2 group-hover:text-amber-600 transition-colors">{t('article3Title')}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{t('article3Desc')}</p>
                            </div>
                        </Link>

                        {/* Article 3 */}
                        <Link to="/kien-thuc/am-thuc-sau-rieng" className="flex gap-6 items-center group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-yellow-50 flex items-center justify-center">
                                <img 
                                    alt="Recipes" 
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" 
                                    src="./anh_sr1.webp"
                                />
                            </div>
                            <div>
                                <span className="text-yellow-600 text-xs font-bold uppercase tracking-wider mb-2 block">{t('article4Tag')}</span>
                                <h4 className="text-lg font-bold text-[#1a1c1a] mb-2 group-hover:text-amber-600 transition-colors">{t('article4Title')}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{t('article4Desc')}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

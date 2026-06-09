// src/pages/AboutPage.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, BadgeCheck, Check } from 'lucide-react';
import SEO from '../components/SEO';

export default function AboutPage() {
    const { t } = useTranslation();

    return (
        <div className="bg-white min-h-screen font-sans">
            <SEO 
                title={t('aboutUs', { defaultValue: 'Giới Thiệu' })} 
                description="Tìm hiểu câu chuyện về Sầu Riêng Út Thoa, quy trình trồng và thu hoạch sầu riêng sạch miền Tây. Cam kết chất lượng bao ăn 1 đổi 1."
                image="/vuon.webp"
            />
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" style={{ backgroundImage: "url('/vua_sr.webp')" }}></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <span className="text-amber-400 font-bold tracking-widest uppercase text-sm md:text-base mb-6 block [text-shadow:_0_1px_5px_rgb(0_0_0_/_0.5)]">
                        {t('aboutBanner')}
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_0.8)]">
                        {t('aboutTitle1')} <br /> {t('aboutTitle2')}
                    </h1>
                    <p className="text-white/90 text-xl md:text-2xl mt-8 max-w-2xl mx-auto font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_0.5)]">
                        {t('aboutHeroDesc')}
                    </p>
                    <div className="w-32 h-1.5 bg-amber-500 mx-auto mt-12 rounded-full"></div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto py-24 px-6 md:px-10">
                <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight">{t('aboutUs')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-3 space-y-8 text-lg text-gray-700 leading-relaxed text-justify font-normal">
                        <p>{t('aboutP1')}</p>
                        <blockquote className="border-l-4 border-amber-500 px-8 py-4 my-10 italic bg-amber-50 rounded-r-2xl text-amber-950 font-medium text-xl shadow-inner">
                            {t('aboutQuote')}
                        </blockquote>
                        <p>{t('aboutP2')}</p>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <img src="/vuon.webp" alt="Vuon sau rieng" className="rounded-2xl shadow-lg object-cover h-64 w-full" />
                    </div>
                </div>
            </div>

            {/* ── Câu Chuyện & Cam Kết ── */}
            <div className="max-w-5xl mx-auto pb-16 px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Câu Chuyện Thương Hiệu */}
                    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(26,54,93,0.08)] border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#1a365d] mb-5 flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg flex-shrink-0">
                                <Leaf className="w-5 h-5" />
                            </span>
                            {t('brandStoryTitle')}
                        </h2>
                        <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                            <p>{t('brandStoryP1')}</p>
                            <p>{t('brandStoryP2')}</p>
                        </div>
                    </div>

                    {/* Cam Kết Chất Lượng */}
                    <div className="bg-amber-50 rounded-2xl p-8 shadow-[0_4px_24px_rgba(26,54,93,0.08)] border border-amber-100">
                        <h2 className="text-2xl font-bold text-[#1a365d] mb-5 flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 text-lg flex-shrink-0">
                                <BadgeCheck className="w-5 h-5" />
                            </span>
                            {t('qualityCommitTitle')}
                        </h2>
                        <ul className="space-y-5 text-gray-700 text-base">
                            <li className="flex items-start gap-3">
                                <Check className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-[#1a365d]">{t('qualityCommit1Bold')}</strong> {t('qualityCommit1Desc')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-[#1a365d]">{t('qualityCommit2Bold')}</strong> {t('qualityCommit2Desc')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span><strong className="text-[#1a365d]">{t('qualityCommit3Bold')}</strong> {t('qualityCommit3Desc')}</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Durian Varieties Grid */}
            <section className="px-8 lg:px-16 py-24 max-w-screen-2xl mx-auto bg-surface-container-low rounded-[3rem] my-16 font-body">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl font-bold text-on-surface mb-4">{t('varietiesTitle')}</h2>
                    <p className="font-body text-on-surface-variant max-w-2xl mx-auto">{t('varietiesSubtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Ri6 Card */}
                    <div className="group relative flex flex-col bg-surface rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                            <img alt="Ri6 Durian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMraQfvcQIxycU6O5h44KgAHcXkM3gu0pne3T5QZ3cTv-Wn86ek3xEfalrDVJTDpfKVxUKJXTbjPwij6sRkaN4xkHqhWIndHThscrv40pQkE73ncKhEdFNecefrM9aldLdfnImIGW01mY36KqqiUP_mD-8EhTEZ0dSk0JWL4tPzpZXc_-Ejjme5Xl_CjakIvHo4NKQMGqqAwChT2hET3n1YYOHwpVC3W32_HQOsghgoJA6PL_V2E9W88onR4zjXUgsRXk9x5CxnCjF" />
                            <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold font-label">{t('ri6Label')}</div>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">Ri6</h3>
                        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{t('ri6Desc')}</p>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto">
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>restaurant_menu</span>
                            <span>{t('ri6Taste')}</span>
                        </div>
                    </div>
                    {/* Monthong Card */}
                    <div className="group relative flex flex-col bg-surface rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 lg:-translate-y-8">
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                            <img alt="Monthong Durian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhAfhLCESuZ5Yjsx9GTDNMOnR9Ed82c1ufp2-czR_ScugJ7y4ZCGhgrM9VgT0t0W3fXDuOVizEyDwJqYKzQzlYVgl3aNZk5utgiVdZGrT_1goEuKwDJXpIjOxwZI_mirppks9u5wwdSOYUTpEj9QG1h1zN1k0Bt_Ce4j7bUR3RLw-OO9Trzsi2x6yv3jI3dJTdiAvMcgtNZWmVLpboglVlchI0TsiImVUkpCzO1sActq8cZUgiRzLPplwAdyBRRkqMLVMWYmlWVhJu" />
                            <div className="absolute top-4 left-4 bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-semibold font-label">{t('monthongLabel')}</div>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">{t('monthongName')}</h3>
                        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{t('monthongDesc')}</p>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto">
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>water_drop</span>
                            <span>{t('monthongTaste')}</span>
                        </div>
                    </div>
                    {/* Musang King Card */}
                    <div className="group relative flex flex-col bg-surface rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                            <img alt="Musang King Durian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtlDDubgnXdw5dceRIFwXfGijhYDyAVu1LYEKuA6xjRM8YjoHoafvIBqhQhtMOaQze4Li2Qcjv3foNbwhL-IK6c8iHF2SLjqbIM97VXQcQmBmOwTMPxDqVCiVrABjOhgGj38yg6uR2ZLGZlgfJBr_zljdMv3PoyiW6c2vjUSNpCxhFU_2LTEyt82Czul2djr4ZyHvXq6fROOWMWecmgPmYB2RjFVMSW3VW-9olb4vgdDJ2GJjYDduJ9j9HiYCvRvCX5pwUkccWOeRa" />
                            <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold font-label flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                {t('musangLabel')}
                            </div>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">{t('musangName')}</h3>
                        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{t('musangDesc')}</p>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto">
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>temp_preferences_custom</span>
                            <span>{t('musangTaste')}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Knowledge & Tips Section */}
            <section className="px-8 lg:px-16 py-20 max-w-screen-2xl mx-auto font-body">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-outline-variant/20 pb-6">
                    <div>
                        <h2 className="font-display text-4xl font-bold text-on-surface">{t('knowledgeTitle')}</h2>
                        <p className="font-body text-on-surface-variant mt-2">{t('knowledgeSubtitle')}</p>
                    </div>
                    <Link to="/cam-nang" className="font-label text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors hidden md:flex items-center gap-1 mt-4 md:mt-0">
                        {t('viewAllArticles')}
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                    </Link>
                </div>
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
                            <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{t('article1Title')}</h3>
                            <p className="font-body text-gray-200 line-clamp-2">{t('article1Desc')}</p>
                        </div>
                    </Link>

                    {/* Side Articles */}
                    <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                        {/* Article 1 - Bảo quản */}
                        <Link to="/kien-thuc/bao-quan-sau-rieng" className="flex gap-6 items-center group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                                <img alt="Storing Durian" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="/anh_sr.webp" />
                            </div>
                            <div>
                                <span className="text-green-600 text-xs font-bold uppercase tracking-wider mb-2 block">{t('article2Tag')}</span>
                                <h4 className="text-lg font-bold text-[#1a1c1a] mb-2 group-hover:text-amber-600 transition-colors">{t('article2Title')}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{t('article2Desc')}</p>
                            </div>
                        </Link>

                        {/* Article 2 - Dinh dưỡng */}
                        <Link to="/kien-thuc/dinh-duong-sau-rieng" className="flex gap-6 items-center group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-orange-50 flex items-center justify-center">
                                <img alt="Nutrition" className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 opacity-90 mix-blend-multiply" src="/anh_sr2.webp" />
                            </div>
                            <div>
                                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 block">{t('article3Tag')}</span>
                                <h4 className="text-lg font-bold text-[#1a1c1a] mb-2 group-hover:text-amber-600 transition-colors">{t('article3Title')}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{t('article3Desc')}</p>
                            </div>
                        </Link>

                        {/* Article 3 - Ẩm thực */}
                        <Link to="/kien-thuc/am-thuc-sau-rieng" className="flex gap-6 items-center group cursor-pointer bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-yellow-50 flex items-center justify-center">
                                <img alt="Recipes" className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" src="/anh_sr1.webp" />
                            </div>
                            <div>
                                <span className="text-yellow-600 text-xs font-bold uppercase tracking-wider mb-2 block">{t('article4Tag')}</span>
                                <h4 className="text-lg font-bold text-[#1a1c1a] mb-2 group-hover:text-amber-600 transition-colors">{t('article4Title')}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{t('article4Desc')}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

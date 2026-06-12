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
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_0.8)] px-2">
                        {t('aboutTitle1')} <br /> {t('aboutTitle2')}
                    </h1>
                    <p className="text-white/90 text-xl md:text-2xl mt-8 max-w-2xl mx-auto font-medium [text-shadow:_0_1px_5px_rgb(0_0_0_/_0.5)]">
                        {t('aboutHeroDesc')}
                    </p>
                    <div className="w-32 h-1.5 bg-amber-500 mx-auto mt-12 rounded-full"></div>
                </div>
            </div>

            {/* ── SECTION 1: Về Chúng Tôi – Split Screen ── */}
            <section className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center w-full py-8 lg:py-12">
                {/* Left: Content panel */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-6 sm:px-10 lg:px-16 xl:px-20 bg-white">
                    {/* Green leaf icon */}
                    <div className="mb-4">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 44, color: '#558b2f' }}
                        >eco</span>
                    </div>

                    {/* Main heading */}
                    <h2
                        className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold uppercase mb-3 leading-tight"
                        style={{ color: '#1a532b', letterSpacing: '-0.02em', fontFamily: "'Montserrat', sans-serif" }}
                    >
                        {t('aboutUs')}
                    </h2>

                    {/* Sub-heading */}
                    <p className="text-lg md:text-xl font-semibold mb-6" style={{ color: '#558b2f' }}>
                        Hương Vị Nguyên Bản, Tâm Huyết Nông Dân
                    </p>

                    {/* Paragraphs */}
                    <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                        <p>{t('aboutP1')}</p>
                        <p>{t('aboutP2')}</p>
                    </div>

                    {/* 3 feature icons */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-sm mb-8">
                        {[
                            { icon: 'energy_savings_leaf', label: '100% Tự Nhiên' },
                            { icon: 'location_on',         label: 'Nguồn Gốc Rõ Ràng' },
                            { icon: 'health_and_safety',   label: 'Tận Tâm Uy Tín' },
                        ].map(({ icon, label }) => (
                            <div key={icon} className="flex flex-col items-center text-center gap-1">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 32, color: '#558b2f' }}
                                >{icon}</span>
                                <span className="text-xs font-bold text-gray-900 leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        to="/san-pham"
                        className="inline-block w-full sm:w-auto text-center text-white font-bold text-sm md:text-base uppercase tracking-widest px-8 py-3.5 transition-all duration-300 hover:brightness-90 active:scale-95"
                        style={{ backgroundColor: '#1a532b', borderRadius: 4 }}
                    >
                        Khám Phá Ngay
                    </Link>
                </div>

                {/* Right: Contained Image */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
                    <div className="relative w-full overflow-hidden rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <img
                            src="/vuon.webp"
                            alt="Vườn sầu riêng Út Thoa"
                            className="w-full h-[40vh] sm:h-[45vh] lg:h-[450px] xl:h-[550px] object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: Câu Chuyện & Cam Kết Chất Lượng ── */}
            <div className="max-w-5xl mx-auto py-16 sm:py-20 px-4 sm:px-6 md:px-10">
                {/* Section title */}
                <div className="text-center mb-10 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 px-2 leading-snug">Câu Chuyện &amp; Cam Kết Chất Lượng</h2>
                    <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Card 1: Câu Chuyện */}
                    <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_32px_rgba(26,83,43,0.10)] border border-green-100 overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-50 rounded-bl-[3rem]" />
                        <h3 className="text-xl font-bold text-[#1a365d] mb-6 flex items-center gap-3 relative z-10">
                            <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Leaf className="w-5 h-5 text-green-700" />
                            </span>
                            {t('brandStoryTitle')}
                        </h3>
                        <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed relative z-10">
                            <p>{t('brandStoryP1')}</p>
                            <p>{t('brandStoryP2')}</p>
                        </div>
                    </div>

                    {/* Card 2: Cam Kết */}
                    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 shadow-[0_4px_32px_rgba(217,119,6,0.12)] border border-amber-200 overflow-hidden">
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-amber-100 rounded-bl-[3rem]" />
                        <h3 className="text-xl font-bold text-[#1a365d] mb-6 flex items-center gap-3 relative z-10">
                            <span className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                                <BadgeCheck className="w-5 h-5 text-amber-700" />
                            </span>
                            {t('qualityCommitTitle')}
                        </h3>
                        <ul className="space-y-5 text-gray-700 text-[15px] relative z-10">
                            {[
                                { bold: t('qualityCommit1Bold'), desc: t('qualityCommit1Desc') },
                                { bold: t('qualityCommit2Bold'), desc: t('qualityCommit2Desc') },
                                { bold: t('qualityCommit3Bold'), desc: t('qualityCommit3Desc') },
                            ].map(({ bold, desc }, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    </span>
                                    <span><strong className="text-[#1a365d]">{bold}</strong> {desc}</span>
                                </li>
                            ))}
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
                    <Link to="/san-pham?variety=ri6" className="group relative flex flex-col bg-surface rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                            <img alt="Ri6 Durian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMraQfvcQIxycU6O5h44KgAHcXkM3gu0pne3T5QZ3cTv-Wn86ek3xEfalrDVJTDpfKVxUKJXTbjPwij6sRkaN4xkHqhWIndHThscrv40pQkE73ncKhEdFNecefrM9aldLdfnImIGW01mY36KqqiUP_mD-8EhTEZ0dSk0JWL4tPzpZXc_-Ejjme5Xl_CjakIvHo4NKQMGqqAwChT2hET3n1YYOHwpVC3W32_HQOsghgoJA6PL_V2E9W88onR4zjXUgsRXk9x5CxnCjF" />
                            <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold font-label">{t('ri6Label')}</div>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">Ri6</h3>
                        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{t('ri6Desc')}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                            <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>restaurant_menu</span>
                                <span>{t('ri6Taste')}</span>
                            </div>
                            <span className="text-sm font-semibold text-amber-600 flex items-center gap-1 group-hover:text-amber-700 transition-colors">
                                Xem sản phẩm <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </Link>
                    {/* Monthong Card */}
                    <Link to="/san-pham?variety=monthong" className="group relative flex flex-col bg-surface rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 lg:-translate-y-8">
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                            <img alt="Monthong Durian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhAfhLCESuZ5Yjsx9GTDNMOnR9Ed82c1ufp2-czR_ScugJ7y4ZCGhgrM9VgT0t0W3fXDuOVizEyDwJqYKzQzlYVgl3aNZk5utgiVdZGrT_1goEuKwDJXpIjOxwZI_mirppks9u5wwdSOYUTpEj9QG1h1zN1k0Bt_Ce4j7bUR3RLw-OO9Trzsi2x6yv3jI3dJTdiAvMcgtNZWmVLpboglVlchI0TsiImVUkpCzO1sActq8cZUgiRzLPplwAdyBRRkqMLVMWYmlWVhJu" />
                            <div className="absolute top-4 left-4 bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-semibold font-label">{t('monthongLabel')}</div>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">{t('monthongName')}</h3>
                        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{t('monthongDesc')}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                            <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>water_drop</span>
                                <span>{t('monthongTaste')}</span>
                            </div>
                            <span className="text-sm font-semibold text-amber-600 flex items-center gap-1 group-hover:text-amber-700 transition-colors">
                                Xem sản phẩm <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </Link>
                    {/* Musang King Card */}
                    <Link to="/san-pham?variety=musang-king" className="group relative flex flex-col bg-surface rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                            <img alt="Musang King Durian" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtlDDubgnXdw5dceRIFwXfGijhYDyAVu1LYEKuA6xjRM8YjoHoafvIBqhQhtMOaQze4Li2Qcjv3foNbwhL-IK6c8iHF2SLjqbIM97VXQcQmBmOwTMPxDqVCiVrABjOhgGj38yg6uR2ZLGZlgfJBr_zljdMv3PoyiW6c2vjUSNpCxhFU_2LTEyt82Czul2djr4ZyHvXq6fROOWMWecmgPmYB2RjFVMSW3VW-9olb4vgdDJ2GJjYDduJ9j9HiYCvRvCX5pwUkccWOeRa" />
                            <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-semibold font-label flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                {t('musangLabel')}
                            </div>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-on-surface mb-2">{t('musangName')}</h3>
                        <p className="font-body text-sm text-on-surface-variant mb-4 flex-grow">{t('musangDesc')}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                            <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>temp_preferences_custom</span>
                                <span>{t('musangTaste')}</span>
                            </div>
                            <span className="text-sm font-semibold text-amber-600 flex items-center gap-1 group-hover:text-amber-700 transition-colors">
                                Xem sản phẩm <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </Link>
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

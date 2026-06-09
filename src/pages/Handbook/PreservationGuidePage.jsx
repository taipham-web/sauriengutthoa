// src/pages/PreservationGuidePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PreservationGuidePage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen font-body bg-background text-on-surface">
            {/* Top AppBar */}
            <div className="flex justify-between items-center w-full px-6 py-4 sticky top-20 bg-background/90 backdrop-blur-md z-40 border-b border-outline-variant/30 shadow-sm">
                <Link className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors" to="/cam-nang">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                    <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] uppercase mt-1">{t('hbBack')}</span>
                </Link>
                <div className="font-serif italic font-bold text-2xl text-on-surface hidden sm:block">
                    {t('hbKing')}
                </div>
                <div className="w-8"></div>
            </div>

            <main className="pt-12 pb-24 max-w-screen-2xl mx-auto px-6 lg:px-12">
                {/* Hero Section */}
                <article className="mb-20">
                    <header className="max-w-4xl mx-auto text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
                            {t('presTag')}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-on-background leading-tight tracking-tight mb-8">
                            {t('presTitle')}
                        </h1>
                        <div className="flex items-center justify-center space-x-6 text-on-surface-variant font-label text-sm">
                            <div className="flex items-center space-x-2">
                                <img
                                    alt="Chuyên gia Út Thoa"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-surface-container shadow-sm"
                                    src="/Logo.svg"
                                />
                                <span className="font-medium text-on-surface">{t('culAuthor')}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                            <time className="flex items-center space-x-1" dateTime="2024-05-15">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                <span>{t('presDate')}</span>
                            </time>
                            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                            <span className="flex items-center space-x-1">
                                <span className="material-symbols-outlined text-[18px]">schedule</span>
                                <span>{t('presReadTime')}</span>
                            </span>
                        </div>
                    </header>

                    {/* Hero Image */}
                    <figure className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(26,28,26,0.1)] mb-16 group">
                        <img
                            alt="Fresh durian in a woven basket"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="/anh_sr.webp"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </figure>

                    {/* Content Split Layout */}
                    <div className="flex flex-col lg:flex-row gap-16 relative">
                        {/* Main Article Body */}
                        <div className="lg:w-2/3 lg:pr-8 prose prose-lg prose-stone max-w-none prose-headings:font-headline prose-headings:text-on-background prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:text-on-surface-variant prose-p:leading-relaxed prose-li:text-on-surface-variant">
                            <p className="text-xl font-medium text-on-surface leading-relaxed mb-8">
                                {t('presIntro')}
                            </p>

                            <h2 className="text-3xl font-bold mt-12 mb-6">{t('presSec1Title')}</h2>
                            <p>
                                {t('presSec1Desc')}
                            </p>

                            <div className="bg-surface-container-low p-8 rounded-lg my-8 border-l-4 border-primary">
                                <h4 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined">thermostat</span> {t('tempGolden')}
                                </h4>
                                <p className="m-0 text-on-surface-variant text-base">
                                    Ngăn mát tủ lạnh: <strong>4°C đến 8°C</strong> {t('tempCool').split(':')[1] || ''}<br />
                                    Ngăn đông: <strong>-18°C</strong> {t('tempFreeze').split(':')[1] || ''}
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mt-12 mb-6">{t('presSec2Title')}</h2>
                            <p>
                                {t('presSec2Desc')}
                            </p>

                            <ul className="space-y-4 mb-8 list-none pl-0">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                                    <span>{t('boxGlass')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                                    <span>{t('boxPlastic')}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                                    <span>{t('wrapPE')}</span>
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold mt-12 mb-6">{t('presSec3Title')}</h2>
                            <p>
                                {t('presSec3Desc')}
                            </p>

                            <ol className="space-y-4 mb-8">
                                <li>{t('freezeStep1')}</li>
                                <li>{t('freezeStep2')}</li>
                                <li>{t('freezeStep3')}</li>
                            </ol>

                            <hr className="border-t border-outline-variant/30 my-12" />

                            {/* Social Share */}
                            <div className="flex items-center justify-between py-6">
                                <span className="font-label font-semibold text-on-surface">{t('shareArticle')}</span>
                                <div className="flex space-x-3">
                                    <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors duration-200">
                                        <span className="material-symbols-outlined text-[20px]">share</span>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors duration-200">
                                        <span className="material-symbols-outlined text-[20px]">link</span>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant transition-colors duration-200">
                                        <span className="material-symbols-outlined text-[20px]">bookmark</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Sidebar */}
                        <aside className="lg:w-1/3">
                            <div className="sticky top-32 space-y-8">
                                {/* Related Products/Callout */}
                                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_30px_-12px_rgba(26,28,26,0.08)] border border-outline-variant/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 to-transparent pointer-events-none"></div>
                                    <h3 className="text-xl font-headline font-bold text-on-surface mb-4">{t('sidebarTitle')}</h3>
                                    <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{t('sidebarDesc')}</p>
                                    <Link to="/san-pham" className="inline-flex items-center justify-center w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold text-sm hover:shadow-[0_4px_15px_-3px_rgba(126,87,0,0.4)] transition-all duration-300">
                                        {t('sidebarBtn')}
                                        <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                                    </Link>
                                </div>

                                {/* Related Articles */}
                                <div className="bg-surface rounded-xl p-6 border border-outline-variant/30">
                                    <h3 className="text-lg font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">auto_stories</span>
                                        {t('relatedArticles')}
                                    </h3>
                                    <div className="space-y-6">
                                        <Link className="flex gap-4 group" to="/kien-thuc/chon-sau-rieng">
                                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                                <img
                                                    alt="Cách chọn sầu riêng"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src="/cach_chon_sr.webp"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-headline font-semibold text-on-surface text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                    {t('selTitle')}
                                                </h4>
                                                <time className="text-xs text-on-surface-variant font-label">{t('selDate')}</time>
                                            </div>
                                        </Link>
                                        <div className="h-px w-full bg-outline-variant/20"></div>
                                        <Link className="flex gap-4 group" to="/kien-thuc/am-thuc-sau-rieng">
                                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                                <img
                                                    alt="Sầu riêng chế biến"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src="/banh_crepe.webp"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-headline font-semibold text-on-surface text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                    {t('culTitle')}
                                                </h4>
                                                <time className="text-xs text-on-surface-variant font-label">{t('culDate')}</time>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </article>
            </main>
        </div>
    );
}

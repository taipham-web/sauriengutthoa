// src/pages/HandbookPage/CulinaryGuidePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';

const dishes = [
    {
        num: "01",
        icon: "bakery_dining",
        tag: 'dish1Tag',
        tagColor: "text-rose-600",
        title: 'dish1Title',
        desc: 'dish1Desc',
        tip: 'dish1Tip',
        img: "/banh_crepe.webp"
    },
    {
        num: "02",
        icon: "local_cafe",
        tag: 'dish2Tag',
        tagColor: "text-amber-600",
        title: 'dish2Title',
        desc: 'dish2Desc',
        tip: 'dish2Tip',
        img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800&h=500",
    },
    {
        num: "03",
        icon: "icecream",
        tag: 'dish3Tag',
        tagColor: "text-sky-600",
        title: 'dish3Title',
        desc: 'dish3Desc',
        tip: 'dish3Tip',
        img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=800&h=500",
    },
    {
        num: "04",
        icon: "restaurant",
        tag: 'dish4Tag',
        tagColor: "text-emerald-600",
        title: 'dish4Title',
        desc: 'dish4Desc',
        tip: 'dish4Tip',
        img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800&h=500",
    },
    {
        num: "05",
        icon: "cake",
        tag: 'dish5Tag',
        tagColor: "text-purple-600",
        title: 'dish5Title',
        desc: 'dish5Desc',
        tip: 'dish5Tip',
        img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800&h=500",
    },
];

export default function CulinaryGuidePage() {
    const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fbf9f4] text-[#1b1c19] antialiased selection:bg-[#fdd65e] selection:text-[#745c00] min-h-screen">
            <SEO 
                title={t('culTitle')} 
                description={t('culMetaDesc')}
                image="/Hero.webp"
                type="article"
                article={{ datePublished: '2024-06-01', dateModified: '2025-06-11' }}
            />
            {/* Top AppBar */}
            <div className="flex justify-between items-center w-full px-6 py-4 sticky top-20 bg-[#fbf9f4]/90 backdrop-blur-md z-40 border-b border-stone-200 shadow-sm">
                <Link className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition-colors" to="/cam-nang">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
                    <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] uppercase mt-1">{t('hbBack')}</span>
                </Link>
                <div className="font-serif italic font-bold text-2xl text-[#182810] hidden sm:block">
                    {t('hbKing')}
                </div>
                <div className="w-8"></div>
            </div>

            <main>
                {/* Hero Section */}
                <section className="relative w-full h-[618px] min-h-[500px] flex items-end pb-20 px-6 md:px-12">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Culinary Guide Hero"
                            fetchpriority="high"
                            decoding="async"
                            className="w-full h-full object-cover"
                            src="/Hero.webp"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#182810]/90 via-[#182810]/40 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-[1140px] mx-auto w-full">
                        <div className="max-w-3xl">
                            <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] text-[#fdd65e] mb-4 block uppercase">{t('culTag')}</span>
                            <h1 className="font-serif text-4xl md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-white mb-6 drop-shadow-lg">
                                {t('culTitle')}
                            </h1>
                            <p className="font-serif text-xl font-normal leading-[1.6] text-[#eae8e3] max-w-2xl">
                                {t('culDesc')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Author & Meta */}
                <section className="py-8 px-6 md:px-12 bg-[#fbf9f4] border-b border-stone-200">
                    <div className="max-w-[1140px] mx-auto flex flex-wrap items-center gap-6 text-sm text-[#444840]">
                        <div className="flex items-center gap-3">
                            <img
                                alt="Chuyên gia Út Thoa"
                                className="w-10 h-10 rounded-full object-cover border-2 border-stone-200 shadow-sm"
                                src="/Logo.svg"
                            />
                            <span className="font-serif font-semibold text-[#182810]">{t('culAuthor')}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block"></span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <span className="font-sans">{t('culDate')}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block"></span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            <span className="font-sans">{t('culReadTime')}</span>
                        </div>
                    </div>
                </section>

                {/* Intro */}
                <section className="py-16 px-6 md:px-12 bg-[#fbf9f4]">
                    <div className="max-w-[1140px] mx-auto">
                        <p className="font-serif text-xl font-medium text-[#182810] leading-relaxed max-w-3xl mx-auto text-center">
                            {t('culIntro')}
                        </p>
                    </div>
                </section>

                {/* Dishes List */}
                <section className="pb-24 px-6 md:px-12 bg-[#fbf9f4]">
                    <div className="max-w-[1140px] mx-auto flex flex-col gap-0">
                        {dishes.map((dish, index) => (
                            <div key={dish.num}>
                                <div className={`grid md:grid-cols-12 gap-8 lg:gap-16 items-center py-16 ${index % 2 === 0 ? '' : ''}`}>
                                    {/* Image — alternating layout */}
                                    <div className={`md:col-span-5 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                                        <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                                            <img
                                                alt={t(dish.title)}
                                                className="w-full h-[320px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                                                src={dish.img}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#182810]/30 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className={`font-sans text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full bg-white/90 ${dish.tagColor}`}>
                                                    {t(dish.tag)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`md:col-span-7 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                                        <span className="font-serif text-[52px] font-bold leading-none block mb-2 text-[#e8c730] opacity-80">
                                            {dish.num}
                                        </span>
                                        <h2 className="font-serif text-[30px] md:text-[34px] font-bold leading-tight text-[#182810] mb-4">
                                            {t(dish.title)}
                                        </h2>
                                        <p className="font-serif text-[17px] font-normal leading-[1.75] text-[#444840] mb-6">
                                            {t(dish.desc)}
                                        </p>

                                        {/* Pro Tip */}
                                        <div className="flex items-start gap-3 bg-[#f0eee9] rounded-xl px-5 py-4 border-l-4 border-[#fdd65e]">
                                            <span className="material-symbols-outlined text-[#735c00] mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
                                            <div>
                                                <span className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-[#735c00] block mb-1">{t('proTip')}</span>
                                                <p className="font-serif text-[15px] text-[#444840] leading-[1.6]">{t(dish.tip)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider between dishes */}
                                {index < dishes.length - 1 && (
                                    <div className="flex justify-center text-stone-300">
                                        <svg fill="none" height="12" viewBox="0 0 40 12" width="40" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 0C18.8954 0 18 0.895431 18 2C18 3.10457 18.8954 4 20 4C21.1046 4 22 3.10457 22 2C22 0.895431 21.1046 0 20 0ZM0 6H40V8H0V6ZM20 12C21.1046 12 22 11.1046 22 10C22 8.89543 21.1046 8 20 8C18.8954 8 18 8.89543 18 10C18 11.1046 18.8954 12 20 12Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Dark Banner */}
                <section className="relative py-20 px-6 md:px-12 overflow-hidden">
                    <div className="absolute inset-0 bg-[#182810]"></div>
                    <div className="absolute inset-0 opacity-10">
                        <img
                            alt="background"
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=1600"
                        />
                    </div>
                    <div className="relative z-10 max-w-[1140px] mx-auto text-center">
                        <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-[#fdd65e] mb-4 block">{t('ctaMatLabel')}</span>
                        <h2 className="font-serif text-[36px] md:text-[44px] font-bold text-white leading-tight mb-6">
                            {t('ctaMatTitle')}
                        </h2>
                        <p className="font-serif text-[18px] text-[#eae8e3] max-w-2xl mx-auto mb-10 leading-[1.7]">
                            {t('ctaMatDesc')}
                        </p>
                        <Link
                            to="/san-pham"
                            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#fdd65e] text-[#182810] font-sans font-bold text-[15px] tracking-wide hover:bg-[#ffe680] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_basket</span>
                            {t('ctaMatBtn')}
                        </Link>
                    </div>
                </section>

                {/* Related Articles */}
                <section className="py-20 px-6 md:px-12 bg-[#fbf9f4]">
                    <div className="max-w-[1140px] mx-auto">
                        <div className="text-center mb-12">
                            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-[#182810]/60 mb-2 block">{t('exploreMore')}</span>
                            <h2 className="font-serif text-[30px] font-semibold text-[#182810]">{t('relatedArticles')}</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Link to="/kien-thuc/bao-quan-sau-rieng" className="group flex gap-5 items-center bg-[#f5f3ee] rounded-2xl p-5 border border-stone-200 hover:shadow-md transition-all duration-300">
                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <img
                                        alt="Bảo quản sầu riêng"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        src="/anh_sr.webp"
                                    />
                                </div>
                                <div>
                                    <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-emerald-700 mb-1 block">{t('presTag')}</span>
                                    <h4 className="font-serif font-semibold text-[#182810] text-[16px] group-hover:text-[#735c00] transition-colors line-clamp-2">
                                        {t('presTitle')}
                                    </h4>
                                </div>
                            </Link>
                            <Link to="/kien-thuc/dinh-duong-sau-rieng" className="group flex gap-5 items-center bg-[#f5f3ee] rounded-2xl p-5 border border-stone-200 hover:shadow-md transition-all duration-300">
                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <img
                                        alt="Dinh dưỡng sầu riêng"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        src="/anh_sr2.webp"
                                    />
                                </div>
                                <div>
                                    <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-amber-600 mb-1 block">{t('nutriTag')}</span>
                                    <h4 className="font-serif font-semibold text-[#182810] text-[16px] group-hover:text-[#735c00] transition-colors line-clamp-2">
                                        {t('nutriTitle')}
                                    </h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// src/pages/HandbookPage/SelectionGuidePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const tips = [
    {
        num: "01",
        icon: "hearing",
        color: "text-amber-600",
        bg: "bg-amber-50",
        title: "tip1Title",
        subtitle: "tip1Sub",
        desc: "tip1Desc",
        steps: [
            "tip1S1",
            "tip1S2",
            "tip1S3",
            "tip1S4",
        ],
    },
    {
        num: "02",
        icon: "air",
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        title: "tip2Title",
        subtitle: "tip2Sub",
        desc: "tip2Desc",
        steps: [
            "tip2S1",
            "tip2S2",
            "tip2S3",
            "tip2S4",
        ],
    },
    {
        num: "03",
        icon: "search",
        color: "text-rose-600",
        bg: "bg-rose-50",
        title: "tip3Title",
        subtitle: "tip3Sub",
        desc: "tip3Desc",
        steps: [
            "tip3S1",
            "tip3S2",
            "tip3S3",
            "tip3S4",
        ],
    },
    {
        num: "04",
        icon: "scale",
        color: "text-purple-600",
        bg: "bg-purple-50",
        title: "tip4Title",
        subtitle: "tip4Sub",
        desc: "tip4Desc",
        steps: [
            "tip4S1",
            "tip4S2",
            "tip4S3",
            "tip4S4",
        ],
    },
];

export default function SelectionGuidePage() {
    const { t } = useTranslation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fbf9f4] text-[#1b1c19] antialiased selection:bg-[#fdd65e] selection:text-[#745c00] min-h-screen">
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
                {/* Hero */}
                <section className="relative w-full h-[618px] min-h-[500px] flex items-end pb-20 px-6 md:px-12">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="Chọn sầu riêng chín ngon"
                            className="w-full h-full object-cover"
                            src="/cach_chon_sr.jpg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#182810]/90 via-[#182810]/40 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-[1140px] mx-auto w-full">
                        <div className="max-w-3xl">
                            <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] text-[#fdd65e] mb-4 block uppercase">{t('selTag')}</span>
                            <h1 className="font-serif text-4xl md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-white mb-6 drop-shadow-lg">
                                {t('selTitle')}
                            </h1>
                            <p className="font-serif text-xl font-normal leading-[1.6] text-[#eae8e3] max-w-2xl">
                                {t('selDesc')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Author Meta */}
                <section className="py-8 px-6 md:px-12 border-b border-stone-200">
                    <div className="max-w-[1140px] mx-auto flex flex-wrap items-center gap-6 text-sm text-[#444840]">
                        <div className="flex items-center gap-3">
                            <img
                                alt="Chuyên gia Út Thoa"
                                className="w-10 h-10 rounded-full object-cover border-2 border-stone-200"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVvafZ3DEzpvD9ImvmsUshb29ctClc-fJ47EbSU3TvJYUpdbPkn-NLQkB7POiqziVy3l4-wUTYtUW-k4YGW9hxyVmdcxM5zorxkjYvMwEHoarsQPtr98xDRHSFtZZEfrkyPAuiBws6h_Y0tyeETDb6TBd6UTElZZxrYrZES9xdDW9CaSSE2AcW9C-c3nfAXwcqxRt0Lu6cbS_tv3NHdy1QIzQZwui3w8Ivff3NBMSRVO8kc5zPih8CFfYgkjX_ItSxswjzDJjDAnBJ"
                            />
                            <span className="font-serif font-semibold text-[#182810]">{t('culAuthor')}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block"></span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <span className="font-sans">{t('selDate')}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block"></span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            <span className="font-sans">{t('selReadTime')}</span>
                        </div>
                    </div>
                </section>

                {/* Intro */}
                <section className="py-16 px-6 md:px-12">
                    <div className="max-w-[1140px] mx-auto grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-7">
                            <p className="font-serif text-xl font-medium text-[#182810] leading-relaxed mb-6">
                                {t('selIntro1')}
                            </p>
                            <p className="font-serif text-[17px] text-[#444840] leading-[1.75]">
                                {t('selIntro2')}
                            </p>
                        </div>
                        <div className="md:col-span-5">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: "hearing", label: t('soundLabel'), val: t('soundVal') },
                                    { icon: "air", label: t('smellLabel'), val: t('smellVal') },
                                    { icon: "search", label: t('lookLabel'), val: t('lookVal') },
                                    { icon: "scale", label: t('weightLabel'), val: t('weightVal') },
                                ].map(item => (
                                    <div key={item.icon} className="bg-[#f5f3ee] rounded-2xl p-5 border border-stone-200 text-center">
                                        <span className="material-symbols-outlined text-[#735c00] text-3xl mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                                        <p className="font-sans text-[11px] font-bold tracking-widest uppercase text-[#182810]/50 mb-1">{item.label}</p>
                                        <p className="font-serif text-[13px] font-semibold text-[#182810] leading-tight">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4 Tips */}
                <section className="pb-20 px-6 md:px-12">
                    <div className="max-w-[1140px] mx-auto flex flex-col gap-8">
                        {tips.map((tip, index) => (
                            <div key={tip.num} className="grid md:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                {/* Number Panel */}
                                <div className={`md:col-span-2 flex flex-col items-center justify-center py-10 px-6 ${index % 2 === 0 ? 'bg-[#182810]' : 'bg-[#f0eee9]'}`}>
                                    <span className={`font-serif text-[56px] font-bold leading-none ${index % 2 === 0 ? 'text-[#fdd65e]' : 'text-[#182810]/20'}`}>
                                        {tip.num}
                                    </span>
                                    <span className={`material-symbols-outlined text-4xl mt-3 ${index % 2 === 0 ? 'text-[#fdd65e]/60' : tip.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {tip.icon}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-10 p-8 md:p-10 bg-[#fbf9f4]">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2">
                                            <span className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-[#182810]/50 mb-2 block">{t(tip.subtitle)}</span>
                                            <h2 className="font-serif text-[26px] md:text-[30px] font-bold text-[#182810] leading-tight mb-4">{t(tip.title)}</h2>
                                            <p className="font-serif text-[16px] text-[#444840] leading-[1.75]">{t(tip.desc)}</p>
                                        </div>
                                        <div className="md:w-1/2">
                                            <div className={`rounded-2xl p-6 ${tip.bg} border border-stone-200`}>
                                                <p className="font-sans text-[11px] font-bold tracking-widest uppercase text-[#182810]/50 mb-4">{t('detailLabel')}</p>
                                                <ul className="space-y-3">
                                                    {tip.steps.map((step, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <span className={`font-sans text-[11px] font-bold shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ${index % 2 === 0 ? 'bg-[#182810]' : 'bg-stone-600'}`}>
                                                                {i + 1}
                                                            </span>
                                                            <span className="font-serif text-[15px] text-[#444840] leading-[1.6]">{t(step)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Expert Quote */}
                <section className="py-20 px-6 md:px-12 bg-[#182810]">
                    <div className="max-w-[860px] mx-auto text-center">
                        <span className="material-symbols-outlined text-[#fdd65e] text-5xl mb-8 block" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                        <blockquote className="font-serif text-[22px] md:text-[28px] font-normal italic text-white leading-[1.7] mb-8">
                            {t('quoteText')}
                        </blockquote>
                        <p className="font-sans text-[13px] font-semibold tracking-widest uppercase text-[#fdd65e]/70">{t('quoteAuthor')}</p>
                    </div>
                </section>

                {/* Common Mistakes */}
                <section className="py-20 px-6 md:px-12">
                    <div className="max-w-[1140px] mx-auto">
                        <div className="text-center mb-12">
                            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-[#182810]/50 mb-2 block">{t('mistakeLabel')}</span>
                            <h2 className="font-serif text-[32px] font-bold text-[#182810]">{t('mistakeTitle')}</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: "dangerous", title: "mis1Title", desc: "mis1Desc" },
                                { icon: "block", title: "mis2Title", desc: "mis2Desc" },
                                { icon: "warning", title: "mis3Title", desc: "mis3Desc" },
                            ].map(item => (
                                <div key={t(item.title)} className="bg-[#fff8f0] rounded-2xl p-8 border border-amber-100">
                                    <span className="material-symbols-outlined text-amber-500 text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                                    <h3 className="font-serif text-[20px] font-bold text-[#182810] mb-3">{t(item.title)}</h3>
                                    <p className="font-serif text-[15px] text-[#444840] leading-[1.7]">{t(item.desc)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-[#f5f3ee]">
                    <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="max-w-xl">
                            <span className="font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-[#735c00] mb-3 block">{t('ctaLabel')}</span>
                            <h2 className="font-serif text-[30px] font-bold text-[#182810] leading-tight mb-4">{t('ctaTitle')}</h2>
                            <p className="font-serif text-[17px] text-[#444840] leading-[1.7]">Nếu bạn vẫn chưa đủ tự tin, hãy để chúng tôi lo phần chọn lựa. Mỗi trái sầu riêng tại {t('hbKing')} đều đã qua kiểm định bởi chuyên gia.</p>
                        </div>
                        <Link to="/san-pham" className="shrink-0 inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#182810] text-[#fdd65e] font-sans font-bold text-[15px] tracking-wide hover:bg-[#2a3d1c] transition-all duration-300 shadow-lg">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_basket</span>
                            {t('ctaBtn')}
                        </Link>
                    </div>
                </section>

                {/* Related */}
                <section className="py-16 px-6 md:px-12">
                    <div className="max-w-[1140px] mx-auto">
                        <h2 className="font-serif text-[24px] font-bold text-[#182810] mb-8 text-center">{t('relatedArticles')}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { to: "/kien-thuc/bao-quan-sau-rieng", tag: 'presTag', tagColor: "text-emerald-700", title: 'presTitle', img: "/anh_sr.jpg" },
                                { to: "/kien-thuc/dinh-duong-sau-rieng", tag: 'nutriTag', tagColor: "text-amber-600", title: 'nutriTitle', img: "/anh_sr2.jpg" },
                                { to: "/kien-thuc/am-thuc-sau-rieng", tag: 'culTag', tagColor: "text-rose-600", title: 'culTitle', img: "/anh_sr1.jpg" },
                            ].map(item => (
                                <Link key={item.to} to={item.to} className="group rounded-2xl overflow-hidden border border-stone-200 hover:shadow-md transition-all duration-300">
                                    <div className="h-48 overflow-hidden">
                                        <img alt={t(item.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
                                    </div>
                                    <div className="p-6">
                                        <span className={`font-sans text-[11px] font-bold tracking-widest uppercase mb-2 block ${item.tagColor}`}>{t(item.tag)}</span>
                                        <h4 className="font-serif font-semibold text-[#182810] text-[16px] group-hover:text-[#735c00] transition-colors line-clamp-2">{t(item.title)}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

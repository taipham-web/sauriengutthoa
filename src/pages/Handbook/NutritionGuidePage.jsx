// src/pages/HandbookPage/NutritionGuidePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NutritionGuidePage() {
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
                {/* Hero Section */}
                <section className="relative w-full h-[618px] min-h-[500px] flex items-end pb-20 px-6 md:px-12">
                    <div className="absolute inset-0 z-0">
                        <img alt="Durian Hero" className="w-full h-full object-cover"src="/SR_trai.jpg" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#182810]/90 via-[#182810]/40 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-[1140px] mx-auto w-full">
                        <div className="max-w-3xl">
                            <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] text-[#fdd65e] mb-4 block uppercase">{t('nutriTag')}</span>
                            <h1 className="font-serif text-4xl md:text-[48px] font-bold leading-tight tracking-[-0.02em] text-[#ffffff] mb-6 drop-shadow-lg">
                                {t('nutriTitle')}
                            </h1>
                            <p className="font-serif text-xl font-normal leading-[1.6] text-[#eae8e3] max-w-2xl">
                                {t('nutriDesc')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Nutrition Facts Bento */}
                <section className="py-20 px-6 md:px-12 bg-[#fbf9f4]">
                    <div className="max-w-[1140px] mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#182810] mb-4">{t('nutriSec1Title')}</h2>
                            <p className="font-serif text-[18px] font-normal leading-[1.6] text-[#444840] max-w-2xl mx-auto">
                                {t('nutriSec1Desc')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Vitamin C Card */}
                            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#c4c8bd]/30 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(45,62,36,0.06)] transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-[#182810]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[#fdd65e] mb-2">
                                        <span className="font-serif text-[48px] font-bold leading-none tracking-[-0.02em]">80%</span>
                                    </div>
                                    <h3 className="font-serif text-[24px] font-semibold leading-tight text-[#182810] mb-2">Vitamin C</h3>
                                    <p className="font-serif text-sm font-normal leading-[1.6] text-[#444840]">{t('vitCDesc')}</p>
                                </div>
                            </div>

                            {/* Potassium Card */}
                            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#c4c8bd]/30 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(45,62,36,0.06)] transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-[#182810]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[#fdd65e] mb-2">
                                        <span className="font-serif text-[48px] font-bold leading-none tracking-[-0.02em]">30%</span>
                                    </div>
                                    <h3 className="font-serif text-[24px] font-semibold leading-tight text-[#182810] mb-2">{t('potassiumTitle')}</h3>
                                    <p className="font-serif text-sm font-normal leading-[1.6] text-[#444840]">{t('potassiumDesc')}</p>
                                </div>
                            </div>

                            {/* Fiber Card */}
                            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#c4c8bd]/30 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(45,62,36,0.06)] transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-[#182810]" style={{ fontVariationSettings: "'FILL' 1" }}>grass</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[#fdd65e] mb-2">
                                        <span className="font-serif text-[48px] font-bold leading-none tracking-[-0.02em]">9g</span>
                                    </div>
                                    <h3 className="font-serif text-[24px] font-semibold leading-tight text-[#182810] mb-2">{t('fiberTitle')}</h3>
                                    <p className="font-serif text-sm font-normal leading-[1.6] text-[#444840]">{t('fiberDesc')}</p>
                                </div>
                            </div>

                            {/* Energy Card */}
                            <div className="bg-[#f5f3ee] p-8 rounded-2xl border border-[#c4c8bd]/30 relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(45,62,36,0.06)] transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-[#182810]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[#fdd65e] mb-2">
                                        <span className="font-serif text-[48px] font-bold leading-none tracking-[-0.02em]">357</span>
                                    </div>
                                    <h3 className="font-serif text-[24px] font-semibold leading-tight text-[#182810] mb-2">Calories</h3>
                                    <p className="font-serif text-sm font-normal leading-[1.6] text-[#444840]">{t('caloriesDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Editorial Content: Health Benefits */}
                <section className="py-20 px-6 md:px-12 bg-[#fbf9f4]">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col gap-16">
                            {/* Benefit 1 */}
                            <div className="grid md:grid-cols-12 gap-8 items-center">
                                <div className="md:col-span-5 order-2 md:order-1">
                                    <img alt="Energy source" className="w-full h-[400px] object-cover rounded-2xl shadow-sm shadow-[#182810]/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBViLs9PVP_J3mYSQsgHKFe0Z8sXFWwJKfGgNl6f8rYlYJasejiXjsBcJPR4rDzfA0W1WH7zrvWaUoV9kmIkuZhOHiRziN97zsNiN0-2cMnccq4PdXrNnGAWHrJhBV1BtbAmB-gV8qQsa_VR0vuwhJu2qRJzl7_dhB355los-lQ-ZPVoB_47qLQ2gaC4FnhZY082OCs13oTuBL0iGwJ-JwFyz_0dH3OVuxs3Y6n9Vdh-5b1VyBQXrtV7F3ZPxk-crhHJUgodQ-iTBM" />
                                </div>
                                <div className="md:col-span-7 order-1 md:order-2">
                                    <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] text-[#182810]/70 uppercase mb-3 block">{t('energyLabel')}</span>
                                    <h3 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#182810] mb-4">{t('energyTitle')}</h3>
                                    <p className="font-serif text-[18px] font-normal leading-[1.6] text-[#444840] mb-6">
                                        {t('energyDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex justify-center text-[#c4c8bd]/40">
                                <svg fill="none" height="12" viewBox="0 0 40 12" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 0C18.8954 0 18 0.895431 18 2C18 3.10457 18.8954 4 20 4C21.1046 4 22 3.10457 22 2C22 0.895431 21.1046 0 20 0ZM0 6H40V8H0V6ZM20 12C21.1046 12 22 11.1046 22 10C22 8.89543 21.1046 8 20 8C18.8954 8 18 8.89543 18 10C18 11.1046 18.8954 12 20 12Z" fill="currentColor"></path>
                                </svg>
                            </div>

                            {/* Benefit 2 */}
                            <div className="grid md:grid-cols-12 gap-8 items-center">
                                <div className="md:col-span-7">
                                    <span className="font-sans text-[12px] font-semibold leading-none tracking-[0.1em] text-[#182810]/70 uppercase mb-3 block">{t('moodLabel')}</span>
                                    <h3 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#182810] mb-4">{t('moodTitle')}</h3>
                                    <p className="font-serif text-[18px] font-normal leading-[1.6] text-[#444840] mb-6">
                                        {t('moodDesc')}
                                    </p>
                                </div>
                                <div className="md:col-span-5">
                                    <div className="bg-[#f0eee9] p-8 rounded-2xl border border-[#c4c8bd]/30">
                                        <span className="material-symbols-outlined text-4xl text-[#735c00] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
                                        <h4 className="font-serif text-[24px] font-semibold leading-[1.3] text-[#182810] mb-2">Tryptophan</h4>
                                        <p className="font-serif text-[18px] font-normal leading-[1.6] text-[#444840] text-sm italic">
                                            {t('moodQuote')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex justify-center text-[#c4c8bd]/40">
                                <svg fill="none" height="12" viewBox="0 0 40 12" width="40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 0C18.8954 0 18 0.895431 18 2C18 3.10457 18.8954 4 20 4C21.1046 4 22 3.10457 22 2C22 0.895431 21.1046 0 20 0ZM0 6H40V8H0V6ZM20 12C21.1046 12 22 11.1046 22 10C22 8.89543 21.1046 8 20 8C18.8954 8 18 8.89543 18 10C18 11.1046 18.8954 12 20 12Z" fill="currentColor"></path>
                                </svg>
                            </div>

                            {/* Benefit 3 & 4 */}
                            <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden mt-8 border border-[#c4c8bd]/20">
                                <div className="absolute inset-0 z-0">
                                    <img alt="Botanical background" className="w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdPgXl18ic_2_w_tUCK15mnQ06wNoEk2zoLYkyv6wxZqdtTAIBPRtWKuadqBLJevXJFx_Kh3aAL4VpYlkCOI-cfcvAoe8FTApXxh8qmR3naFunoZwe9mzZMiYtHiR1UDes2HfLRKrii-6j_tJK9dMKDEQqYlz3POKdwfBcXPKaBZhnCl3O3k8z1iqnnVbfCsxuwrZmptRfLBjHKtjm7iNMYMcJAz_Dn3Mq8gESFpm4VhMDCZuz_18T0kF7_IxS3BLstU0Mvm8GrnI" />
                                    <div className="absolute inset-0 bg-[#182810]/95 backdrop-blur-sm"></div>
                                </div>
                                <div className="relative z-10 grid md:grid-cols-2 gap-12">
                                    <div>
                                        <span className="material-symbols-outlined text-[#fdd65e] mb-4 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitor_weight</span>
                                        <h3 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#ffffff] mb-4">{t('digestionTitle')}</h3>
                                        <p className="font-serif text-[18px] font-normal leading-[1.6] text-[#eae8e3]">
                                            {t('digestionDesc')}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="material-symbols-outlined text-[#fdd65e] mb-4 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>ecg_heart</span>
                                        <h3 className="font-serif text-[32px] font-semibold leading-[1.2] text-[#ffffff] mb-4">{t('heartTitle')}</h3>
                                        <p className="font-serif text-[18px] font-normal leading-[1.6] text-[#eae8e3]">
                                            {t('heartDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Related Articles */}
                <section className="py-16 px-6 md:px-12 bg-[#fbf9f4]">
                    <div className="max-w-[1140px] mx-auto border-t border-stone-200 pt-16">
                        <h2 className="font-serif text-[24px] font-bold text-[#182810] mb-8 text-center">{t('relatedArticles')}</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { to: "/kien-thuc/chon-sau-rieng", tag: 'selTag', tagColor: "text-amber-600", title: 'selTitle', img: "/cach_chon_sr.jpg" },
                                { to: "/kien-thuc/bao-quan-sau-rieng", tag: 'presTag', tagColor: "text-emerald-700", title: 'presTitle', img: "/anh_sr.jpg" },
                                { to: "/kien-thuc/am-thuc-sau-rieng", tag: 'culTag', tagColor: "text-rose-600", title: 'culTitle', img: "/anh_sr1.jpg" },
                            ].map(item => (
                                <Link key={item.to} to={item.to} className="group rounded-2xl overflow-hidden border border-stone-200 hover:shadow-md transition-all duration-300 bg-white">
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

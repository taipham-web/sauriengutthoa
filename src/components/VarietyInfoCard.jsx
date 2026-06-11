import React from 'react';
import { useTranslation } from 'react-i18next';
import { varietiesData } from '../data/varietiesData';

export default function VarietyInfoCard({ varietyId }) {
    const { t } = useTranslation();
    const data = varietiesData[varietyId];

    if (!data) return null;

    const titleKey = `variety_${varietyId}_title`;
    const p1Key = `variety_${varietyId}_p1`;
    const p2Key = `variety_${varietyId}_p2`;

    return (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow my-12 max-w-7xl mx-auto p-6 md:p-10 font-sans">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-8 text-center uppercase tracking-wide">
                {t(titleKey)}
            </h2>
            <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-1/2 space-y-5 text-gray-700 text-lg leading-relaxed text-justify">
                    <p>{t(p1Key)}</p>
                    <p>{t(p2Key)}</p>
                </div>
                <div className="w-full md:w-1/2 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                    <img 
                        src={data.image} 
                        alt={data.title} 
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                        onError={(e) => { e.target.src = '/durian.webp'; }}
                    />
                </div>
            </div>
        </div>
    );
}

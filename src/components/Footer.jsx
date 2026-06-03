import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#1a3d24] w-full rounded-none font-body mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Intro */}
        <div className="col-span-1 md:col-span-1 flex flex-col space-y-6">
          <span className="text-3xl font-black text-white uppercase block tracking-tight">
            {t('ftShopName')}
          </span>
          <p className="text-sm leading-relaxed text-[#b5c4b1] font-medium">
            {t('ftDesc')}
          </p>
          <div className="flex space-x-4 pt-4">
            {/* Social Icons - Minimal & Elegant */}
            <a aria-label="Facebook" className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors outline-none rounded-full p-2" href="https://www.facebook.com/SauRiengUtThoa/" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
            </a>
            <a aria-label="Instagram" className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors outline-none rounded-full p-2" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>photo_camera</span>
            </a>
            <a aria-label="Zalo" className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors outline-none rounded-full p-2" href="https://zalo.me/0349323539" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
          <h3 className="font-black text-xl text-white uppercase tracking-tight mb-3">{t('ftExplore')}</h3>
          <ul className="space-y-3 text-sm leading-relaxed font-medium">
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/san-pham?search=ri6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftRi6Reserve')}</Link></li>
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/san-pham?search=monthong" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftMonthongGold')}</Link></li>
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/san-pham?search=musang-king" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftMusangKingEstate')}</Link></li>
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/gioi-thieu" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftHeritageStory')}</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
          <h3 className="font-black text-xl text-white uppercase tracking-tight mb-3">{t('ftClientServices')}</h3>
          <ul className="space-y-3 text-sm leading-relaxed font-medium">
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/lien-he" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftRetail')}</Link></li>
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/lien-he" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftExport')}</Link></li>
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/lien-he" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftPurchase')}</Link></li>
            <li><Link className="text-[#b5c4b1] hover:text-[#c9a227] transition-colors inline-block" to="/lien-he" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('ftPartnerContact')}</Link></li>
          </ul>
        </div>

        {/* Company Legal Info */}
        <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
          <h3 className="font-black text-xl text-white uppercase tracking-tight mb-3">{t('ftLegalTitle')}</h3>
          <div className="space-y-3 text-sm leading-relaxed text-[#b5c4b1] font-medium">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#c9a227] text-base shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>business</span>
              <div>
                <p className="font-black text-white uppercase leading-snug">{t('ftCompanyFullName')}</p>
                <p className="text-xs text-[#8a9986] mt-0.5">{t('ftCompanyEnName')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c9a227] text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
              <span>MST: <strong className="text-[#e8dfc0]">1301164941</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#c9a227] text-base shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <span>{t('ftCompanyAddress')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c9a227] text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              <a href="tel:+840349323539" className="hover:text-[#c9a227] transition-colors">+84 (0) 349 323 539</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c9a227] text-base shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
              <a href="mailto:thuyduyle3004@gmail.com" className="hover:text-[#c9a227] transition-colors">thuyduyle3004@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-xs bg-[#c9a227]/10 text-[#c9a227] font-semibold px-2.5 py-1 rounded-full border border-[#c9a227]/30">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                {t('ftActiveStatus')}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-[#122e1b] border-t border-[#c9a227]/15 py-6">
        <div className="max-w-7xl mx-auto px-8 text-center md:text-left">
          <p className="text-sm leading-relaxed text-[#6b7d68] font-medium">
            {t('ftCopyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
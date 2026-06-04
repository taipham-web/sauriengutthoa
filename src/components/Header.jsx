// src/components/Header.jsx
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchVal, setSearchVal] = useState(searchParams.get('search') || '');
    const [isLangOpen, setIsLangOpen] = useState(false);

    // Đồng bộ ô tìm kiếm khi URL thay đổi (ví dụ: bấm nút back)
    useEffect(() => {
        setSearchVal(searchParams.get('search') || '');
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchVal(value);

        if (location.pathname === '/san-pham') {
            if (value.trim()) {
                setSearchParams({ search: value });
            } else {
                setSearchParams({});
            }
        } else if (value.trim()) {
            navigate(`/san-pham?search=${encodeURIComponent(value.trim())}`);
        }
    };

    const setLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsLangOpen(false);
    };

    const flags = {
        vi: "https://flagcdn.com/w40/vn.png",
        en: "https://flagcdn.com/w40/us.png",
        zh: "https://flagcdn.com/w40/cn.png"
    };

    const getLinkStyle = (path) => {
        const baseStyle = "uppercase tracking-tight text-[14px] md:text-[15px] font-semibold transition-colors duration-300";
        if (location.pathname === path) {
            return `${baseStyle} text-white border-b-2 border-white pb-1`;
        }
        return `${baseStyle} text-[#e8dfc0] hover:text-white`;
    };

    // Lấy mã ngôn ngữ ngắn (vi, en, zh)
    const langCode = language?.split('-')[0] || 'vi';
    const flagSrc = flags[langCode] || flags.vi;

    return (
        <>
            <header className="fixed top-0 w-full z-50 bg-[#1a3d24]/95 backdrop-blur-md border-b border-[#c9a227]/20 shadow-sm transition-all duration-300 font-sans">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">

                    {/* 1. Logo */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        {/* Đã thêm: bg-white (nền trắng), p-1 (đệm), border (viền vàng) */}
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center border-2 border-[#c9a227] shadow-[0_0_10px_rgba(201,162,39,0.3)] group-hover:scale-110 transition-transform duration-300">
                            <img alt="Logo" className="w-full h-full object-contain p-0.5" src="/Logo.svg" />
                        </div>
                        <div className="text-sm md:text-xl font-black text-white uppercase tracking-tight hidden sm:block">
                            SẦU RIÊNG ÚT THOA
                        </div>
                    </Link>

                    {/* 2. Navigation Links (Desktop) */}
                    <nav className="hidden lg:flex flex-1 justify-center items-center space-x-6 xl:space-x-12">
                        <Link className={getLinkStyle('/gioi-thieu')} to="/gioi-thieu">{t('about')}</Link>
                        <Link className={getLinkStyle('/san-pham')} to="/san-pham">{t('products')}</Link>
                        <Link className={getLinkStyle('/cam-nang')} to="/cam-nang">{t('handbook')}</Link>
                        <Link className={getLinkStyle('/lien-he')} to="/lien-he">{t('contact')}</Link>
                    </nav>

                    {/* 3. Utilities */}
                    <div className="flex items-center space-x-4 md:space-x-6 shrink-0">

                        {/* Search Bar */}
                        <div className="hidden xl:flex items-center bg-[#122e1b]/60 px-4 py-2 rounded-full border border-[#c9a227]/30 w-56 md:w-64 focus-within:border-[#c9a227] shadow-inner transition-colors">
                            <span className="material-symbols-outlined text-[#e8dfc0]/70 text-xl">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm text-[#f9f5ea] placeholder:text-[#f9f5ea]/50 w-full ml-2 outline-none"
                                placeholder={t('search')}
                                type="text"
                                value={searchVal}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Language Selector */}
                        <div
                            className="flex items-center gap-1.5 md:gap-2 cursor-pointer group relative py-2"
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            onMouseLeave={() => setIsLangOpen(false)}
                        >
                            <img alt={langCode} className="w-5 h-3 md:w-6 md:h-4 object-cover rounded-sm shadow-sm" src={flagSrc} />
                            <span className="text-[11px] md:text-xs font-bold text-white uppercase hidden sm:block">{langCode}</span>

                            {/* Dropdown Languages */}
                            <div className={`absolute top-full right-[-30px] md:right-0 mt-2 w-36 bg-[#1a3d24] border border-[#c9a227]/20 shadow-xl rounded-xl overflow-hidden transition-all duration-300 z-50 transform origin-top-right ${isLangOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:scale-100'}`}>
                                <button onClick={(e) => { e.stopPropagation(); setLanguage('vi'); }} className="w-full text-left px-4 py-3 hover:bg-[#122e1b] flex items-center gap-3 text-sm text-[#e8dfc0] font-medium transition-colors border-b border-[#c9a227]/10">
                                    <img src={flags.vi} alt="VN" className="w-5 h-3.5 shadow-sm rounded-sm object-cover" /> Tiếng Việt
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setLanguage('en'); }} className="w-full text-left px-4 py-3 hover:bg-[#122e1b] flex items-center gap-3 text-sm text-[#e8dfc0] font-medium transition-colors border-b border-[#c9a227]/10">
                                    <img src={flags.en} alt="US" className="w-5 h-3.5 shadow-sm rounded-sm object-cover" /> English
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setLanguage('zh'); }} className="w-full text-left px-4 py-3 hover:bg-[#122e1b] flex items-center gap-3 text-sm text-[#e8dfc0] font-medium transition-colors">
                                    <img src={flags.zh} alt="CN" className="w-5 h-3.5 shadow-sm rounded-sm object-cover" /> 中文
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden flex items-center">
                            <button
                                className="material-symbols-outlined text-[#e8dfc0] hover:text-white text-[26px] ml-1 focus:outline-none mt-1 transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? 'close' : 'menu'}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-[#1a3d24]/98 backdrop-blur-md shadow-xl border-t border-[#c9a227]/20 flex flex-col px-6 py-6 gap-6">
                        <Link to="/gioi-thieu" onClick={() => setIsMenuOpen(false)} className={getLinkStyle('/gioi-thieu')}>{t('about')}</Link>
                        <Link to="/san-pham" onClick={() => setIsMenuOpen(false)} className={getLinkStyle('/san-pham')}>{t('products')}</Link>
                        <Link to="/cam-nang" onClick={() => setIsMenuOpen(false)} className={getLinkStyle('/cam-nang')}>{t('handbook')}</Link>
                        <Link to="/lien-he" onClick={() => setIsMenuOpen(false)} className={getLinkStyle('/lien-he')}>{t('contact')}</Link>

                        <div className="bg-[#122e1b]/80 px-4 py-3 rounded-xl flex items-center gap-2 mt-2 border border-[#c9a227]/30 shadow-inner">
                            <span className="material-symbols-outlined text-[#e8dfc0]/70 text-lg">search</span>
                            <input
                                type="text"
                                placeholder={t('search')}
                                className="bg-transparent outline-none text-sm w-full text-white placeholder:text-[#e8dfc0]/50"
                                value={searchVal}
                                onChange={handleSearchChange}
                            />
                        </div>

                    </div>
                )}
            </header>

            {/* Added spacer to prevent content skipping due to fixed header */}
            <div className="h-20"></div>
        </>
    );
}
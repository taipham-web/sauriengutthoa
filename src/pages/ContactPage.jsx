// src/pages/ContactPage.jsx
import { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus(t('statusSending'));

      // Gui email qua EmailJS
      const serviceID = 'service_ihos5uc';
      // Bạn cần THAY THẾ bằng Template ID và Public Key của bạn
      const templateID = 'template_bkjpksi';
      const publicKey = 'WdNwGlA9XenQtu8Rg';

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        message: formData.message,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      await addDoc(collection(db, "contact_requests"), { ...formData, createdAt: new Date() });
      setStatus(t('statusSuccess'));
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setStatus(t('statusError'));
    }
  };

  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-10 font-sans">
      <SEO 
        title={t('contactTitle', { defaultValue: 'Liên Hệ' })} 
        description="Liên hệ Vựa Sầu Riêng Út Thoa để đặt hàng sỉ, lẻ hoặc hợp tác kinh doanh. Hotline: 0349 323 539."
      />
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4 uppercase tracking-wide">
          {t('contactTitle')}
        </h1>
        <p className="text-gray-600 text-lg">{t('contactSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        <ContactCard 
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>} 
            title={t('fb_title')} desc={t('fb_desc')} btnText={t('fb_btn')} color="#1877F2" link="https://www.facebook.com/SauRiengUtThoa/" 
        />
        <ContactCard 
            icon={<svg id="svg_zalo_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 614.501 613.667" xml:space="preserve" className="w-8 h-8">
            <path fill="#FFFFFF" d="M464.721,301.399c-13.984-0.014-23.707,11.478-23.944,28.312c-0.251,17.771,9.168,29.208,24.037,29.202   c14.287-0.007,23.799-11.095,24.01-27.995C489.028,313.536,479.127,301.399,464.721,301.399z" />
            <path fill="#FFFFFF" d="M291.83,301.392c-14.473-0.316-24.578,11.603-24.604,29.024c-0.02,16.959,9.294,28.259,23.496,28.502   c15.072,0.251,24.592-10.87,24.539-28.707C315.214,313.318,305.769,301.696,291.83,301.392z" />
            <path fill="#FFFFFF" d="M310.518,3.158C143.102,3.158,7.375,138.884,7.375,306.3s135.727,303.142,303.143,303.142   c167.415,0,303.143-135.727,303.143-303.142S477.933,3.158,310.518,3.158z M217.858,391.083   c-33.364,0.818-66.828,1.353-100.133-0.343c-21.326-1.095-27.652-18.647-14.248-36.583c21.55-28.826,43.886-57.065,65.792-85.621   c2.546-3.305,6.214-5.996,7.15-12.705c-16.609,0-32.784,0.04-48.958-0.013c-19.195-0.066-28.278-5.805-28.14-17.652   c0.132-11.768,9.175-17.329,28.397-17.348c25.159-0.026,50.324-0.06,75.476,0.026c9.637,0.033,19.604,0.105,25.304,9.789   c6.22,10.561,0.284,19.512-5.646,27.454c-21.26,28.497-43.015,56.624-64.559,84.902c-2.599,3.41-5.119,6.88-9.453,12.725   c23.424,0,44.123-0.053,64.816,0.026c8.674,0.026,16.662,1.873,19.941,11.267C237.892,379.329,231.368,390.752,217.858,391.083z    M350.854,330.211c0,13.417-0.093,26.841,0.039,40.265c0.073,7.599-2.599,13.647-9.512,17.084   c-7.296,3.642-14.71,3.028-20.304-2.968c-3.997-4.281-6.214-3.213-10.488-0.422c-17.955,11.728-39.908,9.96-56.597-3.866   c-29.928-24.789-30.026-74.803-0.211-99.776c16.194-13.562,39.592-15.462,56.709-4.143c3.951,2.619,6.201,4.815,10.396-0.053   c5.39-6.267,13.055-6.761,20.271-3.357c7.454,3.509,9.935,10.165,9.776,18.265C350.67,304.222,350.86,317.217,350.854,330.211z    M395.617,369.579c-0.118,12.837-6.398,19.783-17.196,19.908c-10.779,0.132-17.593-6.966-17.646-19.512   c-0.179-43.352-0.185-86.696,0.007-130.041c0.059-12.256,7.302-19.921,17.896-19.222c11.425,0.752,16.992,7.448,16.992,18.833   c0,22.104,0,44.216,0,66.327C395.677,327.105,395.828,348.345,395.617,369.579z M463.981,391.868   c-34.399-0.336-59.037-26.444-58.786-62.289c0.251-35.66,25.304-60.713,60.383-60.396c34.631,0.304,59.374,26.306,58.998,61.986   C524.207,366.492,498.534,392.205,463.981,391.868z" />
          </svg>} 
            title={t('zalo_title')} desc={t('zalo_desc')} btnText={t('zalo_btn')} color="#0068FF" link="https://zalo.me/0349323539" 
        />
        <ContactCard 
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>} 
            title={t('email_title')} desc={t('email_desc')} btnText={t('email_btn')} color="#ea4335" link="mailto:thuyduyle3004@gmail.com" 
        />
        <ContactCard 
            icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>} 
            title={t('tiktok_title')} desc={t('tiktok_desc')} btnText={t('tiktok_btn')} color="#000000" link="https://www.tiktok.com/@thuyduy8756" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="border-2 border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">{t('formTitle')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder={t('formName')} required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#f1ad31]" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" placeholder={t('formPhone')} required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#f1ad31]" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <input type="email" placeholder={t('formEmail')} required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#f1ad31]" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <textarea placeholder={t('formMsg')} rows="4" required className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#f1ad31]" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
            <button type="submit" className="w-full bg-[#f1ad31] text-white font-bold py-3 rounded-lg hover:bg-[#d99628] transition-colors cursor-pointer">{t('formSubmit')}</button>
            {status && <p className="text-center mt-4 font-medium text-amber-700">{status}</p>}
          </form>
        </div>

        <div className="border-2 border-gray-100 rounded-2xl p-2 shadow-sm flex flex-col">
          <div className="bg-gray-200 h-80 rounded-xl mb-6 overflow-hidden relative">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.656385559603!2d106.19562129732392!3d10.208534192545352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa1d46263d6fb%3A0xb9e43a21d2dc4119!2zVuG7sWEgU-G6p3UgUmnDqm5nIMOadCBUaG9h!5e0!3m2!1svi!2s!4v1778421072162!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bản đồ Vựa Sầu Riêng Út Thoa"></iframe>
            <a href="https://www.google.com/maps/search/?api=1&query=V%C6%B0%CC%A3a+S%E1%BA%A7u+Ri%C3%AAng+%C3%9At+Thoa%2C+V%C4%A9nh+Th%C3%A0nh%2C+V%C4%A9nh+Long%2C+Vi%E1%BB%87t+Nam" target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md text-xs font-bold text-[#1a365d] hover:bg-gray-100 transition-colors">{t('openMaps')}</a>
          </div>
          <div className="px-6 pb-6 space-y-3">
            <p className="text-gray-700"><span className="font-bold text-[#1a365d]">{t('address')}</span> Tân Thạnh, Tân Thiềng, Chợ Lách, Bến Tre</p>
            <p className="text-gray-700"><span className="font-bold text-[#1a365d]">{t('hotline')}</span> 0349 323 539</p>
            <p className="text-gray-700"><span className="font-bold text-[#1a365d]">Email:</span> thuyduyle3004@gmail.com</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=V%C6%B0%CC%A3a+S%E1%BA%A7u+Ri%C3%AAng+%C3%9At+Thoa%2C+V%C4%A9nh+Th%C3%A0nh%2C+V%C4%A9nh+Long%2C+Vi%E1%BB%87t+Nam" target="_blank" rel="noopener noreferrer" className="mt-4 w-full border-2 border-[#f1ad31] text-[#f1ad31] font-bold py-2 rounded-lg text-center inline-block hover:bg-[#f1ad31] hover:text-white transition-all">{t('getDirection')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, desc, btnText, color, link }) {
  return (
    <div className="border-2 border-gray-100 rounded-2xl p-8 text-center hover:shadow-md transition-shadow flex flex-col items-center group">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110 shadow-md overflow-hidden" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-[#1a365d] mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{desc}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto px-6 py-2 rounded-lg text-white font-medium text-sm transition-transform hover:scale-105 inline-block w-full text-center" style={{ backgroundColor: '#f1ad31' }}>{btnText}</a>
    </div>
  );
}
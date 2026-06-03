// src/pages/ContactPage.jsx
import { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

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
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4 uppercase tracking-wide">
          {t('contactTitle')}
        </h1>
        <p className="text-gray-600 text-lg">{t('contactSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        <ContactCard imgSrc="/facebook.png" fallbackIcon="f" title={t('fb_title')} desc={t('fb_desc')} btnText={t('fb_btn')} color="#1877F2" link="https://www.facebook.com/SauRiengUtThoa/" />
        <ContactCard imgSrc="/zalo.jpg" fallbackIcon="Z" title={t('zalo_title')} desc={t('zalo_desc')} btnText={t('zalo_btn')} color="#0068FF" link="https://zalo.me/0349323539" />
        <ContactCard imgSrc="/gmail.jpg" fallbackIcon="M" title={t('email_title')} desc={t('email_desc')} btnText={t('email_btn')} color="#1a365d" link="mailto:thuyduyle3004@gmail.com" />
        <ContactCard imgSrc="/tiktok.jpg" fallbackIcon="T" title={t('tiktok_title')} desc={t('tiktok_desc')} btnText={t('tiktok_btn')} color="#000000" link="https://www.tiktok.com/@thuyduy8756" />
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

function ContactCard({ imgSrc, fallbackIcon, title, desc, btnText, color, link }) {
  return (
    <div className="border-2 border-gray-100 rounded-2xl p-8 text-center hover:shadow-md transition-shadow flex flex-col items-center group">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110 overflow-hidden" style={{ backgroundColor: color }}>
        {imgSrc ? <img src={imgSrc} alt={title} className="w-full h-full object-cover" /> : <span className="text-3xl font-bold uppercase">{fallbackIcon}</span>}
      </div>
      <h3 className="font-bold text-lg text-[#1a365d] mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{desc}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto px-6 py-2 rounded-lg text-white font-medium text-sm transition-transform hover:scale-105 inline-block w-full text-center" style={{ backgroundColor: '#f1ad31' }}>{btnText}</a>
    </div>
  );
}
import React from 'react';

export default function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-1 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      {/* Gọi điện */}
      <a href="tel:0349323539" className="flex flex-col items-center justify-center w-1/3 group">
        <div className="bg-green-100 text-green-600 p-2.5 rounded-full mb-1 group-hover:bg-green-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-gray-700">Gọi điện</span>
      </a>

      {/* Chỉ đường */}
      <a href="https://www.google.com/maps/dir//V%E1%BB%B1a+S%E1%BA%A7u+Ri%C3%AAng+%C3%9At+Thoa,+V%C4%A9nh+Th%C3%A0nh,+V%C4%A9nh+Long,+Vi%E1%BB%87t+Nam/@10.8813189,106.8060391,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x310aa1d46263d6fb:0xb9e43a21d2dc4119!2m2!1d106.1992626!2d10.2085325?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-1/3 border-x border-gray-100 group">
        <div className="bg-amber-100 text-amber-500 p-2.5 rounded-full mb-1 group-hover:bg-amber-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-gray-700">Chỉ đường</span>
      </a>

      {/* Zalo */}
      <a href="https://zalo.me/0349323539" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-1/3 group">
        <div className="bg-blue-100 text-blue-500 p-2.5 rounded-full mb-1 group-hover:bg-blue-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-gray-700">Zalo</span>
      </a>
    </div>
  );
}

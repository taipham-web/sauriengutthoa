import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  // Lấy URL mặc định từ web của bạn, hoặc URL được truyền vào
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  // Ảnh mặc định nếu bài viết không có ảnh
  const defaultImage = "/logo.jpg"; 

  return (
    <Helmet>
      {/* Thẻ SEO cơ bản */}
      <title>{`Sầu Riêng Út Thoa - ${title}`}</title>
      <meta name="description" content={description} />

      {/* Thẻ SEO cho Facebook (Open Graph) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={`Sầu Riêng Út Thoa - ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Thẻ SEO cho Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Sầu Riêng Út Thoa - ${title}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;

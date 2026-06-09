import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://sauriengutthoa.vn';

/**
 * SEO component — inject meta tags, Open Graph, Twitter Card, và JSON-LD schema.
 * @param {string}  title       - Tiêu đề trang (sẽ được append " | Sầu Riêng Út Thoa")
 * @param {string}  description - Mô tả trang
 * @param {string}  image       - URL ảnh đại diện (og:image)
 * @param {string}  url         - Canonical URL tuyệt đối (mặc định lấy từ window.location)
 * @param {string}  type        - og:type (mặc định 'website', dùng 'product' cho trang sản phẩm)
 * @param {object}  product     - Đối tượng sản phẩm để render Product JSON-LD schema
 */
const SEO = ({ title, description, image, url, type = 'website', product = null }) => {
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : SITE_URL);
  const defaultImage = `${SITE_URL}/logo.jpg`;
  const fullTitle = `${title} | Sầu Riêng Út Thoa`;
  const ogImage = image || defaultImage;

  return (
    <Helmet>
      {/* ── Cơ bản ─────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph (Facebook, Zalo share) ──────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content="Sầu Riêng Út Thoa" />

      {/* ── Twitter Card ────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* ── Product JSON-LD Schema (chỉ hiển thị khi có product) ── */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.desc,
            image: product.imgSrc || product.image || defaultImage,
            brand: {
              '@type': 'Brand',
              name: 'Vựa Sầu Riêng Út Thoa',
            },
            offers: {
              '@type': 'Offer',
              availability: product.isOutOfStock
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
              priceCurrency: 'VND',
              price: '0',
              priceValidUntil: '2027-12-31',
              seller: {
                '@type': 'Organization',
                name: 'Vựa Sầu Riêng Út Thoa',
                url: SITE_URL,
              },
            },
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

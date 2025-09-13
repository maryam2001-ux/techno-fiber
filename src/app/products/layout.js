// app/products/layout.js
import Script from "next/script";

export async function generateMetadata() {
  const title = "Our Fiberglass Products | TechnoFiber";
  const description =
    "Explore our wide range of fiberglass (FRP) products including grating, handrails, kiosks, manhole covers, tanks, metro components, and more. Durable and trusted for industrial, civil, and urban projects.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://www.technofiberegypt.com/products",
      siteName: "TechnoFiber",
      images: [
        {
          url: "https://www.technofiberegypt.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Fiberglass Products",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    // ✅ إضافة الـ favicon والأيقونات
    icons: {
      icon: [
        { url: "/Fiberglass-logo.webp", sizes: "32x32", type: "image/webp" },
        { url: "/Fiberglass-logo.webp", sizes: "16x16", type: "image/webp" },
      ],
      shortcut: "/Fiberglass-logo.webp",
      apple: [
        { url: "/Fiberglass-logo.webp", sizes: "180x180", type: "image/webp" },
      ],
    },
  };
}

export default function ProductsLayout({ children }) {
  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "TechnoFiber",
            image: "https://www.technofiberegypt.com/logo.png",
            url: "https://www.technofiberegypt.com",
            email: "info@technofiberegypt.com",
            telephone: "+20-100-000-0000",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Industrial Zone, Cairo",
              addressLocality: "Cairo",
              postalCode: "12511",
              addressCountry: "EG",
            },
            openingHours: "Mo-Fr 09:00-17:00",
            sameAs: [
              "https://facebook.com/technofiber",
              "https://linkedin.com/company/technofiber",
            ],
          }),
        }}
      />

      {children}
    </>
  );
}

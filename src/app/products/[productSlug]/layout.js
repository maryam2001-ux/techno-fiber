// app/products/layout.js
import Script from "next/script";

// ✅ Metadata (SEO + OpenGraph)
export async function generateMetadata() {
  const title = "Fiberglass Products | TechnoFiber";
  const description =
    "Discover high-quality fiberglass (FRP) products including grating, handrails, kiosks, manhole covers, tanks, metro components, and playground equipment. Trusted for industrial, urban, and civil projects.";

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
          alt: "TechnoFiber Fiberglass Products",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.technofiberegypt.com/og-image.jpg"],
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
      {/* ✅ LocalBusiness Schema (Structured Data) */}
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

      {/* ✅ Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.technofiberegypt.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://www.technofiberegypt.com/products",
              },
            ],
          }),
        }}
      />

      {children}
    </>
  );
}

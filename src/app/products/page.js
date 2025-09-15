// app/products/page.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useTranslations } from "next-intl";

// --- صور المنتجات ---
const productImages = {
  grating: "/products/grating/Fiberglass-grating-2.webp",
  handrail: "/products/handrail/Fiberglass-handrail-6.webp",
  pultrusion: "/products/pultrusion/Fiberglass-pultrusion-4.webp",
  kiosks: "/products/kishok/Fiberglass-kishok.webp",
  manhole: "/products/manhole-cover/Fiberglass-manhole-cover-6.webp",
  delivery: "/products/delivery/Fiberglass-delivery.webp",
  metro: "/products/metro/Fiberglass-internal-component-metro-railway-12.webp",
  tanks: "/products/tank/Fiberglass-Tanks-4.webp",
  playground: "/products/Playground-Equipment/Fiberglass-playground-2.webp",
};

// --- أقسام ثابتة ---
const sections = {
  industrial: ["grating", "handrail", "pultrusion"],
  urban: ["kiosks", "manhole", "delivery"],
  civil: ["metro", "tanks", "playground"],
};

// 🔧 دالة تجيب القسم اللي ينتمي له المنتج
const getSectionSlug = (slug) => {
  for (const [section, items] of Object.entries(sections)) {
    if (items.includes(slug)) return section;
  }
  return null;
};

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- بطاقة منتج ---
const ProductCard = ({ slug, sectionSlug, t }) => (
  <motion.div
    variants={cardVariants}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2 flex flex-col"
  >
    <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden rounded-t-2xl">
      <Image
        src={productImages[slug] || "/products/default.webp"}
        alt={t(`products.${sectionSlug}.items.${slug}.title`)}
        width={400}
        height={300}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
      <div>
        <h4 className="text-lg sm:text-xl font-bold text-[var(--color-darker)] mb-1">
          {t(`products.${sectionSlug}.items.${slug}.title`)}
        </h4>
        <p className="text-[var(--grey-dark)] text-xs sm:text-sm leading-relaxed">
        {t(`products.${sectionSlug}.items.${slug}.brief`)}
        </p>
      </div>
      <Link
        href={`/products/${slug}`}
        className="mt-4 py-2 px-3 sm:px-4 bg-[var(--color-primary)] text-white font-medium text-xs sm:text-sm rounded-full text-center transition-colors duration-300 hover:bg-[var(--color-darker)]"
      >
        {t("buttons.viewDetails")}
      </Link>
    </div>
  </motion.div>
);

// --- قسم المنتجات ---
const ProductSectionCategory = ({ sectionSlug, t }) => (
  <section className="max-w-6xl mx-auto my-12 sm:my-16 px-4 sm:px-6 md:px-0">
    <motion.h3
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-darker)] mb-3 border-b-4 border-[var(--color-primary)] inline-block pb-2"
    >
      {t(`products.${sectionSlug}.title`)}
    </motion.h3>
    <p className="text-[var(--grey-dark)] text-sm sm:text-base mb-8 max-w-3xl">
      {t(`products.${sectionSlug}.desc`)}
    </p>

    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {sections[sectionSlug].map((slug) => (
        <ProductCard key={slug} slug={slug} sectionSlug={sectionSlug} t={t} />
      ))}
    </motion.div>
  </section>
);

// --- صفحة المنتجات الرئيسية ---
export default function ProductsPage() {
  const t = useTranslations("Products");

  // ✅ بناء JSON-LD ItemList ديناميكي
 const allProducts = Object.values(sections).flat();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fiberglass Products",
    url: "https://www.technofiberegypt.com/products",
    description:
      "High-quality fiberglass products for industrial, civil, and urban use.",
    itemListElement: allProducts.map((slug, index) => {
      const sectionSlug = getSectionSlug(slug);
      return {
        "@type": "Product",
        position: index + 1,
        name: t(`products.${sectionSlug}.items.${slug}.title`),
        description: t(`products.${sectionSlug}.items.${slug}.brief`),
        url: `https://www.technofiberegypt.com/products/${slug}`,
        image: `https://www.technofiberegypt.com${productImages[slug]}`,
        category: sectionSlug,
        brand: {
          "@type": "Brand",
          name: "TechnoFiber",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "LE",
          price: "0.00", 
          availability: "https://schema.org/InStock",
        },
      };
    }),
  };

  return (
    <>
      {/* ✅ SEO Structured Data - ItemList */}
      <Script
        id="products-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-[var(--grey-light)]">
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-6 md:px-0">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--color-darker)] leading-tight mb-4"
          >
            {t("main.title")}
            
          </motion.h1>
          <p className="text-[var(--grey-dark)] text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-3xl mx-auto">
            {t("main.subtitle")}
          </p>
        </div>

        {Object.keys(sections).map((slug) => (
          <ProductSectionCategory key={slug} sectionSlug={slug} t={t} />
        ))}
      </section>
    </>
  );
}

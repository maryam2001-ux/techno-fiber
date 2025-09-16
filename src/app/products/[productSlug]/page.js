"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image"; // ✅ تحسين الصور
import Script from "next/script"; // ✅ مهم للـ JSON-LD

// --- بيانات المنتجات حسب en.json ---
const productsList = {
  grating: [
    { slug: "grating-1", img: "/products/grating/Fiberglass-grating.webp" },
    { slug: "grating-2", img: "/products/grating/Fiberglass-grating-6.webp" },
  ],
  handrail: [
    { slug: "handrail-1", img: "/products/handrail/Fiberglass-handrail-rounded-7.webp" },
    { slug: "handrail-2", img: "/products/handrail/Fiberglass-handrail-9.webp" },
  ],
  pultrusion: [
    { slug: "pultrusion-1", img: "/products/pultrusion/Fiberglass-pultrusion.webp" },
  ],
  kiosks: [
    { slug: "kiosk-1", img: "/products/kishok/Fiberglass-kishok-4.webp" },
    { slug: "kiosk-2", img: "/products/kishok/Fiberglass-kishok-9.webp" },
  ],
  manhole: [
    { slug: "manhole-1", img: "/products/manhole-cover/Fiberglass-manhole-cover-6.webp" },
    { slug: "manhole-2", img: "/products/manhole-cover/Fiberglass-manhole-cover-8.webp" },
  ],
  delivery: [
    { slug: "delivery-1", img: "/products/delivery/Fiberglass-delivery.webp" },
  ],
  metro: [
    { slug: "metro-1", img: "/products/metro/Fiberglass-internal-component-metro-railway-12.webp" },
  ],
  tanks: [
    { slug: "tank-1", img: "/products/tank/Fiberglass-Tanks-4.webp" },
    { slug: "tank-2", img: "/products/tank/Fiberglass-Tanks-9.webp" },
    { slug: "tank-3", img: "/products/tank/Fiberglass-Tanks-11.webp" },
    { slug: "tank-4", img: "/products/tank/Fiberglass-Tanks-12.webp" },
    { slug: "tank-5", img: "/products/tank/Fiberglass-Tanks-13.webp" },
  ],
  playground: [
    { slug: "playground-1", img: "/products/Playground-Equipment/Fiberglass-playground-2.webp" },
    { slug: "playground-2", img: "/products/Playground-Equipment/Fiberglass-playground-3.webp" },
  ],
};

// --- حركات Framer Motion للكارتات ---
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- كارت منتج متظبط ---
const ProductCard = ({ product, productSlug, t, index }) => (
  <motion.article
    variants={cardVariants}
    className="bg-white border-2 border-gray-200 hover:border-[var(--color-primary)] transition-all duration-300 group flex flex-col rounded-lg shadow-sm hover:shadow-md overflow-hidden max-w-sm mx-auto lg:max-w-none"
  >
    {/* الصورة - متوسطة وفيها الصورة كاملة */}
    <div className="relative w-full h-48 sm:h-52 flex items-center justify-center bg-gray-50 overflow-hidden">
      <Image
    src={product.img}
    alt={t(`categories.${product.slug}.title`)}
    loading={index === 0 ? "eager" : "lazy"}
    decoding="async"
    layout="fill" // ← مهم جدًا!
    objectFit="contain" // ← مهم جدًا! لضمان التكبير دون تشويه
    className="group-hover:scale-105 transition-transform duration-500"
  />
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
        <span className="text-[var(--color-darker)] text-xs font-semibold">
          #{product.slug.split("-")[1]}
        </span>
      </div>
    </div>

    {/* المعلومات */}
    <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
      <div>
        <h2 className="text-[var(--color-darker)] text-lg font-bold mb-2 leading-tight">
          {t(`categories.${product.slug}.title`)}
        </h2>
        <div className="w-12 h-1 bg-[var(--color-primary)] rounded-full mb-3"></div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {t(`categories.${product.slug}.items.desc`)}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href={`/products/${productSlug}/${product.slug}`}
          aria-label={`Order ${t(`categories.${product.slug}.title`)}`}
          className="inline-flex items-center justify-center py-2.5 px-5 bg-[var(--color-primary)] hover:bg-[var(--color-darker)] text-white text-sm font-semibold rounded-sm transition-colors duration-300 uppercase tracking-wide w-full"
        >
          {t("buttons.orderNow")}
        </Link>
        <div className="mt-2 text-center">
          <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
            Industrial Solutions
          </span>
        </div>
      </div>
    </div>
  </motion.article>
);

// --- الصفحة الرئيسية للقسم ---
export default function ProductSlugPage() {
  const { productSlug } = useParams();
  const t = useTranslations("ProductSlugPage");

  const products = productsList[productSlug] || [];
  const categoryTitle =
    t(`categories.${productSlug}.title`) || t("categories.default.title");



  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-[var(--grey-light)] min-h-screen"
      aria-labelledby="category-title"
    >
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 max-w-7xl">
        {/* الهيدر */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[var(--color-primary)]"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-[var(--color-primary)] mx-3 sm:mx-4 transform rotate-45"></div>
            <div className="w-12 sm:w-16 h-1 bg-[var(--color-primary)]"></div>
          </div>

          <h1
            id="category-title"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--color-darker)] mb-3 sm:mb-4 px-2"
          >
            {categoryTitle}
          </h1>

          <p className="text-gray-600 max-w-full sm:max-w-2xl md:max-w-3xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            {t("heroSubtitle")}
          </p>
        </motion.header>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 xl:gap-8">
          <AnimatePresence>
            {products.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                productSlug={productSlug}
                t={t}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* قسم الثقة */}
        <motion.section
          aria-labelledby="trust-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto">
            <h2
              id="trust-section"
              className="text-xl sm:text-2xl font-bold text-[var(--color-darker)] mb-3 sm:mb-4"
            >
              {t("trustSection.title")}
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              {t("trustSection.description")}
            </p>
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-sm text-gray-500">
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-center sm:text-left">{t("trustSection.badges.iso")}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-center sm:text-left">{t("trustSection.badges.government")}</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-center sm:text-left">{t("trustSection.badges.quality")}</span>
              </li>
            </ul>
          </div>
        </motion.section>
      </div>


        <Script
  id="product-slug-schema"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: categoryTitle,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.technofiberegypt.com/products/${productSlug}/${product.slug}`,
        item: {
          "@type": "Product",
          name: t(`categories.${product.slug}.title`),
          image: `https://www.technofiberegypt.com${product.img}`,
          description: t(`categories.${product.slug}.items.desc`),
        },
      })),
    }),
  }}
/>


    </section>
  );
}
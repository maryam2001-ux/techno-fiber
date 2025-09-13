"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

// ✅ بيانات المنتجات
import { productsList } from "@/data/productsList";

export default function ProductItemClient() {
  const { productSlug, itemSlug } = useParams();
  const locale = useLocale(); // 👈 اللغة الحالية

  const t = useTranslations("ProductDetailPage");

  // --- Sections ---
  const sections = {
    industrial: ["grating", "handrail", "pultrusion"],
    urban: ["kiosks", "manhole", "delivery"],
    civil: ["metro", "tanks", "playground"],
  };
  const findSectionOf = (slug) =>
    Object.entries(sections).find(([_, arr]) => arr.includes(slug))?.[0] ??
    "industrial";

  const section = findSectionOf(productSlug);

  // --- Product lookup ---
  const foundProduct = productsList?.[productSlug]?.find(
    (it) => it.slug === itemSlug
  );

  // Handle case where product is not found
  if (!foundProduct) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {locale === "ar" ? "المنتج غير موجود" : "Product Not Found"}
        </h1>
        <p className="mt-4 text-gray-600">
          {locale === "ar"
            ? "لم نتمكن من العثور على المنتج الذي تبحث عنه."
            : "We couldn't find the product you're looking for."}
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block text-[var(--color-primary)] hover:underline"
        >
          {locale === "ar" ? "العودة إلى المنتجات" : "Go back to products"}
        </Link>
      </div>
    );
  }

  // --- Gallery ---
  const gallery = foundProduct?.img
    ? Array.isArray(foundProduct.img)
      ? [...foundProduct.img]
      : [foundProduct.img]
    : [];
  const finalGallery =
    gallery.length > 0 ? gallery : ["/products/FRP-Ladder.webp"];

  // --- Title & Description ---
  const itemTitle =
    typeof foundProduct?.title?.[locale] === "string"
      ? foundProduct.title[locale]
      : typeof foundProduct?.title === "string"
      ? foundProduct.title
      : itemSlug?.replace(/-/g, " ") || "Product";

  const itemDesc =
    typeof foundProduct?.description?.[locale] === "string"
      ? foundProduct.description[locale]
      : "High-quality fiberglass product for various applications.";

  // --- Features ---
  const features =
    (foundProduct?.features &&
      typeof foundProduct.features === "object" &&
      Array.isArray(foundProduct.features[locale]) &&
      foundProduct.features[locale].length > 0)
      ? foundProduct.features[locale]
      : ["High quality", "Durable", "Reliable"];

  // --- Details ---
  const details = {
    dimensions:
      foundProduct?.details?.dimensions?.[locale] || "Various sizes available",
    materials:
      foundProduct?.details?.materials?.[locale] ||
      "Fiberglass Reinforced Plastic",
    applications:
      foundProduct?.details?.applications?.[locale] || "Industrial, Commercial",
    standards:
      foundProduct?.details?.standards?.[locale] || "Quality certified",
    warranty: foundProduct?.details?.warranty?.[locale] || "Standard warranty",
    installation:
      foundProduct?.details?.installation?.[locale] ||
      "Professional installation available",
  };

  // --- Documents ---
  const documents = foundProduct?.documents || [];

  // --- Final product object ---
  const product = {
    title: itemTitle,
    desc: itemDesc,
    gallery: finalGallery,
    img: finalGallery[0],
    features,
    details,
    documents,
  };

  // ✅ تأمين useState - البدء بأول صورة من الـ gallery
  const [mainImage, setMainImage] = useState(finalGallery[0]);

  // ✅ تأمين useEffect - إعادة تعيين عند تغيير المنتج
  useEffect(() => {
    if (finalGallery && finalGallery.length > 0) {
      setMainImage(finalGallery[0]);
    }
  }, [productSlug, itemSlug]); // إزالة product من dependencies لتجنب infinite loop

  // --- Animations ---
  const listContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const listItem = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      {/* SECTION 1: Product Overview */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link
              href="/products"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {locale === "ar" ? "المنتجات" : "Products"}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/products/${productSlug}`}
              className="hover:text-[var(--color-primary)] transition-colors capitalize"
            >
              {productSlug?.replace(/-/g, " ")}
            </Link>
            <span aria-hidden="true">/</span>
            <span
              className="text-[var(--color-primary)] font-medium"
              aria-current="page"
            >
              {product.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Product Gallery */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  className="object-contain p-4 sm:p-8"
                  priority
                  key={mainImage} // ✅ إضافة key للتأكد من إعادة تحميل الصورة
                />
              </motion.div>

              {/* Thumbnails */}
              {finalGallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {finalGallery.map((img, i) => (
                    <button
                      key={`thumb-${i}-${img}`} // ✅ key أفضل
                      onClick={() => {
                        console.log('Thumbnail clicked:', img); // ✅ للتشخيص
                        setMainImage(img);
                      }}
                      aria-label={`View image ${i + 1}`}
                      className={`relative aspect-square border-2 rounded-md overflow-hidden transition-all duration-200 hover:shadow-md ${
                        mainImage === img
                          ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20"
                          : "border-gray-200 hover:border-[var(--color-primary)]/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} thumbnail ${i + 1}`}
                        fill
                        className="object-contain p-2"
                        loading="lazy" // ✅ lazy loading للـ thumbnails
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-darker)] leading-tight hyphens-auto">
                  {product.title}
                </h1>
                <div className="h-1 w-16 bg-[var(--color-primary)]"></div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed hyphens-auto">
                  {product.desc}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-darker)]">
                  {locale === "ar" ? "المميزات الرئيسية" : "Key Features"}
                </h2>
                <motion.ul
                  variants={listContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {features.map((feature, i) => (
                    <motion.li
                      key={i}
                      variants={listItem}
                      className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg"
                    >
                      <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-3 flex-shrink-0"></span>
                      <span className="text-gray-700 font-medium hyphens-auto">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Technical Specifications */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-darker)] mb-4">
                {locale === "ar"
                  ? "المواصفات الفنية"
                  : "Technical Specifications"}
              </h2>
              <div className="h-1 w-24 bg-[var(--color-primary)] mx-auto"></div>
            </motion.div>

            {/* Details */}
            {product.details && (
              <motion.dl
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                {Object.entries(product.details).map(([key, value], i, arr) => (
                  <div
                    key={key}
                    className={`flex items-center gap-6 p-5 sm:p-6 ${
                      i !== arr.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="text-2xl" aria-hidden="true">
                      📌
                    </div>
                    <div className="flex-1">
                      <dt className="font-semibold text-[var(--color-darker)] mb-1 capitalize hyphens-auto">
                        {key}
                      </dt>
                      <dd className="text-gray-700 hyphens-auto">{value}</dd>
                    </div>
                  </div>
                ))}
              </motion.dl>
            )}

            {/* Documents */}
            {product.documents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 sm:mt-12 text-center"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-darker)] mb-6">
                  {locale === "ar" ? "الوثائق الفنية" : "Technical Documents"}
                </h3>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {product.documents.map((doc, i) => (
                    <Link
                      key={i}
                      href={doc.link ?? "#"}
                      aria-label={`Download ${doc.name}`}
                      className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 bg-white border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-lg transition-all duration-200 shadow-sm text-sm sm:text-base"
                    >
                      <span aria-hidden="true">📄</span>
                      {doc.name ?? "Document"}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Contact CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            {/* Title */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                {t("contactPrompt")}
              </h2>
              <div className="h-1 w-16 sm:w-20 bg-white/40 mx-auto rounded-full"></div>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl" aria-hidden="true">📞</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {locale === "ar" ? "الهاتف" : "Phone"}
                </h3>
                <a
                  href={`tel:${t("contactPhone")}`}
                  className="block text-white hover:text-white/90 transition-colors font-medium text-base sm:text-lg"
                >
                  {t("contactPhone")}
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl" aria-hidden="true">✉️</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {locale === "ar" ? "البريد الإلكتروني" : "Email"}
                </h3>
                <a
                  href={`mailto:${t("contactEmail")}`}
                  className="block text-white hover:text-white/90 transition-colors font-medium text-base sm:text-lg break-words"
                >
                  {t("contactEmail")}
                </a>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl" aria-hidden="true">📍</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {locale === "ar" ? "الموقع" : "Location"}
                </h3>
                <p className="text-white/90 font-medium text-base sm:text-lg hyphens-auto">
                  {t("contactLocation")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
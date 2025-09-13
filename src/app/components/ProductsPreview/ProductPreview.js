"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { productsList } from "@/data/productsList";

const sections = {
  industrial: ["grating", "handrail", "pultrusion"],
  urban: ["kiosks", "manhole", "delivery"],
  civil: ["metro", "tanks", "playground"],
};

const buildPreviewProducts = () => {
  const previews = [];
  for (const [section, categories] of Object.entries(sections)) {
    categories.forEach((cat) => {
      if (productsList[cat] && productsList[cat].length > 0) {
        const firstProduct = productsList[cat][0];
        previews.push({
          section,
          category: cat,
          slug: firstProduct.slug,
          img: firstProduct.img[0],
          title: firstProduct.title,
          description: firstProduct.description,
        });
      }
    });
  }
  return previews;
};

export default function ProductPreview() {
  const t = useTranslations("ProductsPreview");
  const locale = useLocale(); // 👈 هنا بنجيب اللغة الحالية (en أو ar)
  const products = buildPreviewProducts();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProduct = products[currentIndex];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));

  return (
    <section
      className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 md:py-24 before:absolute before:inset-0 before:rounded-3xl before:border-8 before:border-gray-800/20 before:shadow-inner before:z-[-1]"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("featuredProducts")}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        
        {/* ✅ صورة المنتج */}
        <motion.div
          key={currentProduct?.img}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[300px] md:h-[450px]"
        >
          <Image
            src={currentProduct?.img}
            alt={currentProduct?.title[locale] || "Fiberglass Product"}
            fill
            priority={currentIndex === 0}
            className="object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* ✅ بيانات المنتج */}
        <motion.div
          key={currentProduct?.slug}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-darker)] mb-4">
            {currentProduct?.title[locale]}
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            {currentProduct?.description[locale]}
          </p>

          <Link
            href={`/products/${currentProduct?.category}/${currentProduct?.slug}`}
            className="inline-block px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-darker)] text-white text-center rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {t("viewProduct")}
          </Link>
        </motion.div>
      </div>

      {/* ✅ التحكم */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={goPrev}
          aria-label={t("prev")}
          className="p-3 rounded-full bg-gray-200 hover:bg-[var(--color-primary)] hover:text-white transition"
        >
          <FaArrowLeft />
        </button>

        <div className="flex space-x-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`${t("goToSlide")} ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[var(--color-primary)] scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label={t("next")}
          className="p-3 rounded-full bg-gray-200 hover:bg-[var(--color-primary)] hover:text-white transition"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

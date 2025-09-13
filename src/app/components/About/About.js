"use client";

import React from "react";
import { plus } from "hero-patterns";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image"; // ✅ تحسين الصور
import Link from "next/link";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const ctaVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.8, type: "tween", ease: "backOut" },
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-title" // ✅ تحسين Accessibility
      className="w-full py-16"
      style={{
        backgroundImage: plus("#AE75DA", 0.07),
        backgroundRepeat: "repeat",
      }}
    >
      {/* العنوان الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-4/5 md:w-2/5"
      >
        <h2
          id="about-title"
          className="py-2.5 my-10 text-center bg-[var(--color-darker)] text-white rounded text-2xl md:text-3xl"
        >
          {t("whyChooseTitle")}
        </h2>
      </motion.div>

      {/* المحتوى الرئيسي */}
      <div className="container px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
        {/* النص */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 text-center md:text-left space-y-6 max-w-lg"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-[var(--color-darker)]"
          >
            {t("title") ||
              "Techno Fiber – Egypt's Leading Fiberglass (FRP) Manufacturer"}
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-base leading-relaxed text-[var(--grey-dark)]"
          >
            {t("intro") ||
              "Techno Fiber is a market leader in Fiberglass (FRP) products in Egypt..."}
          </motion.p>

          <motion.h4
            variants={itemVariants}
            className="text-xl font-semibold text-[var(--color-darker)]"
          >
            {t("pultrusionTitle") || "Egypt's Only Full Pultrusion Line"}
          </motion.h4>

          <motion.p
            variants={itemVariants}
            className="text-base text-[var(--grey-dark)]"
          >
            {t("pultrusionText") ||
              "The only company in Egypt with a complete pultrusion line..."}
          </motion.p>

          <motion.h4
            variants={itemVariants}
            className="text-xl font-semibold text-[var(--color-darker)]"
          >
            {t("gratingTitle") || "Market Leader in Molded Grating"}
          </motion.h4>

          <motion.p
            variants={itemVariants}
            className="text-base text-[var(--grey-dark)]"
          >
            {t("gratingText") ||
              "Leading supplier in Egypt's molded grating industry..."}
          </motion.p>

          <motion.h4
            variants={itemVariants}
            className="text-xl font-semibold text-[var(--color-darker)]"
          >
            {t("bmcTitle")}
          </motion.h4>

          <motion.p
            variants={itemVariants}
            className="text-base text-[var(--grey-dark)]"
          >
            {t("bmcText")}
          </motion.p>

          {/* خط انتجات bmc  */}

          {/* زر الاتصال */}
          <motion.div variants={ctaVariants}>
            <Link
              href="#contact"
              scroll={true}
              aria-label={t("contactAriaLabel") || "Scroll to contact section"}
              className="inline-block px-6 py-3 rounded-xl bg-[var(--color-darker)] !text-white font-semibold shadow-md hover:bg-[var(--color-primary)] transition-all duration-300 transform hover:scale-105"
            >
              {t("cta") || "Contact Us Today"}
            </Link>
          </motion.div>
        </motion.div>

        {/* الصورة */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex-1 flex justify-center"
        >
          <Image
            src="/about/technofiber-fiberglass.webp"
            alt="High-quality fiberglass products by Techno Fiber"
            title="Techno Fiber Fiberglass Solutions"
            width={280}
            height={280}
            className="w-[180px] sm:w-[220px] md:w-[280px] object-contain"
            priority={false} // ✅ يسيبها Lazy load افتراضياً
          />
        </motion.div>
      </div>
    </section>
  );
}

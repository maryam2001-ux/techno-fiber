"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const t = useTranslations("Footer");

  // Animation Variants - أنعم من قبل
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        duration: 1,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-[var(--color-darker)] via-[var(--text-dark)] to-[var(--color-primary)] text-white py-12 mt-auto overflow-hidden">
      <div className="container mx-auto px-6">
        {/* القسم الأساسي */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
        >
          {/* الحقوق */}
          <motion.div variants={itemVariants}>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              {t("copyright")} &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">Techno Fiber</span>.{" "}
              {t("allRights")}
            </p>
          </motion.div>

          {/* المصممة - LinkedIn */}
          <motion.div
            variants={itemVariants}
            className="mt-4 sm:mt-6"
          >
            <a
              href="https://www.linkedin.com/in/maryam-hesham-cherif"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs sm:text-sm italic tracking-wide text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-300"
            >
               Designed with care by MEM{" "}
            
            </a>
          </motion.div>
        </motion.div>

        {/* خط فاصل أنيق (يرسم نفسه) */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto max-w-3xl"
          style={{ width: 0 }}
        ></motion.div>

        {/* جملة النهاية */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-xs md:text-sm text-gray-300 text-center mt-6 leading-relaxed max-w-3xl mx-auto"
        >
          {t("poweredBy")}{" "}
          <span className="text-white font-bold">Techno Fiber</span> –{" "}
          {t("tagline")}
        </motion.p>
      </div>

      {/* الخلفيات الزخرفية المتحركة */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-[var(--color-primary)] rounded-full blur-3xl opacity-20 pointer-events-none"
      ></motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
        className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-[var(--color-darker)] rounded-full blur-3xl opacity-20 pointer-events-none"
      ></motion.div>
    </footer>
  );
}
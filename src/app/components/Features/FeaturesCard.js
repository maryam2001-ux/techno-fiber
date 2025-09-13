"use client";

import React from "react";
import { FaCogs, FaWrench, FaTruck } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function FeaturesCard() {
  const t = useTranslations("features");

  const features = [
    {
      icon: <FaCogs aria-label="Manufacturing icon" className="text-2xl text-[var(--color-darker)]" />,
      title: t("manufacturingTitle") || "Manufacturing",
      description:
        t("manufacturingText") ||
        "Precision manufacturing of FRP products using Egypt’s only full pultrusion line and advanced molding technology.",
    },
    {
      icon: <FaWrench aria-label="Installation icon" className="text-2xl text-[var(--color-darker)]" />,
      title: t("installationTitle") || "Installation",
      description:
        t("installationText") ||
        "On-site installation by certified teams with strict adherence to safety, quality, and project timelines.",
    },
    {
      icon: <FaTruck aria-label="Supply icon" className="text-2xl text-[var(--color-darker)]" />,
      title: t("supplyTitle") || "Supply & Distribution",
      description:
        t("supplyText") ||
        "Nationwide logistics network ensuring timely delivery of products to industrial, governmental, and infrastructure sites.",
    },
  ];

  // ✅ Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.4 },
    },
  };

  const itemVariants = (isLeft) => ({
    hidden: { opacity: 0, x: isLeft ? -60 : 60, y: 25 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 20, duration: 1.2 },
    },
  });

  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 180, damping: 18, duration: 0.8 },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: "100%", transition: { duration: 2, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-white" style={{ color: "var(--text-dark)" }}>
      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center mb-16 px-6"
      >
        <h2 className="py-2.5 my-10 text-center bg-[var(--color-darker)] text-white rounded mx-auto w-4/5 md:w-2/5 font-semibold text-lg md:text-xl">
          {t("sectionTitle") || "Our Integrated Services"}
        </h2>
        <p className="text-[var(--grey-dark)] text-base md:text-lg max-w-3xl mx-auto">
          {t("sectionDesc") ||
            "Techno Fiber delivers complete FRP solutions — from production to installation and nationwide supply."}
        </p>
      </motion.div>

      {/* الخط الزمني */}
      <div className="relative container mx-auto px-6 md:px-10">
        {/* الخط العمودي */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-primary)] transform -translate-x-1/2 hidden md:block origin-top"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px" }}
        />

        {/* العناصر */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          className="flex flex-col gap-12 sm:gap-16 relative"
        >
          {features.map((feature, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.li
                key={index}
                variants={itemVariants(isLeft)}
                role="listitem"
                className={`md:w-1/2 flex flex-col gap-4 ${
                  isLeft
                    ? "md:self-start md:pr-12 text-left"
                    : "md:self-end md:pl-12 text-left md:text-right"
                }`}
              >
                {/* دائرة رقم */}
                <motion.div
                  variants={numberVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`absolute hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--color-primary)] text-white font-bold shadow-lg transform -translate-x-1/2 ${
                    isLeft ? "left-1/2 -ml-5 sm:-ml-6" : "left-1/2 ml-5 sm:ml-6"
                  }`}
                >
                  {index + 1}
                </motion.div>

                {/* المحتوى */}
                <motion.article
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-[var(--grey-light)] rounded-xl p-6 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {feature.icon}
                    <h3 className="text-xl font-bold text-[var(--text-dark)]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[var(--grey-dark)] text-base leading-relaxed">
                    {feature.description}
                  </p>
                </motion.article>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}

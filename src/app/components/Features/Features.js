"use client";

import React, { useEffect, useState } from "react";
import { FaRegLightbulb, FaProjectDiagram, FaBoxOpen } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// ✅ CountUp باستخدام requestAnimationFrame
function CountUp({ end, duration = 2, showPlus = true }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endNum = parseInt(end);
    if (isNaN(endNum)) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const value = Math.floor(progress * endNum);
      setCount(value);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <>
      {count}
      {showPlus ? "+" : ""}
    </>
  );
}

export default function Features() {
  const t = useTranslations("offers");

  const features = [
    {
      icon: <FaRegLightbulb aria-hidden="true" className="text-5xl text-[var(--color-darker)]" />,
      value: t("experienceValue") || "30+",
      label: t("experienceLabel") || "Years of Experience",
      desc:
        t("experienceDesc") ||
        "Over three decades of innovation and excellence in FRP manufacturing.",
    },
    {
      icon: <FaProjectDiagram aria-hidden="true" className="text-5xl text-[var(--color-darker)]" />,
      value: t("projectsValue") || "200+",
      label: t("projectsLabel") || "Projects Delivered",
      desc:
        t("projectsDesc") ||
        "Successfully completed across Egypt and the Middle East.",
    },
    {
      icon: <FaBoxOpen aria-hidden="true" className="text-5xl text-[var(--color-darker)]" />,
      value: t("productsValue") || "50+",
      label: t("productsLabel") || "Diverse Products",
      desc:
        t("productsDesc") ||
        "From gratings to tanks, profiles, and custom solutions.",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      className="py-20 bg-[var(--grey-light)] relative overflow-hidden"
      style={{ color: "var(--text-dark)" }}
    >
      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 px-6"
      >
        <h2 className="py-2.5 my-10 text-center bg-[var(--color-darker)] text-white rounded mx-auto w-4/5 md:w-2/5 text-lg md:text-xl">
          {t("sectionTitle") || "What Techno Fiber offers?"}
        </h2>
        <p className="text-[var(--grey-dark)] text-base sm:text-lg max-w-3xl mx-auto">
          {t("sectionDesc") ||
            "With decades of expertise and a proven track record, we deliver innovative, durable, and sustainable FRP solutions."}
        </p>
      </motion.div>

      {/* الخلفيات المتحركة */}
      <motion.div
        aria-hidden="true"
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--color-primary)] rounded-full blur-3xl opacity-20"
      />
      <motion.div
        aria-hidden="true"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-20 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--color-darker)] rounded-full blur-3xl opacity-20"
      />

      {/* الشبكة */}
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center"
        >
          {features.map((feature, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center group"
            >
              {/* الأيقونة */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                {feature.icon}
              </motion.div>

              {/* القيمة */}
              <header className="mb-3">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="text-5xl font-extrabold text-[var(--color-darker)]"
                >
                  <strong>
                    <CountUp end={feature.value.replace("+", "")} showPlus={feature.value.includes("+")} />
                  </strong>
                </motion.h3>
                <h4 className="text-xl font-semibold text-[var(--text-dark)]">
                  {feature.label}
                </h4>
              </header>

              {/* الوصف */}
              <motion.p
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
                className="text-[var(--grey-dark)] text-sm sm:text-base opacity-70 group-hover:opacity-100 transition-opacity duration-300 max-w-[14rem] sm:max-w-xs"
              >
                {feature.desc}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

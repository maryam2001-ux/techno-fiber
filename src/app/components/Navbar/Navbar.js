"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes, FaEnvelope, FaPhone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en"; // تحديد اللغة الحالية من الـ URL
  const [isChanging, setIsChanging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // التحكم في الشفافية عند التمرير
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // تغيير اللغة
  const changeLanguage = async (newLocale) => {
    setIsChanging(true);
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
    setIsChanging(false);
  };

  // الروابط
  const navLinks = ["home", "about", "products", "contact"];

  // Framer Motion Variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const topBarVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // دالة لتحديد href
  const getHref = (item) => {
    if (item === "home") return "/";
    if (item === "products") return "/products";
    if (item === "about") return "/#about";
    if (item === "contact") return "/#contact";
    return `/#${item}`;
  };

  // Scroll Smooth
  const handleScroll = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const target = document.querySelector(href.replace("/", ""));
      target?.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // ✅ ترجمة العنوان من نفس namespace
  const siteTitle = {
    main: t("Site.title.main"),
    sub: t("Site.title.sub"),
  };

  return (
    <header className="relative z-50" role="banner">
      {/* Top Bar */}
      <motion.div
        variants={topBarVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--color-darker)] text-white text-sm"
      >
        <div className="container mx-auto px-6 py-3 flex flex-wrap justify-between items-center gap-3 sm:gap-6">
          <ul className="flex items-center gap-4 sm:gap-6">
            <li className="flex items-center gap-2">
              <FaPhone className="text-[var(--color-primary)]" />
              <a
                href="tel:+201005158566"
                className="hover:text-[var(--color-primary)] transition-colors duration-300 text-xs sm:text-sm"
                aria-label={`${t("tel")}: +20 100 515 8566`}
              >
                +(20) 01005158566
              </a>
            </li>
            <li className="hidden md:flex items-center gap-2">
              <FaEnvelope className="text-[var(--color-primary)]" />
              <a
                href="mailto:info@technofiberegypt.com"
                className="hover:text-[var(--color-primary)] transition-colors duration-300"
                aria-label={`${t("email")}: info@technofiberegypt.com`}
              >
                info@technofiberegypt.com
              </a>
            </li>
          </ul>

          {/* Language Switch */}
          <div className="flex items-center gap-2 sm:gap-3 font-semibold text-sm">
            <button
              onClick={() => changeLanguage("en")}
              disabled={isChanging}
              className={`transition-colors duration-300 ${
                isChanging
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-[var(--color-primary)]"
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => changeLanguage("ar")}
              disabled={isChanging}
              className={`transition-colors duration-300 ${
                isChanging
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-[var(--color-primary)]"
              }`}
              aria-label="Switch language to Arabic"
            >
              العربية
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 w-full transition-all duration-300 z-50 ${
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
        role="navigation"
      >
        <div className="container mx-auto px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* ✅ اللوجو كعنوان (SEO + ترجمة) */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/"
              className="flex items-center"
              aria-label={`${siteTitle.main} ${siteTitle.sub}`}
            >
              <Image
                src="/Fiberglass-logo.webp" // أو webp لو الملف عندك كده
                alt={`${siteTitle.main} ${siteTitle.sub}`}
                width={150} // عدلي المقاس حسب التصميم
                height={50}
                priority
                className="h-auto w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 font-semibold text-base sm:text-lg">
            {navLinks.map((item, index) => (
              <motion.li
                key={item}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={getHref(item)}
                  onClick={(e) => handleScroll(e, getHref(item))}
                  className="relative text-[var(--text-dark)] hover:text-[var(--color-primary)] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--color-primary)] after:transition-all after:duration-300 hover:after:w-full"
                  aria-label={t(item)}
                >
                  {t(item)}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden text-[var(--color-darker)] text-2xl p-2 transition-transform hover:scale-110 relative z-50 ${
              isMenuOpen ? "hidden" : ""
            }`}
            aria-label={t("toggleMenu")}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 bg-white flex flex-col items-center justify-center z-40"
            role="dialog"
            aria-label={t("toggleMenu")}
          >
            {/* ✅ تم إضافة onClick هنا */}
            <button
              onClick={() => setIsMenuOpen(false)} // 🟢 هذا هو الحل!
              className="absolute top-8 right-8 text-[var(--color-darker)] text-3xl hover:scale-110 transition-transform duration-300"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            <ul className="text-center space-y-8 sm:space-y-10 mt-16">
              {navLinks.map((item, index) => (
                <motion.li
                  key={item}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={getHref(item)}
                    onClick={(e) => {
                      handleScroll(e, getHref(item)); // تنفذ السكرول أو التوجه
                      setIsMenuOpen(false); // ✅ هذا هو السر: إغلاق القائمة فور الضغط
                    }}
                    className="block text-2xl sm:text-3xl font-bold text-[var(--color-darker)] hover:text-[var(--color-primary)] transition-colors duration-300"
                    aria-label={t(item)}
                  >
                    {t(item)}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

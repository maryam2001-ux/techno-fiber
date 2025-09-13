"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  IoLocationSharp,
  IoCall,
  IoMail,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { motion } from "framer-motion";

export default function Contact() {
  const t = useTranslations("Contact");

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const footerVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.6, duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 bg-white text-[var(--text-dark)]"
    >
      <div className="container mx-auto px-6">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="contact-heading"
            className="py-2.5 my-10 text-center bg-[var(--color-darker)] text-white rounded mx-auto w-4/5 md:w-2/5 text-lg md:text-xl"
          >
            {t("title")}
          </h2>
          <p className="text-[var(--grey-dark)] max-w-2xl mx-auto text-base md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* الشبكة: معلومات + خريطة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* معلومات الاتصال */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            {/* Head Office */}
            <motion.article variants={itemVariants} className="group">
              <h3 className="text-xl font-semibold text-[var(--color-darker)] mb-6 flex items-center gap-3">
                <span
                  className="bg-[var(--color-primary)] text-white p-2 rounded-lg"
                  aria-hidden="true"
                >
                  <IoLocationSharp size={24} />
                </span>
                {t("headOffice.title")}
              </h3>
              <div className="pl-10 sm:pl-12 space-y-4">
                <p className="text-[var(--grey-dark)] leading-relaxed">
                  {t("headOffice.address")}
                </p>
                <div className="flex items-center gap-2 text-[var(--text-dark)] font-medium">
                  <IoCall
                    className="text-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${t("headOffice.phone")}`}
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    {t("headOffice.phone")}
                  </a>
                </div>
              </div>
            </motion.article>

            {/* October Branch */}
            <motion.article variants={itemVariants} className="group">
              <h3 className="text-xl font-semibold text-[var(--color-darker)] mb-6 flex items-center gap-3">
                <span
                  className="bg-[var(--color-darker)] text-white p-2 rounded-lg"
                  aria-hidden="true"
                >
                  <IoLocationSharp size={24} />
                </span>
                {t("octoberBranch.title")}
              </h3>
              <div className="pl-10 sm:pl-12 space-y-4">
                <p className="text-[var(--grey-dark)] leading-relaxed">
                  {t("octoberBranch.address")}
                </p>
              </div>
            </motion.article>

            {/* General Contact */}
            <motion.article
              variants={itemVariants}
              className="group border-t pt-8 border-gray-200"
            >
              <h3 className="text-xl font-semibold text-[var(--color-darker)] mb-6">
                {t("generalContact.title")}
              </h3>
              <ul className="space-y-5">
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 group"
                  >
                    <IoMail
                      className="text-[var(--color-primary)] mt-1 flex-shrink-0"
                      size={20}
                      aria-hidden="true"
                    />
                    <a
                      href="mailto:info@technofiberegypt.com"
                      className="text-[var(--grey-dark)] hover:text-[var(--color-darker)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      {t("generalContact.email")}
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 group"
                  >
                    <IoLogoWhatsapp
                      className="text-[var(--color-primary)] mt-1 flex-shrink-0"
                      size={20}
                      aria-hidden="true"
                    />
                    <a
                      href="https://wa.me/20125555555"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--grey-dark)] hover:text-[var(--color-darker)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      {t("generalContact.whatsapp")}
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3"
                  >
                    <IoCall
                      className="text-[var(--color-primary)] mt-1 flex-shrink-0"
                      size={20}
                      aria-hidden="true"
                    />
                    <span className="text-[var(--grey-dark)]">
                      {t("generalContact.management")}
                    </span>
                  </motion.div>
                </li>
              </ul>
            </motion.article>
          </motion.div>

          {/* الخريطة */}
<motion.div
  variants={mapVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group transition-shadow duration-500"
>
  <div className="relative w-full h-80 sm:h-96 md:h-[500px]">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.079648776186!2d31.21388717540733!3d30.17771867485671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14586bfc2775ff2b%3A0xa30d1055360a455a!2z2KrZg9mG2YjZgdmK2KjYsSDZhNmE2YHZitio2LEg2KzZhNin2LM!5e0!3m2!1sen!2seg!4v1757524691824!5m2!1sen!2seg"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={t("map.title")}
      className="absolute inset-0 w-full h-full rounded-2xl"
    ></iframe>
  </div>
</motion.div>


        </div>

        {/* رسالة تحفيزية */}
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 px-6"
        >
          <p className="text-[var(--grey-dark)] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("footerMessage")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { useTranslations, useMessages } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Bio() {
  const t = useTranslations("clients");
  const messages = useMessages();
  const clients = messages.clients.list;

  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="py-20 bg-gradient-to-b from-[#AE75DA0D] via-[#AE75DA1A] to-[#AE75DA0D]"
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* العنوان */}
        <motion.h2
          id="clients-title"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-4 my-12 text-center bg-gradient-to-r from-[#AE75DA] to-[#8A5CBB] text-white rounded-xl mx-auto w-full md:w-2/3 lg:w-1/2 text-lg md:text-xl font-bold shadow-lg transition-shadow duration-300"
        >
          {t("title")}
        </motion.h2>

        {/* الوصف */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-gray-700 mb-16 max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* شبكة العملاء — بدون أي hover */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              className="bg-white px-5 py-6 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center min-h-[7rem]"
            >
              <div className="relative w-full h-16 md:h-20 overflow-hidden">
                <Image
                  src={
                    client.logo ||
                    `https://via.placeholder.com/180x90?text=Logo+${index + 1}`
                  }
                  alt={`Client ${index + 1} Logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority={index < 4}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
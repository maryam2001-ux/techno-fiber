'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FaArrowLeft, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('Hero');
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = t.raw('slides');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length, isPlaying]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <section
      className="relative w-full h-[80vh] sm:h-[85vh] md:h-screen min-h-[500px] max-h-[800px] overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={t('carouselLabel', { default: 'Hero Slider' })}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
          aria-hidden={index !== current}
        >
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* Text Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: index === current ? 0 : 30, opacity: index === current ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6"
            aria-live="polite"
          >
            <div className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed drop-shadow line-clamp-4 sm:line-clamp-3">
                {slide.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Navigation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 transition-transform duration-300"
        aria-label="Previous slide"
      >
        <FaArrowLeft size={24} className="sm:w-7 sm:h-7" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:text-blue-400 transition-transform duration-300"
        aria-label="Next slide"
      >
        <FaArrowRight size={24} className="sm:w-7 sm:h-7" />
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white hover:text-blue-400 transition-transform duration-300"
        aria-pressed={!isPlaying}
        aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              index === current
                ? 'bg-white w-6 sm:w-8 md:w-12 h-2 sm:h-2.5 shadow-lg'
                : 'bg-white/50 hover:bg-white/75 w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
}

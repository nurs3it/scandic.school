"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import Link from "next/link";
import { useLocale } from "./locale-provider";

interface InstagramTranslations {
  title: string;
  description: string;
  handle: string;
  loading: string;
  subscribe: string;
  contactUs: string;
}

export function InstagramCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const { translations } = useLocale();
  
  // Безопасный доступ к переводам Instagram
  const instagramTranslations: InstagramTranslations = (translations as Record<string, InstagramTranslations>).instagram || {
    title: "Follow us on Instagram",
    description: "Stay updated with all school events, follow student achievements and news",
    handle: "@scandic.school",
    loading: "Loading post...",
    subscribe: "Subscribe",
    contactUs: "Contact Us"
  };

  // Список Instagram постов для отображения (замените на реальные URL-ы)
  const instagramPosts = [
    "https://www.instagram.com/p/DOScJt1AsIs/",
    "https://www.instagram.com/p/DOGvTXYDAOT/",
    "https://www.instagram.com/p/DNUyoWSMVZq/",
    "https://www.instagram.com/p/DMzd8uUCcN3/",
    "https://www.instagram.com/p/DMsU3A4Cu9Y/",
    "https://www.instagram.com/p/DMPHXXWiTWp/",
  ];

  // Дублируем посты для бесконечной прокрутки
  const duplicatedPosts = [...instagramPosts, ...instagramPosts];

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 md:mr-4">
              <Instagram className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {instagramTranslations.title}
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6 px-4">
            {instagramTranslations.description}
          </p>
          <a
            href="https://www.instagram.com/scandic.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <Instagram className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            {instagramTranslations.handle}
            <ExternalLink className="h-3 w-3 md:h-4 md:w-4 ml-2" />
          </a>
        </motion.div>

        {/* Instagram Posts Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-3 md:gap-6"
            animate={{
              x: isPaused ? 0 : [0, -50 * instagramPosts.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            style={{ width: `${duplicatedPosts.length * 240}px` }}
          >
            {duplicatedPosts.map((postUrl, index) => (
              <motion.div
                key={`${postUrl}-${index}`}
                className="flex-shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 p-1 md:p-2">
                  <div className="aspect-[9/16] w-full">
                    <InstagramEmbed
                      url={postUrl}
                      width="100%"
                      height="100%"
                      placeholderSpinner={
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
                          <div className="text-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 animate-pulse">
                              <Instagram className="h-4 w-4 md:h-5 md:w-5 text-white" />
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 font-medium">{instagramTranslations.loading}</p>
                          </div>
                        </div>
                      }
                      placeholderDisabled={false}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
            <a
              href="https://www.instagram.com/scandic.school/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 md:px-8 md:py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-pink-300 hover:text-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm md:text-base"
            >
              {instagramTranslations.subscribe}
            </a>
            <Link
              href="/contact"
              className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-secondary to-secondary-800 text-white font-semibold rounded-full hover:from-secondary-800 hover:to-secondary-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              {instagramTranslations.contactUs}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

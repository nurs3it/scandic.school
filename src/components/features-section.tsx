"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, BookOpen, Globe, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    icon: Heart,
    title: "Уважение",
    description: "Воспитываем уважение к себе, другим и окружающему миру",
    color: "text-red-500",
    bgColor: "bg-red-50",
    gradient: "from-red-500 to-pink-500",
    delay: 0.1,
  },
  {
    icon: Target,
    title: "Совершенство",
    description: "Стремимся предоставлять высочайший уровень образования",
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary to-primary-600",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Создаем атмосферу заботы и взаимопонимания",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    gradient: "from-purple-500 to-violet-500",
    delay: 0.3,
  },
  {
    icon: BookOpen,
    title: "Знания и навыки",
    description: "Развиваем креативность и уверенность в себе",
    color: "text-green-500",
    bgColor: "bg-green-50",
    gradient: "from-green-500 to-emerald-500",
    delay: 0.4,
  },
  {
    icon: Globe,
    title: "Международность",
    description: "Подготовка к жизни в глобальном мире",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.5,
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Обеспечиваем безопасную образовательную среду",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.6,
  },
];

export function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    },
    hover: {
      y: -10,
      scale: 1.05,
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
    },
    hover: {
      scale: 1.2,
      rotate: 10,
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Наши ценности
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            В центре всех наших усилий стоит стремление к успеху. 
            Мы предоставляем не только знания, но и навыки, необходимые для успешного развития в современном мире.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group"
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
                
                {/* Animated border */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{
                    background: `linear-gradient(45deg, transparent, ${feature.gradient}, transparent)`,
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
                
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div 
                    className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    {/* Icon background animation */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      whileHover={{ scale: 1.1 }}
                    />
                    <feature.icon className={`h-10 w-10 ${feature.color} relative z-10`} />
                    
                    {/* Floating particles effect */}
                    {hoveredCard === index && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                            initial={{ 
                              x: '50%', 
                              y: '50%', 
                              scale: 0,
                              opacity: 0 
                            }}
                            animate={{ 
                              x: `${50 + (Math.random() - 0.5) * 100}%`, 
                              y: `${50 + (Math.random() - 0.5) * 100}%`, 
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: 1.5, 
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-semibold text-secondary mb-4 group-hover:text-primary transition-colors duration-300"
                    variants={textVariants}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    variants={textVariants}
                  >
                    {feature.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

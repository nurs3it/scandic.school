import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, BookOpen, Globe, Shield } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function FeaturesSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const features = [
    {
      icon: Heart,
      title: translations.features.items.respect.title,
      description: translations.features.items.respect.description,
      color: "text-red-500",
      bgColor: "bg-red-50",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Target,
      title: translations.features.items.excellence.title,
      description: translations.features.items.excellence.description,
      color: "text-primary",
      bgColor: "bg-primary/10",
      gradient: "from-primary to-primary-600",
    },
    {
      icon: Users,
      title: translations.features.items.community.title,
      description: translations.features.items.community.description,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: BookOpen,
      title: translations.features.items.knowledge.title,
      description: translations.features.items.knowledge.description,
      color: "text-green-500",
      bgColor: "bg-green-50",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: translations.features.items.international.title,
      description: translations.features.items.international.description,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: translations.features.items.safety.title,
      description: translations.features.items.safety.description,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.features.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Gradient Line */}
                    <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 rounded-full`}></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
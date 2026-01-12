import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Globe, BookOpen } from "lucide-react";
import { AnimatedTextStagger, AnimatedTextItem } from "@/components/animated-text";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ParticleBackground } from "@/components/particle-background";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function HeroSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  return (
    <section className="relative md:min-h-max py-20 min-h-[calc(100vh+200px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-cover bg-center opacity-10"></div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <ScrollReveal className="space-y-8">
            <AnimatedTextStagger className="space-y-4">
              <AnimatedTextItem>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="block">{translations.hero.welcome}</span>
                  <span className="block text-primary">{translations.hero.schoolName}</span>
                </h1>
              </AnimatedTextItem>
              <AnimatedTextItem delay={0.2}>
                <p className="text-xl text-gray-200 leading-relaxed">
                  {translations.hero.description}
                </p>
              </AnimatedTextItem>
            </AnimatedTextStagger>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-gray-300">{translations.hero.stats.students}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1:8</div>
                <div className="text-sm text-gray-300">{translations.hero.stats.ratio}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">IB PYP</div>
                <div className="text-sm text-gray-300">{translations.hero.stats.program}</div>
                <div className="text-xs text-yellow-300 mt-1 font-medium">Candidate*</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <AnimatedTextItem delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 text-lg glow-effect">
                  <Link href="/application" className="flex items-center space-x-2">
                    <span>{translations.hero.cta.apply}</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary px-8 py-4 text-lg">
                  <Link href="/about">{translations.hero.cta.learnMore}</Link>
                </Button>
              </div>
            </AnimatedTextItem>
          </ScrollReveal>

          {/* Visual Elements */}
          <ScrollReveal direction="right" className="relative">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 min-w-12 min-h-12 bg-primary rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{translations.hero.features.ibProgram}</h3>
                      <p className="text-gray-300">{translations.hero.features.internationalProgram}</p>
                      {'ibCandidate' in translations.hero.features && (
                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-yellow-500/20 border border-yellow-500/30">
                          <span className="text-xs text-yellow-200 font-medium">{(translations.hero.features as Record<string, string>).ibCandidate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="text-white">{translations.hero.features.grades}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-white">{translations.hero.features.multinational}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-white">{translations.hero.features.standards}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-primary rounded-xl p-4 animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{translations.hero.floating.enrollment}</div>
                  <div className="text-sm text-secondary/80">{translations.hero.floating.enrollmentOpen}</div>
                </div>
              </div>

              <div className="absolute -bottom-14 -left-1 md:-left-10 bg-accent rounded-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{translations.hero.floating.license}</div>
                  <div className="text-xs text-white/80">{translations.hero.floating.licenseNumber}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
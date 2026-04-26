import { Card, CardContent } from "@/components/ui/card";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { getTeachers } from '@/lib/api/actions';
import Image from 'next/image';
import Link from 'next/link';
import { TeacherNoImg } from "@/components/teacher-no-img";
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';
import { ArrowRight, Users } from 'lucide-react';

export async function StaffSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const nav = translations.navigation as unknown as Record<string, string>;

  const result = await getTeachers();
  const staff = result.success && result.data ? result.data : [];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[45%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                {nav.staff}
              </span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {translations.staff.title}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {translations.staff.subtitle}
            </p>
          </ScrollReveal>

          {/* Staff count badge */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-white/90 text-sm font-medium">
                <span className="text-primary font-bold text-lg mr-1">{staff.length}</span>
                {locale === 'en' ? 'team members' : locale === 'kk' ? 'команда мүшесі' : 'членов команды'}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== STAFF GRID ===== */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                  {translations.staff.title}
                </span>
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
                {translations.staff.title}
              </h2>
            </div>
          </ScrollReveal>

          {staff.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {locale === 'en' ? 'No teachers found' : locale === 'kk' ? 'Мұғалімдер табылмады' : 'Преподаватели не найдены'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {staff.map((member, index) => (
                <ScrollReveal key={member.id} delay={index * 0.08}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden hover:-translate-y-1 h-full">
                    <CardContent className="p-0">
                      <div className="text-center">
                        {/* Photo or Icon */}
                        <div className="h-[340px] relative overflow-hidden">
                          {member.photo_url ? (
                            <div className="h-[340px] w-full">
                              <Image
                                src={member.photo_url}
                                alt={member.name}
                                width={96}
                                height={200}
                                draggable={false}
                                className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ) : (
                            <div className="h-[340px] flex justify-center items-center w-full bg-gradient-to-br from-gray-50 to-gray-100">
                              <TeacherNoImg />
                            </div>
                          )}
                          {/* Gradient overlay at bottom of photo */}
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                        </div>

                        <div className="px-5 pb-5">
                          {/* Name and Subject */}
                          <h3 className="text-xl font-bold text-secondary text-left mb-1 mt-3">
                            {member.name}
                          </h3>

                          {member.subject && (
                            <p className="text-primary text-left font-semibold text-sm mb-3">
                              {member.subject}
                            </p>
                          )}

                          {/* Bio */}
                          {member.bio && (
                            <p className="text-sm text-left text-gray-600 leading-relaxed mb-3 line-clamp-3">{member.bio}</p>
                          )}

                          {/* Contact Info */}
                          <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                            {member.email && (
                              <p className="text-xs text-gray-500">
                                <span className="font-semibold text-gray-700">Email:</span> {member.email}
                              </p>
                            )}
                            {member.phone && (
                              <p className="text-xs text-gray-500">
                                <span className="font-semibold text-gray-700">
                                  {locale === 'en' ? 'Phone' : locale === 'kk' ? 'Телефон' : 'Телефон'}:
                                </span> {member.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== HIRING CTA ===== */}
      <section className="relative py-16 md:py-20 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Users className="h-10 w-10 mx-auto mb-5 text-white/80" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {translations.staff.cta}
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {translations.staff.applyButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg whitespace-nowrap">
              {nav.about}
            </span>
            <div className="w-px h-6 bg-gray-300" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {nav.about}
            </Link>
            <Link href="/community" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {nav.community}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
                {locale === 'en' ? 'Explore More' : locale === 'kk' ? 'Толығырақ' : 'Узнайте больше'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold">{nav.application}</span>
                  <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/programs" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold">{nav.programs}</span>
                  <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold">{nav.contact}</span>
                  <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

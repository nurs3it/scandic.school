"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type Locale = 'en' | 'ru' | 'kk';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Record<string, unknown>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations = {
  en: {
    navigation: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
      application: "Application",
      staff: "Staff",
      testimonials: "Testimonials",
      documents: "Documents"
    },
    header: {
      schoolName: "Scandic School",
      phone: "8 706 610 57 81",
      applyButton: "Apply Now"
    },
    hero: {
      welcome: "Welcome to",
      schoolName: "Scandic International School",
      description: "We provide the highest level of education for children from different countries and cultural traditions with the IB PYP program",
      stats: {
        students: "Students",
        ratio: "Teacher/Student Ratio",
        program: "Program"
      },
      cta: {
        apply: "Apply Now",
        learnMore: "Learn More"
      },
      features: {
        ibProgram: "IB PYP Program",
        internationalProgram: "International Primary School Program",
        grades: "Grades 0-4",
        multinational: "Multinational Environment",
        standards: "International Standards"
      },
      floating: {
        enrollment: "2025-2026",
        enrollmentOpen: "Enrollment Open",
        license: "License",
        licenseNumber: "KZ96LAA00035527"
      }
    },
    features: {
      title: "Why Choose Scandic International School?",
      subtitle: "We create an environment where every child can reach their full potential",
      items: {
        respect: {
          title: "Respect",
          description: "We foster respect for oneself, others, and the world around us"
        },
        excellence: {
          title: "Excellence",
          description: "We strive to provide the highest level of education"
        },
        community: {
          title: "Community",
          description: "We create an atmosphere of care and mutual understanding"
        },
        knowledge: {
          title: "Knowledge and Skills",
          description: "We develop creativity and self-confidence"
        },
        international: {
          title: "Internationalism",
          description: "Preparation for life in a global world"
        },
        safety: {
          title: "Safety",
          description: "We ensure a safe educational environment"
        }
      }
    },
    footer: {
      description: "Scandic International School - providing world-class education in Uralsk",
      quickLinks: "Quick Links",
      contact: "Contact Info",
      address: "Uralsk, Kazakhstan",
      phone: "Phone",
      email: "Email",
      license: "License: KZ96LAA00035527",
      rights: "All rights reserved",
      followUs: "Follow us on Instagram",
      instagramHandle: "@scandic.school"
    },
    instagram: {
      title: "Follow us on Instagram",
      description: "Stay updated with all school events, follow student achievements and news",
      handle: "@scandic.school",
      loading: "Loading post...",
      subscribe: "Subscribe",
      contactUs: "Contact Us"
    },
    application: {
      title: "Application Form",
      subtitle: "Fill out the form to apply for admission to our school",
      parentInfo: "Parent Information",
      childInfo: "Child Information",
      parentName: "Parent/Guardian Full Name *",
      parentPhone: "Contact Phone Number *",
      childName: "Child Full Name *",
      childBirthDate: "Child Birth Date *",
      grade: "Grade Applying For *",
      language: "Language of Instruction *",
      englishLevel: "Child's English Level *",
      preferredTime: "Preferred Interview Time *",
      placeholders: {
        parentName: "Enter full name",
        parentPhone: "+7 (___) ___-__-__",
        childName: "Enter child's full name",
        preferredTime: "Specify desired date and time"
      },
      selectPlaceholders: {
        grade: "Select grade",
        language: "Select language",
        englishLevel: "Select level"
      },
      gradeOptions: {
        "0": "Grade 0",
        "1": "Grade 1",
        "2": "Grade 2",
        "3": "Grade 3",
        "4": "Grade 4"
      },
      languageOptions: {
        kazakh: "Kazakh",
        russian: "Russian"
      },
      englishLevelOptions: {
        beginner: "Beginner",
        intermediate: "Intermediate (Pre-Intermediate and above)",
        unknown: "Don't know"
      },
      submitButton: "Submit Application",
      submittingButton: "Submitting...",
      successMessage: "Application submitted successfully!",
      errorMessage: "An error occurred while submitting the application. Please try again.",
      additionalInfo: "We will contact you to confirm the interview within 24 hours.",
      licenseInfo: "License: KZ96LAA00035527 | Grades 0-4 | IB PYP"
    },
    mission: {
      title: "Our Mission",
      subtitle: "Nurturing harmonious personalities committed to building a better world",
      description: "We nurture harmonious personalities, committed to the idea of building a better world based on moral values. Our mission is to develop confident, compassionate, and capable individuals who are prepared to thrive in an interconnected world.",
      values: {
        excellence: "Excellence in Education",
        diversity: "Celebrating Diversity",
        innovation: "Innovation in Learning",
        community: "Building Community"
      }
    },
    staff: {
      title: "Our Team",
      subtitle: "Professional educators dedicated to education",
      cta: "Want to join our team?",
      applyButton: "Send Resume",
      education: "Education:",
      experience: "Experience:",
      languages: "Languages:",
      parentOf: "Parent of"
    },
    testimonials: {
      title: "Parent Testimonials",
      subtitle: "What parents say about us",
      ctaTitle: "Want to share your experience?",
      ctaSubtitle: "We would love to hear your opinion about our school",
      shareButton: "Share Testimonial",
      parentOf: "Parent of"
    }
  },
  ru: {
    navigation: {
      home: "Главная",
      about: "О нас",
      contact: "Контакты",
      application: "Заявка",
      staff: "Сотрудники",
      testimonials: "Отзывы",
      documents: "Документы"
    },
    header: {
      schoolName: "Scandic School",
      phone: "8 706 610 57 81",
      applyButton: "Подать заявку"
    },
    hero: {
      welcome: "Добро пожаловать в",
      schoolName: "Scandic International School",
      description: "Предоставляем высочайший уровень образования для детей разных стран и культурных традиций с программой IB PYP",
      stats: {
        students: "Учеников",
        ratio: "Соотношение учитель/ученик",
        program: "Программа"
      },
      cta: {
        apply: "Подать заявку",
        learnMore: "Узнать больше"
      },
      features: {
        ibProgram: "IB PYP Программа",
        internationalProgram: "Международная программа начальной школы",
        grades: "0-4 классы",
        multinational: "Многонациональная среда",
        standards: "Международные стандарты"
      },
      floating: {
        enrollment: "2025-2026",
        enrollmentOpen: "Набор открыт",
        license: "Лицензия",
        licenseNumber: "KZ96LAA00035527"
      }
    },
    features: {
      title: "Почему выбирают Scandic International School?",
      subtitle: "Мы создаем среду, где каждый ребенок может раскрыть свой потенциал",
      items: {
        respect: {
          title: "Уважение",
          description: "Воспитываем уважение к себе, другим и окружающему миру"
        },
        excellence: {
          title: "Совершенство",
          description: "Стремимся предоставлять высочайший уровень образования"
        },
        community: {
          title: "Сообщество",
          description: "Создаем атмосферу заботы и взаимопонимания"
        },
        knowledge: {
          title: "Знания и навыки",
          description: "Развиваем креативность и уверенность в себе"
        },
        international: {
          title: "Международность",
          description: "Подготовка к жизни в глобальном мире"
        },
        safety: {
          title: "Безопасность",
          description: "Обеспечиваем безопасную образовательную среду"
        }
      }
    },
    footer: {
      description: "Scandic International School - предоставляем образование мирового уровня в Уральске",
      quickLinks: "Быстрые ссылки",
      contact: "Контактная информация",
      address: "Уральск, Казахстан",
      phone: "Телефон",
      email: "Email",
      license: "Лицензия: KZ96LAA00035527",
      rights: "Все права защищены",
      followUs: "Следите за нами в Instagram",
      instagramHandle: "@scandic.school"
    },
    instagram: {
      title: "Следите за нами в Instagram",
      description: "Будьте в курсе всех событий нашей школы, следите за успехами учеников и новостями",
      handle: "@scandic.school",
      loading: "Загружаем пост...",
      subscribe: "Подписаться",
      contactUs: "Связаться с нами"
    },
    application: {
      title: "Форма заявки",
      subtitle: "Заполните форму для подачи заявки на поступление в нашу школу",
      parentInfo: "Информация о родителе",
      childInfo: "Информация о ребенке",
      parentName: "ФИО родителя (законного представителя) *",
      parentPhone: "Контактный номер телефона *",
      childName: "ФИО ребенка *",
      childBirthDate: "Дата рождения ребенка *",
      grade: "Класс, на который планируете поступать *",
      language: "Язык обучения *",
      englishLevel: "Уровень знания английского языка у ребенка *",
      preferredTime: "Удобное время для собеседования *",
      placeholders: {
        parentName: "Введите ФИО",
        parentPhone: "+7 (___) ___-__-__",
        childName: "Введите ФИО ребенка",
        preferredTime: "Укажите желаемую дату и время"
      },
      selectPlaceholders: {
        grade: "Выберите класс",
        language: "Выберите язык",
        englishLevel: "Выберите уровень"
      },
      gradeOptions: {
        "0": "0 класс",
        "1": "1 класс",
        "2": "2 класс",
        "3": "3 класс",
        "4": "4 класс"
      },
      languageOptions: {
        kazakh: "Казахский",
        russian: "Русский"
      },
      englishLevelOptions: {
        beginner: "Начинающий (Beginner)",
        intermediate: "Средний (Pre-Intermediate и выше)",
        unknown: "Не знаю"
      },
      submitButton: "Подать заявку",
      submittingButton: "Отправляем заявку...",
      successMessage: "Заявка успешно отправлена!",
      errorMessage: "Произошла ошибка при подаче заявки. Попробуйте еще раз.",
      additionalInfo: "Мы свяжемся с вами для подтверждения собеседования в течение 24 часов.",
      licenseInfo: "Лицензия: KZ96LAA00035527 | 0–4 классы | IB PYP"
    },
    mission: {
      title: "Наша миссия",
      subtitle: "Воспитываем гармоничную личность, преданную идее построения лучшего мира",
      description: "Мы воспитываем гармоничную личность, преданную идее построения лучшего мира на основе нравственных ценностей. Наша миссия - развивать уверенных, сострадательных и способных людей, готовых процветать в взаимосвязанном мире.",
      values: {
        excellence: "Превосходство в образовании",
        diversity: "Празднование разнообразия",
        innovation: "Инновации в обучении",
        community: "Строительство сообщества"
      }
    },
    staff: {
      title: "Наша команда",
      subtitle: "Профессиональные педагоги, преданные делу образования",
      cta: "Хотите присоединиться к нашей команде?",
      applyButton: "Отправить резюме",
      education: "Образование:",
      experience: "Опыт работы:",
      languages: "Языки:",
      parentOf: "Родитель"
    },
    testimonials: {
      title: "Отзывы родителей",
      subtitle: "Что говорят о нас родители наших учеников",
      ctaTitle: "Хотите поделиться своим опытом?",
      ctaSubtitle: "Мы будем рады услышать ваше мнение о нашей школе",
      shareButton: "Поделиться отзывом",
      parentOf: "Родитель"
    }
  },
  kk: {
    navigation: {
      home: "Басты бет",
      about: "Біз туралы",
      contact: "Байланыс",
      application: "Өтініш",
      staff: "Қызметкерлер",
      testimonials: "Пікірлер",
      documents: "Құжаттар"
    },
    header: {
      schoolName: "Scandic School",
      phone: "8 706 610 57 81",
      applyButton: "Өтініш беру"
    },
    hero: {
      welcome: "Қош келдіңіз",
      schoolName: "Scandic International School",
      description: "IB PYP бағдарламасымен әртүрлі елдердің және мәдени дәстүрлердің балаларына ең жоғары деңгейде білім беру",
      stats: {
        students: "Оқушылар",
        ratio: "Мұғалім/оқушы қатынасы",
        program: "Бағдарлама"
      },
      cta: {
        apply: "Өтініш беру",
        learnMore: "Көбірек білу"
      },
      features: {
        ibProgram: "IB PYP Бағдарламасы",
        internationalProgram: "Халықаралық бастауыш мектеп бағдарламасы",
        grades: "0-4 сыныптар",
        multinational: "Көпұлтты орта",
        standards: "Халықаралық стандарттар"
      },
      floating: {
        enrollment: "2025-2026",
        enrollmentOpen: "Қабылдау ашық",
        license: "Лицензия",
        licenseNumber: "KZ96LAA00035527"
      }
    },
    features: {
      title: "Неге Scandic International School-ты таңдау керек?",
      subtitle: "Біз әр баланың өз потенциалын ашуына мүмкіндік беретін орта жасаймыз",
      items: {
        respect: {
          title: "Құрмет",
          description: "Өзіне, басқаларға және айналадағы әлемге құрмет тәрбиелейміз"
        },
        excellence: {
          title: "Мінсіздік",
          description: "Ең жоғары деңгейде білім беруге ұмтыламыз"
        },
        community: {
          title: "Қауымдастық",
          description: "Қамқорлық пен өзара түсіністік атмосферасын жасаймыз"
        },
        knowledge: {
          title: "Білім және дағдылар",
          description: "Шығармашылық пен өз-өзіне сенімділікті дамытамыз"
        },
        international: {
          title: "Халықаралықтық",
          description: "Жаһандық әлемде өмір сүруге дайындау"
        },
        safety: {
          title: "Қауіпсіздік",
          description: "Қауіпсіз білім беру ортасын қамтамасыз етеміз"
        }
      }
    },
    footer: {
      description: "Scandic International School - Оралда әлемдік деңгейде білім беру",
      quickLinks: "Жылдам сілтемелер",
      contact: "Байланыс ақпараты",
      address: "Орал, Қазақстан",
      phone: "Телефон",
      email: "Email",
      license: "Лицензия: KZ96LAA00035527",
      rights: "Барлық құқықтар қорғалған",
      followUs: "Instagram-да бізді бақылаңыз",
      instagramHandle: "@scandic.school"
    },
    instagram: {
      title: "Instagram-да бізді бақылаңыз",
      description: "Мектеп оқиғаларымен танысыңыз, оқушылардың жетістіктері мен жаңалықтарын бақылаңыз",
      handle: "@scandic.school",
      loading: "Пост жүктелуде...",
      subscribe: "Жазылу",
      contactUs: "Бізбен байланысыңыз"
    },
    application: {
      title: "Өтініш формасы",
      subtitle: "Мектепімізге түсу үшін өтініш беру формасын толтырыңыз",
      parentInfo: "Ата-ана туралы ақпарат",
      childInfo: "Бала туралы ақпарат",
      parentName: "Ата-ананың (заңды өкілдің) толық аты-жөні *",
      parentPhone: "Байланыс телефон нөмірі *",
      childName: "Баланың толық аты-жөні *",
      childBirthDate: "Баланың туған күні *",
      grade: "Түсу жоспарланып отырған сынып *",
      language: "Оқыту тілі *",
      englishLevel: "Баланың ағылшын тілін білу деңгейі *",
      preferredTime: "Сұхбатқа ыңғайлы уақыт *",
      placeholders: {
        parentName: "Толық аты-жөнін енгізіңіз",
        parentPhone: "+7 (___) ___-__-__",
        childName: "Баланың толық аты-жөнін енгізіңіз",
        preferredTime: "Қалаған күн мен уақытты көрсетіңіз"
      },
      selectPlaceholders: {
        grade: "Сыныпты таңдаңыз",
        language: "Тілді таңдаңыз",
        englishLevel: "Деңгейді таңдаңыз"
      },
      gradeOptions: {
        "0": "0 сынып",
        "1": "1 сынып",
        "2": "2 сынып",
        "3": "3 сынып",
        "4": "4 сынып"
      },
      languageOptions: {
        kazakh: "Қазақ тілі",
        russian: "Орыс тілі"
      },
      englishLevelOptions: {
        beginner: "Бастапқы (Beginner)",
        intermediate: "Орта (Pre-Intermediate және жоғары)",
        unknown: "Білмеймін"
      },
      submitButton: "Өтініш беру",
      submittingButton: "Өтініш жіберілуде...",
      successMessage: "Өтініш сәтті жіберілді!",
      errorMessage: "Өтініш беру кезінде қате орын алды. Қайталап көріңіз.",
      additionalInfo: "Біз сізбен сұхбатты растау үшін 24 сағат ішінде байланысамыз.",
      licenseInfo: "Лицензия: KZ96LAA00035527 | 0–4 сыныптар | IB PYP"
    },
    mission: {
      title: "Біздің миссиямыз",
      subtitle: "Жақсы әлем құру идеясына адал гармониялы тұлға тәрбиелеу",
      description: "Біз моральдық құндылықтар негізінде жақсы әлем құру идеясына адал гармониялы тұлға тәрбиелейміз. Біздің миссиямыз - өзара байланысты әлемде дамып-өсуге дайын сенімді, мейірімді және қабілетті адамдарды дамыту.",
      values: {
        excellence: "Білім беруде мінсіздік",
        diversity: "Әртүрлілікті тойлау",
        innovation: "Оқытуда инновациялар",
        community: "Қауымдастық құру"
      }
    },
    staff: {
      title: "Біздің команда",
      subtitle: "Білім беру ісіне адал кәсіби педагогтар",
      cta: "Біздің командаға қосылғыңыз келе ме?",
      applyButton: "Резюме жіберу",
      education: "Білім:",
      experience: "Жұмыс тәжірибесі:",
      languages: "Тілдер:",
      parentOf: "Ата-анасы"
    },
    testimonials: {
      title: "Ата-аналардың пікірлері",
      subtitle: "Ата-аналар біз туралы не дейді",
      ctaTitle: "Өз тәжірибеңізбен бөлісгіңіз келе ме?",
      ctaSubtitle: "Біз мектеп туралы сіздің пікіріңізді естуге қуаныштымыз",
      shareButton: "Пікір бөлісу",
      parentOf: "Ата-анасы"
    }
  }
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');

  useEffect(() => {
    // Читаем язык из cookie при загрузке
    const savedLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale;
    
    if (savedLocale && ['en', 'ru', 'kk'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Сохраняем язык в cookie на 1 год
    document.cookie = `locale=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, translations: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
